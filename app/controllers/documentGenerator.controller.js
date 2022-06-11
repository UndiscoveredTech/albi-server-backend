// const XLSX = require('xlsx');

const excel = require("exceljs");

const generate = async (req, res) => {
    try {
            const data = [
                { name: 'Diary', code: 'diary_code', author: 'Pagorn' },
                { name: 'Note', code: 'note_code', author: 'Pagorn' },
                { name: 'Medium', code: 'medium_code', author: 'Pagorn' },
            ]
            

            let workbook = new excel.Workbook();
            workbook.creator = "Adem";
            workbook.created = new Date();
            let worksheet = workbook.addWorksheet("Tutorials");
            

            // Add page header 
            // var headerRange  = worksheet.getRange("A1:F1");
            // // headerRange.
            // headerRange.value = "TITLEEE";
            worksheet.mergeCells("A3:P3");
            worksheet.getCell('A3').value = 'This is title for PAYROLL';
            worksheet.getCell('A3').alignment = { horizontal:'center'} ;

            worksheet.getCell("A1").value = "";
            worksheet.getCell("A2").value = "";

            worksheet.getCell("C4").value = "";

            // Add Array Rows
            var headerRow = worksheet.getRow(6);

            
            headerRow.values = ['Name',"Code","Author"];
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Code", key: "code", width: 25 },
                { header: "Author", key: "author", width: 10 },
                ];
            worksheet.getRow(1).values = [];

            worksheet.getCell('A3').value = 'This is title for PAYROLL';
            worksheet.getCell('A3').alignment = { horizontal:'center'} ;
            worksheet.getRow(4).values = [];
            worksheet.getRow(5).values = [];

           
            headerRow.eachCell({includeEmpty: false}, cell => {
                console.log("--- ", cell);
                cell.style = {
                    font:{
                        color: {
                            argb: "004e47cc"
                        }
                    }
                }

            })
            worksheet.addRows(data);
            // worksheet.getCell("C5").value = "ademiiii";

            // Style first row
    // worksheet.getRow(1).font = {
    //     name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true
    //   };
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "tutorials.xlsx"
            );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } catch (err) {
        res.json({ message: err });
    }
}


// setHeaderTitle = (worksheet) => {
//     var headerRange  = worksheet.getRange("A1:F1");
//     headerRange.merge();
//     headerRange.value = "TITLEEE";
    
// }




module.exports = { generate}