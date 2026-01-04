// Oracle proxy service configuration
const PROXY_URL = 'https://oracle-proxy-314890691419.us-central1.run.app';

// Test proxy connection
export async function testOracleConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${PROXY_URL}/health`);
    
    if (!response.ok) {
      return { 
        success: false, 
        error: 'Proxy service is not responding' 
      };
    }
    
    const data = await response.json();
    return { success: data.status === 'ok' };
  } catch (error: any) {
    console.error('Proxy connection test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Proxy connection failed' 
    };
  }
}

// Validate WO_WLID exists in WLXX table via proxy
export async function validateWOWLID(woWlid: string): Promise<{ exists: boolean; error?: string }> {
  try {
    console.log('=== Starting validation for:', woWlid);
    
    const trimmedWlid = woWlid.trim();
    console.log('Trimmed WLID:', trimmedWlid, 'Length:', trimmedWlid.length);
    
    const response = await fetch(`${PROXY_URL}/api/validate-material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wlid: trimmedWlid })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Validation API error:', errorData);
      return { 
        exists: false, 
        error: errorData.error || 'Validation request failed' 
      };
    }
    
    const data = await response.json();
    console.log('Validation result:', data);
    
    return { exists: data.exists };
    
  } catch (error: any) {
    console.error('=== Oracle validation error details ===');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    return { 
      exists: false, 
      error: error.message || 'Database validation failed' 
    };
  }
}
