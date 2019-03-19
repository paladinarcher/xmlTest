var expect = require('chai').expect;
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
                let insuredRelationship = mappingSection.text.Container.MemberEnrollments.MemberEnrollment[entryNum-1].HealthFund.InsuredRelationship.Description._text;
                let membershipNumber = mappingSection.text.Container.MemberEnrollments.MemberEnrollment[entryNum-1].HealthFund.MembershipNumber._text;
                let statusCode = entry.act.statusCode._attributes.code;
                let erid = entry.act.entryRelationship.act.id;
                if (erid._attributes.root == '2.16.840.1.113883.4.349' && erid._attributes.extension == groupNum) {
                    exists = true;
                }
                describe('entry number '+entryNum, function() {
                    it('Each entry should have the code attribute of the statusCode tag set to completed', function() {
                        expect(statusCode).to.be.equal('completed','The code attribute of the statusCode tag is not set to completed');
                    });
                    describe('entry/act/entryRelationship/act/effectiveTie tag', function() {
                        it('Each entry should contain the effectiveTime/low tag', function() {
                            let lowTime = entry.act.entryRelationship.act.effectiveTime.low._attributes.value;
                            expect(lowTime).to.exist;
                        });
                        it('Each entry should contain the effectiveTime/high tag', function() {
                            let highTime = entry.act.entryRelationship.act.effectiveTime.high._attributes.value;
                            expect(highTime).to.exist;
                        });
                    });
                    describe('entry/act/entryRelationship/act/performer/assignedEntity tag', function() {
                        it('Each entry should have the nullFlavor attribute in the assignedEntity/id tag set to UNK', function() {
                            let aeid = entry.act.entryRelationship.act.performer.assignedEntity.id._attributes.nullFlavor;
                            expect(aeid).to.be.equal('UNK');
                        });
                        describe('assignedEntity/addr tag', function() {
                            let addr = entry.act.entryRelationship.act.performer.assignedEntity.addr;
                            it('Each entry should have text defined in the addr/streetAddressLine tag', function() {
                                expect(addr.streetAddressLinie).to.exist;
                            });
                            it('Each entry should have text defined in the addr/streetAddressLine tag', function() {
                                expect(addr.city).to.exist;
                            });
                            it('Each entry should have text defined in the addr/streetAddressLine tag', function() {
                                expect(addr.state).to.exist;
                            });
                            it('Each entry should have text defined in the addr/streetAddressLine tag', function() {
                                expect(addr.postalCode).to.exist;
                            });
                        });
                        it('Each entry should have the value attribute exist on the assignedEntity/telcom tag', function() {
                            let telcom = entry.act.entryRelationship.act.performer.assignedEntity.telcom._attributes.value;
                            expect(telcom).to.exist;
                        });
                        describe('assignedEntity/representedOrganization tag', function() {
                            it('Each entry should have text defined in the representedOrganization/name tag', function() {
                                let orgName = entry.act.entryRelationship.act.performer.assignedEntity.representedOrganization.name._text;
                                expect(orgName).to.exist;
                            });
                        });
                    });
                    describe('entry/act/entryRelationship/act/author/assignedAuthor tag', function() {
                        it('Each entry shoud have the nullFlavor attribute of the assignedAuthor/id tag set to NI', function() {
                            let authorid = entry.act.entryRelationship.act.author.assignedAuthor.id._attributes.nullFlavor;
                            expect(authorid).to.be.equal('NI');
                        });
                        describe('assignedAuthor/representedOrganization tag', function() {
                            let roid = entry.act.entryRelationship.act.author.assignedAuthor.representedOrganization.id._attributes;
                            it('Each entry should have extension attribute of representedOrganization/id tag contain a number', function() {
                                expect(roid.extension).to.exist;
                            });
                            it('Each entry should have extension attribute of representedOrganization/id tag contain a number', function() {
                                expect(roid.root).to.be.equal('2.16.840.1.113883.4.349');
                            });
                            it('Each entry should have extension attribute of representedOrganization/id tag contain a number', function() {
                                let roname = entry.act.entryRelationship.act.author.assignedAuthor.representedOrganization.name._text;
                                expect(roname).to.exist;
                            });
                        });
                    });
                });
                describe('entry/act/entryRelationship/act/partisipant tag', function() {
                    let pid = entry.act.entryRelationship.act.participant.participantRole.id._attributes;
                    if(insuredRelationship == 'PATIENT') {
                        it('Each entry with a partisipant whos relationship is PATIENT should have the extension attribute of the partisipant/id tag with the subscriber id', function() {                           
                            expect(pid.extension).to.be.equal(membershipNumber);
                        });
                        it('Each entry with a partisipant whos relationship is PATIENT should have the correct root attribute of the partisipant/id tag', function() {                           
                            expect(pid.root).to.be.equal('2.16.840.1.113883.4.349');
                        });
                    } else {
                        it('Each entry with a partisipant whos relationship is not PATIENT should have the nullFlavor attribut of the partisipant/id tag equal to UNK', function() {
                            expect(pid.nullFlavor).to.be.equal('UNK');
                        });
                    }
                });
                entryNum++;
            });
            it('should have at least one entry that has group number assigned in id tag', function () {
                expect(exists).to.be.true;
            });
        });
    });
});