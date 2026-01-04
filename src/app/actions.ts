"use server";

import { type Task } from "@/lib/definitions";

const PROXY_URL = 'https://oracle-proxy-314890691419.us-central1.run.app';

type SubmissionResult = {
  success: boolean;
  errors?: {
    rowIndex: number;
    message: string;
    field?: keyof Task;
  }[];
};

export async function submitTasks(tasks: Task[]): Promise<SubmissionResult> {
  const errors: any[] = [];
  
  // Validate each task
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    
    // Check required fields
    if (!task.WO_WOID || !task.WO_WLID || !task.WO_XQSL || !task.WO_JHKGRQ || !task.WO_JHWGRQ || !task.WO_BMID) {
      errors.push({
        rowIndex: i,
        message: "所有字段都是必填项",
        field: 'WO_WOID'
      });
      continue;
    }
    
    // Validate quantity
    const quantity = parseFloat(task.WO_XQSL);
    if (isNaN(quantity) || quantity <= 0) {
      errors.push({
        rowIndex: i,
        message: "数量必须大于0",
        field: 'WO_XQSL'
      });
    }
    
    // Check for duplicate WO_WOIDs in current batch
    const duplicates = tasks.filter(t => t.WO_WOID === task.WO_WOID);
    if (duplicates.length > 1) {
      errors.push({
        rowIndex: i,
        message: `任务单号 ${task.WO_WOID} 在当前批次中重复`,
        field: 'WO_WOID'
      });
    }
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  // Prepare tasks with default values for Oracle
  const preparedTasks = tasks.map(task => ({
    ...task,
    WO_GCID: task.WO_GCID || '01',    // Default factory number
    WO_ZT: task.WO_ZT || 'I',         // Default status
    WO_LX: task.WO_LX || 'EXT',       // Default type
    WO_BZ: task.WO_BZ || '无',      
  }));
  
  // Submit tasks to Oracle via proxy service
  try {
    const response = await fetch(`${PROXY_URL}/api/submit-tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tasks: preparedTasks })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        errors: [{
          rowIndex: 0,
          message: errorData.error || '提交到数据库失败'
        }]
      };
    }
    
    const result = await response.json();
    return { success: result.success };
    
  } catch (error: any) {
    console.error('Submit tasks error:', error);
    return { 
      success: false, 
      errors: [{
        rowIndex: 0,
        message: error.message || '提交失败'
      }]
    };
  }
}