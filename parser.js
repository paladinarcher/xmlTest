const fs = require('fs');
const convert = require('xml-js');

const testFolder = '../data/';
const testFile = '../data/test.xml';

fs.readdirSync(testFolder).forEach(file => {
  //fs.readFileSync(file);
  //console.log(file);
 });

let xml = fs.readFileSync(testFile);
//console.log(xml);

xml = xml.slice(3).toString('utf8');
//console.log('Second', xml);

let testData1 = convert.xml2json(xml, {compact: true, spaces: 2});
// //const result2 = convert.xml2json(xml, {compact: false, spaces: 4});
//console.log(testData, "this is text");
let testData = testData1;
module.exports = testData;
