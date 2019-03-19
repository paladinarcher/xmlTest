var testData = require('./parser.js');

//var x = JSON.parse(testData);

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let payersSection = components[0].structuredBody.component[0].section;

let entryNum = 1;
let entryArray = new Array();
payersSection.entry.forEach(function(entry) {
    let lowTime = entry.act.entryRelationship.act.effectiveTime.low._attributes.value;
    let highTime = entry.act.entryRelationship.act.effectiveTime.high._attributes.value;

    entryArray[entryNum] = [lowTime,highTime];
    entryNum++;
});

console.log("data: ", entryArray);