import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';

const DownloadCompany = () => {
    const [cdata, setCdata] = useState([]);

    // Fetch company data from the server
    const fetchCompany = async () => {
        try {
            const res = await axios.get('https://companybackend-code.onrender.com/api/v1/company/get');
            console.log(res.data);
            console.log(res.data.foundComapy);
            setCdata(res.data.foundComapy);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    // Export data to an Excel sheet
    const exportData = async (e) => {
        e.preventDefault();

        // Step 1: Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Company Data');

        // Step 2: Define the columns for the worksheet
        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 30 },
            { header: 'Company Code', key: 'code', width: 20 },
        ];

        // Step 3: Add rows to the worksheet
        cdata.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                code: company.code,
            });
        });

        // Step 4: Generate the Excel file and trigger download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a download link and trigger a download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'CompanyData.xlsx';
        link.click();
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    return (
        <div>
            <h1>Company details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {!cdata.length ? (
                        <tr>
                            <td colSpan="2">No companies found</td>
                        </tr>
                    ) : (
                        cdata.map((ele, i) => (
                            <tr key={i}>
                                <td>{ele.name}</td>
                                <td>{ele.code}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <button onClick={exportData} disabled={!cdata.length}>Export</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default DownloadCompany;
