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
            let memberEnrollments = mappingSection.text.Container.MemberEnrollments.MemberEnrollment;
            memberEnrollments.reverse();
            let exists = false;
            let entryNum = 1;
            payersSection.entry.forEach(function(entry) {
                let groupNum = memberEnrollments[entryNum-1].InsuredGroupOrPolicyNumber;
                if(groupNum) { groupNum = groupNum._text; }
                let insuredRelationship = memberEnrollments[entryNum-1].HealthFund.InsuredRelationship.Description;
                if(insuredRelationship) { insuredRelationship = insuredRelationship._text; }
                let membershipNumber = memberEnrollments[entryNum-1].HealthFund.MembershipNumber;
                if(membershipNumber) { membershipNumber = membershipNumber._text; }
                let insuranceType = memberEnrollments[entryNum-1].InsuranceTypeOrProductCode;
                let insurancePlan = memberEnrollments[entryNum-1].HealthFund.HealthFundPlan;
                let organizationName = memberEnrollments[entryNum-1].EnteredAt;
                let statusCode = entry.act.statusCode._attributes.code;
                let erid = entry.act.entryRelationship.act.id._attributes;
                describe('entry number '+entryNum, function() {
                    it('Each entry should have the extension attribute of the entry/act/entryRelationship/act/id tag set to the groupNum', function() {
                        expect(erid.extension).to.exist.and.be.equal(groupNum, 'The extension attribute of the entryRelationship/act/id tag is not set to the group number');
                    });
                    it('Each entry should have the root attribute of the entry/act/entryRelationship/act/id tag set correctly', function() {
                        expect(erid.root).to.be.equal('2.16.840.1.113883.4.349', 'The root attribute of the entryRelationship/act/id tag is not set correctly');
                    });
                    it('Each entry should have the code attribute of the entry/act/entryRelationship/act/statusCode tag set to completed', function() {
                        expect(statusCode).to.be.equal('completed','The code attribute of the statusCode tag is not set to completed');
                    });
                    describe('entry/act/entryRelationship/act/code tag', function() {
                        let code = entry.act.entryRelationship.act.code._attributes;
                        if(insuranceType && insuranceType.Code._text) {
                            it('Each entry should have the code attribute of the code tag set to the proper code', function() {
                                expect(code.code).to.be.equal(insuranceType.Code._text, 'The code attribute of the code tag is incorrect');
                            });
                            it('Each entry should have the displayName attribute of the code tag set to the proper displayName', function() {
                                expect(code.displayName).to.be.equal(insuranceType.Description._text, 'The displayName attribute of the code tag is incorrect');
                            });
                            it('Each entry should have the codeSystemName attribute of the code tag set to the proper codeSystemName', function() {
                                expect(code.codeSystemName).to.be.equal('X12N-1336', 'The codeSystemName attribute of the code tag is incorrect');
                            });
                            it('Each entry should have the codeSystem attribute of the code tag set to the proper codeSystem', function() {
                                expect(code.codeSystem).to.be.equal('2.16.840.1.113883.6.255.1336', 'The codeSystem attribute of the code tag is incorrect');
                            });
                        } else {
                            it('Each entry should have the nullFlavor attribute of the code tag set to NA', function() {
                                expect(code.nullFlavor).to.be.equal('NA', 'The nullFlavor attribute of the code tag is incorrect');
                            });
                        }
                    });
                    describe('entry/act/entryRelationship/act/effectiveTime tag', function() {
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
                                expect(addr.streetAddressLine).to.exist;
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
                            let telecom = entry.act.entryRelationship.act.performer.assignedEntity.telecom._attributes.value;
                            expect(telecom).to.exist;
                        });
                        describe('assignedEntity/representedOrganization tag', function() {
                            it('Each entry should have text defined in the representedOrganization/name tag', function() {
                                let orgName = entry.act.entryRelationship.act.performer.assignedEntity.representedOrganization.name._text;
                                expect(orgName).to.be.equal(groupNum);
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
                            it('Each entry should have extension attribute of representedOrganization/id tag set to facilityNuber', function() {
                                expect(roid.extension).to.be.equal(organizationName.Code._text);
                            });
                            it('Each entry should have extension attribute of representedOrganization/id tag set to correct value', function() {
                                expect(roid.root).to.be.equal('2.16.840.1.113883.4.349');
                            });
                            it('Each entry should have extension attribute of representedOrganization/id tag set to facilityName', function() {
                                let roname = entry.act.entryRelationship.act.author.assignedAuthor.representedOrganization.name._text;
                                expect(roname).to.be.equal(organizationName.Description._text);
                            });
                        });
                    });
                });
                
                let pr = entry.act.entryRelationship.act.participant.participantRole;
                let pid = pr.id._attributes;
                if(insuredRelationship == 'PATIENT') {
                    describe('entry/act/entryRelationship/act/participant/participantRole tag', function() {
                        it('Each entry with a participant whos relationship is PATIENT should have the extension attribute of the participantRole/id tag with the subscriber id', function() {                           
                            expect(pid.extension).to.be.equal(membershipNumber);
                        });
                        it('Each entry with a participant whos relationship is PATIENT should have the correct root attribute of the participantRole/id tag', function() {                           
                            expect(pid.root).to.be.equal('2.16.840.1.113883.4.349');
                        });
                        it('Each entry withe a participant whos relationship is PATIENT should not have a addr tag', function() {
                            expect(pr.addr).to.not.exist;
                        });
                        it('Each entry withe a participant whos relationship is PATIENT should not have a telecom tag', function() {
                            expect(pr.telecom).to.not.exist;
                        });
                        it('Each entry withe a participant whos relationship is PATIENT should not have a name tag', function() {
                            expect(pr.name).to.not.exist;
                        });
                    });
                } else {
                    describe('entry/act/entryRelationship/act/participant/participantRole tag', function() {
                        it('Each entry with a participant whos relationship is not PATIENT should have the nullFlavor attribut of the participantRole/id tag equal to UNK', function() {
                            expect(pid.nullFlavor).to.be.equal('UNK');
                        });
                        describe('participantRole/addr tag', function() {
                            it('Each entry with participant whos relationship is not PATIENT should have the addr tag', function() {
                                expect(pr.addr).to.exist;
                            });
                            if(pr.addr) {
                                it('Each entry with participant whos relationship is not PATIENT should have the addr/streetAddressLine tag', function() {
                                    expect(pr.addr.streetAddressLine).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the addr/city tag', function() {
                                    expect(pr.addr.city).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the addr/state tag', function() {
                                    expect(pr.addr.state).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the addr/postalCode tag', function() {
                                    expect(pr.addr.postalCode).to.exist;
                                });
                            }
                        });
                        describe('participantRole/telecom tag', function() {
                            it('Each entry with participant whos relationship is not PATIENT should have the telecom tag', function() {
                                expect(pr.telecom).to.exist;
                            });
                            if(pr.telecom) {
                                it('Each entry with participant whos relationship is not PATIENT should have the use attribute of the telecom tag set correctly', function() {
                                    expect(pr.telecom._attributes.use).to.be.equal('HP');
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the value attribute of the telecom tag', function() {
                                    expect(pr.telecom._attributes.value).to.exist;
                                });
                            }
                        });
                        describe('participantRole/name tag', function() {
                            it('Each entry with participant whos relationship is not PATIENT should have the name tag', function() {
                                expect(pr.name).to.exist;
                            });
                            if(pr.name) {
                                it('Each entry with participant whos relationship is not PATIENT should have the name/prefix tag', function() {
                                    expect(pr.name.prefix).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the name/given tag', function() {
                                    expect(pr.name.given).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the name/family tag', function() {
                                    expect(pr.name.family).to.exist;
                                });
                                it('Each entry with participant whos relationship is not PATIENT should have the name/suffix tag', function() {
                                    expect(pr.name.suffix).to.exist;
                                });
                            }
                        });
                    });
                }

                describe('entry/act/entryRelationship/act/entryRelationship/act tag', function() {
                    let act = entry.act.entryRelationship.act.entryRelationship.act;
                    it('Each entry should have the extension attribute of the act/id tag with the plan number', function() {                     
                        expect(act.id._attributes.extension).to.be.equal(insurancePlan.Description._text);
                    });
                    it('Each entry should have the correct root attribute of the act/id tag', function() {                           
                        expect(act.id._attributes.root).to.be.equal('2.16.840.1.113883.4.349');
                    });
                    it('Each entry should have the correct nullFlavor attribute of the act/code tag', function() {                           
                        expect(act.code._attributes.nullFlavor).to.be.equal('NA');
                    });
                    it('Each entry should have the act/text tag to have the plan name', function() {                           
                        expect(act.text._text).to.be.equal(insurancePlan.Description._text);
                    });
                });
                
                entryNum++;
            });
        });
    });
});