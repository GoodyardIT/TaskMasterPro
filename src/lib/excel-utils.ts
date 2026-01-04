import * as XLSX from 'xlsx';
import { Task } from './definitions';

export const downloadExcelTemplate = () => {
  const headers = ["生产任务单号", "物料编码", "需求数量", "计划开工日期", "计划完工日期", "完工部门ID"];
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
  XLSX.writeFile(workbook, 'TaskMaster_Template.xlsx');
};

export const importFromExcel = (file: File, callback: (data: Partial<Task>[]) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target?.result;
    const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'yyyy-mm-dd'
    });
    
    const formattedData = json.map((row: any) => ({
      WO_WOID: row['生产任务单号']?.toString() || '',
      WO_WLID: row['物料编码']?.toString() || '',
      WO_XQSL: row['需求数量']?.toString() || '',
      WO_JHKGRQ: row['计划开工日期'] instanceof Date ? row['计划开工日期'].toISOString().split('T')[0] : (row['计划开工日期']?.toString() || ''),
      WO_JHWGRQ: row['计划完工日期'] instanceof Date ? row['计划完工日期'].toISOString().split('T')[0] : (row['计划完工日期']?.toString() || ''),
      WO_BMID: row['完工部门ID']?.toString() || '',
    }));

    callback(formattedData);
  };
  reader.readAsBinaryString(file);
};