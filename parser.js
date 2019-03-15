const fs = require('fs');
const convert = require('xml-js');

const testFolder = '../data/';
const testFile = '../data/N5 HS CCD1.1 20190312.xml';

fs.readdirSync(testFolder).forEach(file => {
  //fs.readFileSync(file);
  //console.log(file);
 });

let xml = fs.readFileSync(testFile);
//console.log(xml);

xml = xml.toString('utf8');
xml = xml.replace("\ufeff", "");
//console.log('Second', xml);

let testData1 = convert.xml2json(xml, {compact: true, spaces: 2});
// //const result2 = convert.xml2json(xml, {compact: false, spaces: 4});
//console.log(testData, "this is text");
let testData = JSON.parse(testData1);
module.exports = testData;
