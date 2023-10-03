import React, { useCallback } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri"
import { getDateNow } from "./helper";

const FILE_EXTENSION = ".xlsx";

export const ExportExcel = ({ csvData, fileName, onRequestRecord, size=30 }) => {
  const exportToExcel = useCallback(
    (csvData) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(csvData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, fileName + getDateNow() + FILE_EXTENSION);
    },
    [fileName]
  );

  const handleRequestRecord = useCallback(async () => {
    if (typeof onRequestRecord === "function") {
      const excelRecords = await onRequestRecord();
      exportToExcel(excelRecords);
    } else {
      exportToExcel(csvData);
    }
  }, [onRequestRecord, exportToExcel, csvData]);

  return (
    <RiFileExcel2Line
        onClick={handleRequestRecord}
        className="cursor-pointer"
        size={size}
    />
  );
};
