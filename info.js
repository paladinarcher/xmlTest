const testData = require('./parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let payersSection = components[0].structuredBody.component[0].section;
let allergySection = components[0].structuredBody.component[2].section;
let fillerData = mappingSection.text.Container;

console.log("data: ", mappingSection.text.Container.MemberEnrollments.MemberEnrollment[0].InsuredGroupOrPolicyNumber._text);
console.log("dataDose: ", allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0]);
//console.log('dataTreze: ', fillerData.Encounters.Encounter[0].EnteredAt.Description._text);
