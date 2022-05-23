const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const pathFolderIn = path.join(__dirname,'files-copy');
const pathFolderOut = path.join(__dirname, 'files');

fs.stat(pathFolderIn, function(err) {
  if (!err) {
    fs.readdir(pathFolderIn, {withFileTypes: true, encoding: 'utf8'}, (err) => {
      if (err) throw err;
      fs.rm(pathFolderIn, {recursive: true}, () => {
        copyFolder();
      });
    });
  } 
  else {
    copyFolder();
  }
});

function copyFolder(){
  fsPromises.mkdir(pathFolderIn, { recursive:true}).then(function() {
    fs.readdir(pathFolderOut, {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
      if (err) throw err;
      files.forEach(function(item){
        if(item.isFile()){
          const fileNameOut = path.join(pathFolderOut,item.name);
          const fileNameIn = path.join(pathFolderIn,item.name);
          fs.copyFile(fileNameOut, fileNameIn, () => {});
        }
      });
    });
  }).catch(function() {
    console.log('failed to create directory');
  });
}