var testData = require('./parser.js');

//var x = JSON.parse(testData);

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let payersSection = components[0].structuredBody.component[0].section;

console.log("data: ", mappingSection.text.Container.MemberEnrollments.MemberEnrollment[0].InsuredGroupOrPolicyNumber._text);