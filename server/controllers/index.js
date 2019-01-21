const path = require('path');
const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);

const DATABASE = path.join(path.dirname(__dirname), 'database');
console.log('DDDD', DATABASE)
const generatePhoneNumbers = async (req, res, next) => {
  const [MIN, MAX] = [100000000, 999999999];
  const totalNumber = req.body.totalNumber;
  console.log('total', totalNumber)
  let phoneNumbers = new Set();
 console.log('>>>>', phoneNumbers.size)
  while (phoneNumbers.size < totalNumber) {
    let randomNumber = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    randomNumber = '0' + randomNumber;
    phoneNumbers.add(randomNumber);
  }

  phoneNumbers = Array.from(phoneNumbers)
    .sort((a, b) => Number(a) - Number(b))
    .reduce((numbers, current) => {
      return numbers + '\n' + current;
    }, '')
    .trim();
  const fileName = String(Date.now());
  const filePath = path.join(DATABASE, `${fileName}.txt`);

  try {
    await writeFile(filePath, phoneNumbers);
    res.status(201).send({ message: 'Successfully created', id: fileName });
  } catch (error) {
    next(error);
  }
};
const downloadPhoneNumbers = async (req, res, next) => {
  let { id } = req.params;
  console.log(`ID===>`, id)
  if (id.split('.').length === 1) {
    id += '.txt';
  }

  try {
    let files = await readdir('./database');
    
    files = files.filter(file => file === id);
    if (files.length) {
      const filePath = path.join(DATABASE, files[0]);
      return res.download(filePath);
    }
    return res.status(404).send({
      error: { message: 'File not found. Try generating a new one' }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generatePhoneNumbers,
  downloadPhoneNumbers
}