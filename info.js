const testData = require('./parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let payersSection = components[0].structuredBody.component[0].section;
let allergySection = components[0].structuredBody.component[2].section;
let fillerData = mappingSection.text.Container;

console.log("data: ", mappingSection.text.Container.MemberEnrollments.MemberEnrollment[0].InsuredGroupOrPolicyNumber._text);
console.log("dataDose: ", allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0]);
//console.log('dataTreze: ', fillerData.Encounters.Encounter[0].EnteredAt.Description._text);

let entryNum = 1;
let entryArray = new Array();
payersSection.entry.forEach(function(entry) {
    let lowTime = entry.act.entryRelationship.act.effectiveTime.low._attributes.value;
    let highTime = entry.act.entryRelationship.act.effectiveTime.high._attributes.value;

    entryArray[entryNum] = [lowTime,highTime];
    entryNum++;
});

console.log("data: ", entryArray);
