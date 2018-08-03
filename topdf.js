var toPdf = require("office-to-pdf")
// var fs = require("fs")
var path = require("path");
var converter = require('office-converter')();
function convertopdf(docpath,res){

    converter.generatePdf(path.resolve(__dirname,"docs", docpath+".docx"), function(err, result) {
        console.log(err);
        if (result.status === 0) {
            res.redirect("../../docs/"+docpath+".docx");
            console.log('Output File located at ' + result.outputFile);
        }
    });
    // var wordBuffer = fs.readFileSync(path.resolve(__dirname,"docs", docpath+".docx"));

    // toPdf(wordBuffer).then(
    // (pdfBuffer) => {
    //     fs.writeFileSync(path.join(__dirname,"docs", docpath+".pdf"), pdfBuffer);
    //     res.redirect("../../docs/"+docpath+".pdf");
    //     }, (err) => {
    //         console.log(err)
    //     }
    // )
}

module.exports = {convertopdf}



