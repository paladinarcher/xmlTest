var expect = require('chai').expect;
//var addTwoNumbers = require('../addNum');
var testData = require('../parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let payersSection = components[0].structuredBody.component[0].section;

describe('CCD1.1', function () {
    describe('payersSection', function() {
        describe('templateId tag', function() {
            it('should have the correct root attribute for the templateid tag', function () {
                let templateId = payersSection.templateId._attributes.root;
                expect(templateId).to.be.equal('2.16.840.1.113883.10.20.22.2.18', 'The templateId root attribute does not match!');
            });
        });
        describe('code tag', function() {
            it('should have the correct code attribute for the code tag', function(){
                let code = payersSection.code._attributes.code;
                expect(code).to.be.equal('48768-6', 'The code tags code attribute does not match!');
            });
            it('should have the correct displayName attribute for the code tag', function(){
                let displayName = payersSection.code._attributes.displayName;
                expect(displayName).to.be.equal('Payers', 'The code tags displayName attribute does not match!');
            });
            it('should have the correct codeSystem attribute for the code tag', function(){
                let codeSystem = payersSection.code._attributes.codeSystem;
                expect(codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The code tags codeSystem attribute does not match!');
            });
            it('should have the correct codeSystemName attribute for the code tag', function(){
                let codeSystemName = payersSection.code._attributes.codeSystemName;
                expect(codeSystemName).to.be.equal('LOINC', 'The code tags codeSystemName attribute does not match!');
            });
        });
        describe('title tag', function() {
            it('should have the correct text in the title tag', function () {
                let title = payersSection.title._text;
                expect(title).to.be.equal('Insurance Providers (Payers) Section', 'The text in the title tag does not match!');
            });
        });
        describe('text/paragraph tag', function() {
            it('should have the correct text in the text/paragraph tag', function () {
                let paragraph = payersSection.text.paragraph._text;
                expect(paragraph).to.be.equal('This section includes the names of all active insurance providers for the patient.', 'The text in the text/paragraph tag does not match!');
            });
        });
        describe('entry tags', function() {
            let groupNum = mappingSection.text.Container.MemberEnrollments.MemberEnrollment[0].InsuredGroupOrPolicyNumber._text;
            let exists = false;
            let entryNum = 1;
            payersSection.entry.forEach(function(entry) {
                let statusCode = entry.act.statusCode._attributes.code;
                let erid = entry.act.entryRelationship.act.id;
                if (erid._attributes.root == '2.16.840.1.113883.4.349' && erid._attributes.extension == groupNum) {
                    exists = true;
                }
                describe('entry number '+entryNum, function() {
                    it('Each entry should have the code attribute of the statusCode tag set to completed', function() {
                        expect(statusCode).to.be.equal('completed','The code attribute of the statusCode tag is not set to completed');
                    });
                    it('Each entry should have the value attribute on the enrty/act/entryRelationship/act/effectiveTime/low tag be filled in', function() {
                        let lowTime = entry.act.entryRelationship.act.effectiveTime.low._attributes.value;
                        expect(lowTime).to.not.be.null;
                    });
                    it('Each entry should have the value attribute on the enrty/act/entryRelationship/act/effectiveTime/high tag be filled in', function() {
                        let highTime = entry.act.entryRelationship.act.effectiveTime.high._attributes.value;
                        expect(highTime).to.not.be.null;
                    });
                });
                entryNum++;
            });
            it('should have at least one entry that has group number assigned in id tag', function () {
                expect(exists).to.be.true;
            });
        });
    });
});



