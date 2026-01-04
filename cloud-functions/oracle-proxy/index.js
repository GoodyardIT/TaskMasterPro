const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Initialize Oracle Client in Thick mode for Oracle 11g support
try {
  oracledb.initOracleClient();
  console.log('Oracle Client initialized successfully');
} catch (err) {
  console.error('Oracle Client initialization error:', err);
}

// Oracle connection configuration
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SERVICE_NAME}`
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Oracle proxy is running' });
});

// Validate material code endpoint
app.post('/validate-wlid', async (req, res) => {
  const { wlid } = req.body;
  
  if (!wlid) {
    return res.status(400).json({ 
      exists: false, 
      error: 'Material code is required' 
    });
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    const result = await connection.execute(
      `SELECT COUNT(*) as count FROM WLXX WHERE TRIM(UPPER(WLXX_WLID)) = UPPER(:wlid)`,
      [wlid.trim()],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    const count = (result.rows[0])?.COUNT || 0;
    
    res.json({ exists: count > 0 });
    
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ 
      exists: false, 
      error: error.message 
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Insert work orders endpoint
app.post('/insert-wo', async (req, res) => {
  console.log('=== Received insert-wo request ===');
  const { tasks } = req.body;
  
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    console.error('Invalid tasks data:', tasks);
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid tasks data' 
    });
  }

  console.log(`Processing ${tasks.length} tasks`);
  console.log('First task sample:', JSON.stringify(tasks[0], null, 2));

  let connection;
  try {
    console.log('Attempting Oracle connection...');
    console.log('Connection config:', {
      user: dbConfig.user,
      host: dbConfig.connectString,
    });
    
    connection = await oracledb.getConnection(dbConfig);
    console.log('Oracle connection established successfully');
    
    // Insert each task
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      console.log(`Inserting task ${i + 1}/${tasks.length}:`, task.WO_WOID);
      
      const result = await connection.execute(
        `INSERT INTO WO (
          WO_WOID, WO_GCID, WO_WLID, WO_XQSL, 
          WO_JHKGRQ, WO_JHWGRQ, WO_BMID, WO_ZLH,
          WO_LX, WO_ZT, WO_DZSC, WO_BZ,
          WO_WHRID, WO_WHR, WO_WHSJ
        ) VALUES (
          :woid, :gcid, :wlid, :xqsl,
          TO_DATE(:jhkgrq, 'YYYY-MM-DD'), 
          TO_DATE(:jhwgrq, 'YYYY-MM-DD'),
          :bmid, :zlh, :lx, :zt, :dzsc, :bz,
          :whrid, :whr, SYSDATE
        )`,
        {
          woid: task.WO_WOID,
          gcid: task.WO_GCID,
          wlid: task.WO_WLID,
          xqsl: parseFloat(task.WO_XQSL),
          jhkgrq: task.WO_JHKGRQ,
          jhwgrq: task.WO_JHWGRQ,
          bmid: task.WO_BMID,
          zlh: task.WO_ZLH,
          lx: task.WO_LX,
          zt: task.WO_ZT,
          dzsc: task.WO_DZSC,
          bz: task.WO_BZ || '',
          whrid: task.WO_WHRID,
          whr: task.WO_WHR
        },
        { autoCommit: false }
      );
      
      console.log(`Task ${i + 1} insert result:`, result.rowsAffected, 'rows affected');
    }
    
    await connection.commit();
    console.log('All tasks committed successfully');
    res.json({ success: true });
    
  } catch (error) {
    console.error('=== Database error ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.errorNum);
    console.error('Full error:', error);
    
    if (connection) {
      await connection.rollback();
      console.log('Transaction rolled back');
    }
    
    let errorMessage = error.message;
    if (error.message && error.message.includes('integrity constraint')) {
      errorMessage = '物料编码不存在或数据违反了数据库约束，请检查物料编码是否正确';
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`Oracle proxy server listening on port ${PORT}`);
});