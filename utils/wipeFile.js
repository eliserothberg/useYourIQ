//this will wipe the export.csv file after five minutes.
var fs = require('fs');
var jsonexport = require('jsonexport');
var x;

function clearFile() {
  jsonexport(x,function(err, csv){
    var path = "excel.csv";
    var data = '';
    
    fs.writeFile(path, data, function(error) {
      if (error) {
        console.error("wipe file error:  " + error.message);
      } else {

        console.log("Successful wipe of " + path);
      }
    });
  });
}

module.exports = clearFile;