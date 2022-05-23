const path = require('path');
const fs = require('fs');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');

let rl = readline.createInterface({input, output});

const fileName = path.join(__dirname,'text.txt');
const streamWrite = fs.createWriteStream(fileName, 'utf-8');

output.write('Введите текст\n');

rl.on('line', (input) => {
  if (input === 'exit') {
    output.write('Добавление текста завершено');
    process.exit();
  }
  else streamWrite.write(input + '\n');
});

rl.on('SIGINT', () => { 
  console.log('Добавление текста завершено');
  process.exit();
});