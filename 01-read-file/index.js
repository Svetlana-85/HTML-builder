const path = require('path');
const fs = require('fs');

const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('close', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));