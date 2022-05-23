const path = require('path');
const fs = require('fs');

const fileNameCss = path.join(__dirname, 'project-dist', 'bundle.css');
const pathCsss = path.join(__dirname, 'styles');

fs.readdir(pathCsss, {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
  if (err) throw err;
  const streamWrite = fs.createWriteStream(fileNameCss, 'utf-8');
  files.forEach((item)=>{
    if(item.isFile() && path.extname(item.name) === '.css'){
      let text = '';
      const stream = fs.createReadStream(path.join(pathCsss, item.name), 'utf-8');
      stream.on('end',()=>{
        streamWrite.write(`${text}\n`);
      });
      stream.on('data', chunk => {
        text += chunk;
      });
      stream.on('error', error => console.log('Error', error.message));
    }
  });
});
