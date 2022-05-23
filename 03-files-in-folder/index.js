const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

const myPath = path.join(__dirname, 'secret-folder');
fs.readdir(myPath, {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
  if (err) throw err;
  files.forEach(function(item){
    if(item.isFile()){
      const fileName = path.parse(item.name).name;
      const extName = path.extname(item.name).slice(1);
      const filePath = path.join(myPath,item.name);
      let fileSize = Number();
      fs.stat(filePath, (err, stats) => {
        fileSize = stats.size;
        stdout.write(`${fileName} - ${extName} - ${fileSize}b\n`);
      });
    }
  });
});