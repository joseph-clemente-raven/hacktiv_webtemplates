import React, { useCallback, useEffect, useState } from 'react';
import Pagination from './Pagination';
import { ExportExcel } from '../../helper/ExportExcel';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const DynamicTable = ({ 
    search=true,
    output=true,
    create=true,

    headers, 
    data, 
    pageCount=1,
    pageNumber=1,
    setPageNumber,
    pageSize=10,
    setPageSize,

    searchTerm='', 
    setSearchTerm, 
    handleCreate,
    exportData=[],
    selectedRows,
    setSelectedRows,
}) => {
    const [selectAll, setSelectAll] = useState(false);
    // Function to toggle select/unselect all
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]); // Clear all selections
        } else {
            // Select all rows
            setSelectedRows(data.map((item) => item.id)); // Assuming each row has a unique identifier 'id'
        }
        setSelectAll(!selectAll); // Toggle the selectAll state
    };
    
    // Function to toggle individual row selection
    const toggleRowSelection = (itemId) => {
        if (selectedRows.includes(itemId)) {
            setSelectedRows(selectedRows.filter((id) => id !== itemId)); // Unselect the row
        } else {
            setSelectedRows([...selectedRows, itemId]); // Select the row
        }
    };

    const getExcelRecord = useCallback(async () => {
        var dataList = exportData || data;
        return dataList;
    }, [])

    return (
        <div className="container mx-auto flex flex-col gap-3">
            <div className='w-full flex justify-between'>
                {
                    search &&
                    <div className="relative flex w-96 flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-describedby="button-addon1" />

                        {/* <!--Search button--> */}
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                }
                <div className='flex items-center justify-center gap-4'>
                {
                    output &&
                    <ExportExcel
                        fileName={"Transaction"}
                        onRequestRecord={getExcelRecord}
                    />
                }
                {
                    create &&
                    <BsFillPlusCircleFill className="cursor-pointer" color='red' size={28} onClick={handleCreate}/>
                }
                </div>
            </div>
            {data.length === 0 ? (
            <p className="text-center text-gray-600">No matching records found.</p>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                <thead>
                    <tr>
                    {headers.map((header, index) => (
                        <th
                        key={index}
                        className={`w-1/4 ${
                            index === 0 ? 'sm:w-1/3' : 'sm:w-1/4'
                        } p-2 text-left font-semibold bg-gray-200`}
                        >
                        {header}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        {headers.map((header, index) => (
                        <td
                            key={index}
                            className={`border px-4 py-2 ${
                            index === 0 ? 'sm:w-1/3' : 'sm:w-1/4'
                            }`}
                        >
                            {item[header.toLowerCase()]}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
            <Pagination
                dataPageCount={pageCount}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                rowsPerPage={pageSize}
                setRowsPerPage={setPageSize}
            />
        </div>
    );
};

export default DynamicTable;