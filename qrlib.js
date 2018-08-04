var ImageModule=require('docxtemplater-image-module')
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater')
var fs = require('fs');
var path = require('path');
var topdf = require("./topdf");
function pushqr(docpath,pngpath,res){
    var content = fs
    .readFileSync(path.resolve(__dirname,"docs", docpath+".docx"), 'binary');
    var opts = {}
    opts.centered = false;
    opts.getImage=function(tagValue, tagName) {
        return fs.readFileSync(tagValue);
    }

    opts.getSize=function(img,tagValue, tagName) {
        return [100,100];
    }
    console.log(pngpath,docpath);
    var imageModule=new ImageModule(opts);

    var zip = new JSZip(content);
    var docx=new Docxtemplater()
        .attachModule(imageModule)
        .loadZip(zip)
        .setData({image:pngpath})
        .render();

    var buffer= docx
            .getZip()
            .generate({type:"nodebuffer", compression: "DEFLATE"});

    fs.writeFileSync(path.resolve(__dirname,"docs", docpath+".docx"),buffer);
    res.redirect("../../docs/"+docpath+".docx");
    setTimeout(function(){
        fs.unlink(path.resolve(__dirname,"docs", docpath+".docx"));
        fs.unlink(path.resolve(__dirname, pngpath))
    },1000);
    // topdf.convertopdf(docpath,res);

}

module.exports = {pushqr};