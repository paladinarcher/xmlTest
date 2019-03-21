var expect = require('chai').expect;
var testData = require('../parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let ADSection = components[0].structuredBody.component[1].section;
let memberEnrollments = mappingSection.text.Container.MemberEnrollments.MemberEnrollment;
memberEnrollments.reverse();
let advanceDirectives = mappingSection.text.container.AdvanceDirectives.AdvanceDirective;
let title = ADSection.title._text;
let camTitle = title.replace(' ','');
camTitle = camTitle.charAt(0).toUpperCase() + camTitle.slice(1);

describe('CCD1.1', function () {
    describe('Advanced Directives Section', function() {
        describe('templateId tag', function() {
            it('should have the correct root attribute for the templateid tag', function () {
                let exists = false;
                ADSection.templateId.forEach(function(templateId) {
                    if(templateId._attributes.root === '2.16.840.1.113883.10.20.22.2.21') {
                        exists = true;
                    }
                });
                expect(exists).to.be.true;
            });
        });
    });
    describe('code tag', function() {
        let code = ADSection.code._attributes;
        it('should have the correct attributes for the code tag', function(){
            expect(code.code).to.be.equal('42348-3', 'The code tags code attribute does not match!');
            expect(code.displayName).to.be.equal('Advance Directives', 'The code tags displayName attribute does not match!');
            expect(code.codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The code tags codeSystem attribute does not match!');
            expect(code.codeSystemName).to.be.equal('LOINC', 'The code tags codeSystemName attribute does not match!');
        });
    });
    describe('title tag', function() {
        it('should have the correct text in the title tag', function () {
            expect(title).to.be.equal('Advance Directives', 'The text in the title tag does not match!');
        });
    });
    describe('text/paragraph tag', function() {
        it('should have the correct text in the text/paragraph tag', function () {
            let paragraph = ADSection.text.paragraph._text;
            expect(paragraph).to.satisfy(function(val) {
                let ex1 = 'This section includes a list of a patient\'s completed, amended, or rescinded VA Advance Directives, but an actual copy is not included.';
                let ex2 = 'This section contains ALL of a patient\'s completed or amended VA Advance and Rescinded Directives. Entries below indicate that a directive exists for the patient, but an actual copy is not included with this document.';
                if(val === ex1 || val === ex2) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    });
    describe('entry tags', function() {
        let entryNum = 1;
        ADSection.entry.forEach(function(entry) {
            let enteredBy = advanceDirectives[entryNum-1].EnteredBy.Description._text;
            describe('entry tag number '+entryNum, function() {
                it('Each entry should have the correct typeCode attribute', function() {
                    expect(entry._attributes.typeCode).to.be.equal('DRIV');
                });
                describe('entry/observation tag', function() {
                    it('The observation tag should have the correct attributes', function() {
                        let observation = entry.observation._attributes;
                        expect(observation.classCode).to.be.equal('OBS', 'The classCode attribute of the observation tag is incorrect!');
                        expect(observation.moodCode).to.be.equal('EVN','The moodCode attribute of the observation tag is incorrect!');
                    });
                    it('The templateId tag should have the correct attributes', function() {
                        let otemplateId = entry.observation.templateId._attributes;
                        expect(otemplateId.root).to.be.equal('2.16.840.1.113883.10.20.22.4.48', 'The root attribute of the templateId tag is incorrect!');
                    });
                    it('The id tag should have the correct attributes', function() {
                        let oid = entry.observation.id._attributes;
                        expect(oid.nullFlavor).to.be.equal('UNK', 'The nullFlavor attribute of the id tag is incorrect!');
                    });
                    describe('observation/code tag', function() {
                        it('The code tag should have the correct attributes', function() {
                            let ocode =  entry.observation.code._attributes;
                            expect(ocode['xsi:type']).to.be.equal('CD', 'The xsi:type attribute of the code tag is incorrect!');
                            expect(ocode.nullFlavor).to.be.equal('UNK', 'The nullFlavor attribute of the code tag is incorrect!');
                        });
                        it('The originalText/reference tag should have the correct attributes', function() {
                            let creference =  entry.observation.code.originalText.reference._attributes;
                            expect(creference.value).to.be.equal('#'+camTitle+entryNum, 'The value attribute of the reference tag is incorrect!');
                        });
                    });
                    describe('observation/effectiveTime tag', function() {
                        let effectiveTime = entry.observation.effectiveTime;
                        it('The effectiveTime/low tag should have the correct attributes', function() {
                            expect(effectiveTime.low._attributes.value, 'The value attribute of the effectiveTime/low tag is incorrect!').to.exist;
                        });
                        it('The effectiveTime/high tag should have the correct attributes', function() {
                            expect(effectiveTime.low._attributes.value).to.be.equal('UNK', 'The nullFlavor attribute of the effectiveTime/high tag is incorrect!');
                        });
                    });
                    describe('observation/value tag', function() {
                        it('The value tag should have the correct attributes', function() {
                            let ovalue =  entry.observation.value._attributes;
                            expect(ovalue['xsi:type']).to.be.equal('CD', 'The xsi:type attribute of the value tag is incorrect!');
                        });
                        it('The originalText/reference tag should have the correct attributes', function() {
                            let vreference =  entry.observation.value.originalText.reference._attributes;
                            expect(vreference.value).to.be.equal('#'+camTitle+entryNum, 'The value attribute of the reference tag is incorrect!');
                        });
                    });
                    describe('observation/participant number 1', function() {
                        let participant = entry.observation.participant[0];
                        let ptype = participant._attributes.typeCode;
                        it("The participant tag should have the correct attributes", function() {
                            expect(ptype).to.be.equal('VRF', 'The typeCode attribute of the participant tag is incorrect!');
                        });
                    });
                });
            });

            entryNum++;
        });
    });
});