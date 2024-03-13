import { useState } from 'react';
import * as XLSX from 'xlsx';
import { GoUpload } from 'react-icons/go';
import { useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { CiTrash } from 'react-icons/ci';
const ImportExcel = ({ getData }) => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [excelName, setExcelName] = useState('');

  const convertToJson = (headers, data) => {
    const rows = [] as any;
    data.forEach(row => {
      const rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
  const importExcel = e => {
    const file = e.target.files[0];
    setExcelName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      // const heads = headers.map((head) => head.replace(/ /g, '_'))
      const rows = fileData.slice(1);
      const jsonData = convertToJson(headers, rows);
      setData(jsonData);
    };
    return reader.readAsBinaryString(file);
  };
  useEffect(() => {
    if (data) {
      setUpdateData([...data]);
    }
  }, [data]);
  const handleUpdateListProductItems = async () => {
    //
  };
  return (
    <div className="ml-4 flex items-center gap-4">
      {updateData.length > 0 && excelName ? (
        <div
          className="flex items-center text-base cursor-pointer text-link underline"
          onClick={handleUpdateListProductItems}
        >
          <Tooltip content="Cập nhật danh sách phòng" color="default">
            <div>{excelName}</div>
          </Tooltip>
          <Tooltip content="Xoá" color="danger">
            <div>
              <CiTrash
                className="ml-2 h-5 w-5 text-red-600"
                onClick={() => setExcelName('')}
              />
            </div>
          </Tooltip>
        </div>
      ) : (
        <label htmlFor="upload-file" className="cursor-pointer">
          <Button className="rounded-[8px] px-4 py-2 bg-blueButton pointer-events-none">
            <input
              type="file"
              onChange={importExcel}
              name="upload-file"
              id="upload-file"
              hidden
            />
            <div className="text-white flex cursor-pointer items-center first-letter:text-sm">
              Nhập Excel
              <GoUpload className="ml-2 h-4 w-4 text-white" />
            </div>
          </Button>
        </label>
      )}
    </div>
  );
};

export default ImportExcel;
