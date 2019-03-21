var expect = require('chai').expect;
var testData = require('../parser.js');

let components = testData.ClinicalDocument.component;
let mappingSection = components[components.length-1].section;
let allergySection = components[0].structuredBody.component[2].section;
let fillerData = mappingSection.text.Container;

describe('CCD1.1', function () {
  describe('allergySection', function() {
    describe('templateId tag', function() {
        it('should have the correct root attribute for the templateid tags', function () {
            let templateId1 = allergySection.templateId[0]._attributes.root;
            expect(templateId1).to.be.equal('2.16.840.1.113883.10.20.22.2.6.1', 'The templateId1 root attribute does not match!');
            let templateId2 = allergySection.templateId[1]._attributes.root;
            expect(templateId2).to.be.equal('2.16.840.1.113883.10.20.22.2.6', 'The templateId2 root attribute does not match!');
        });
    }); // End of templateID tag
    describe('code tag', function() {
        it('should have the correct code attribute for the code tag', function(){
            let code = allergySection.code._attributes.code;
            expect(code).to.be.equal('48765-2', 'The code tags code attribute does not match!');
        });
        it('should have the correct displayName attribute for the code tag', function(){
            let displayName = allergySection.code._attributes.displayName;
            expect(displayName).to.be.equal('Allergies, adverse reactions, alerts', 'The code tags displayName attribute does not match!');
        });
        it('should have the correct codeSystem attribute for the code tag', function(){
            let codeSystem = allergySection.code._attributes.codeSystem;
            expect(codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The code tags codeSystem attribute does not match!');
        });
        it('should have the correct codeSystemName attribute for the code tag', function(){
            let codeSystemName = allergySection.code._attributes.codeSystemName;
            expect(codeSystemName).to.be.equal('LOINC', 'The code tags codeSystemName attribute does not match!');
        });
    }); // End of Code Tag
    describe('title tag', function() {
        it('should have the correct text in the title tag', function () {
            let title = allergySection.title._text;
            expect(title).to.be.equal('Allergies Section', 'The text in the title tag does not match!');
        });
    }); // End of title tag
    describe('text/paragraph tag', function() {
        it('should have the correct text in the text/paragraph tag', function () {
            let paragraph = allergySection.text.paragraph._text;
            expect(paragraph).to.be.equal('This section includes Allergies on record with VA for the patient. The data comes from all VA treatment facilities. It does not list allergies that were removed or entered in error. Some allergies may also be reported in the Immunization section.', 'The text in the text/paragraph tag does not match!');
        });
    }); // end of paragraph tag


    // ASSESSMENT TEXT TEST NEEDED

    
    describe('allergy problem act code', function() {
      it('should have the correct code attribute for the allergy problem act code', function(){
        let code = allergySection.entry[0].act.code._attributes.code;
        expect(code).to.be.equal('48765-2', 'The allergy problem act code attribute does not match!');
      });

      it('should have the correct codeSystem attribute for the allergy problem act code', function(){
        let codeSystem = allergySection.code._attributes.codeSystem;
        expect(codeSystem).to.be.equal('2.16.840.1.113883.6.1', 'The allergy problem act codeSystem attribute does not match!');
      });

      it('should have the correct codeSystemName attribute for the allergy problem act code', function(){
        let codeSystemName = allergySection.entry[0].act.code._attributes.codeSystemName;
        expect(codeSystemName).to.be.equal('LOINC', 'The allergy problem act codeSystemName attribute does not match!');
      });

      it('should have the correct displayName attribute for the allergy problem act code', function(){
        let displayName = allergySection.entry[0].act.code._attributes.displayName;
        expect(displayName).to.be.equal('Allergies, adverse reactions, alerts', 'The allergy problem act displayName attribute does not match!');
      });

    }); // End of allergy problem act code

    describe('allergy problem act status code', function() {
      it('should have the correct code attribute for the allergy problem act code', function(){
        let statusCode = allergySection.entry[0].act.statusCode._attributes.code;
        expect(statusCode).to.be.equal('active', 'The allergy problem act statusCode attribute does not match!');
      });
    }); // End of allergy problem act status code


    // TEST NEEDED FOR allergy problem concern act effective time


    // Information Source for Allergy
    describe('Information Source for Allergy', function() {
      // author id
      it('should have the correct code attribute for the author id', function(){
        let authorID = allergySection.entry[0].act.author.assignedAuthor.id._attributes.nullFlavor;
        expect(authorID).to.be.equal('NI', 'The author id attribute does not match!');
      }); 

      // represented Organization
      describe('Represented Organization', function() {
        // id -root
        it('should have the correct code attribute for the represented Organization id root', function(){
          let facilityNumber = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.id._attributes.root;
          expect(facilityNumber).to.be.equal('2.16.840.1.113883.4.349', 'The represented Organization id attribute root does not match!');
        }); 

        //id -extension
        it('should have the correct code attribute for the represented Organization id extension', function(){
          let facilityNumber = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.id._attributes.extension;
          let extension = fillerData.Encounters.Encounter[0].HealthCareFacility.Code._text;
          expect(facilityNumber).to.be.equal((extension), `The represented Organization id ${facilityNumber} attribute extension does not match ${extension}!`);
        });

        //Organization Name
        it('should have the correct code attribute for the represented Organization Name', function(){
          let facilityName = allergySection.entry[0].act.author.assignedAuthor.representedOrganization.name._text;
          let fillerName = fillerData.Encounters.Encounter[0].EnteredAt.Description._text;
          expect(facilityName).to.be.equal((fillerName), `The represented Organization Name ${facilityName} attribute fillerName does not match ${fillerName}!`);
        });
      }); // end of represented Organization

      // Allergy Intolerance Obsevation 
      describe('Allergy Intolerance Obsevation', function() {
        // entryRelationship
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entryRelationship', function(){
          let entryRelationship = allergySection.entry[0].act.entryRelationship._attributes.typeCode;
          expect(entryRelationship).to.be.equal('SUBJ', `The Allergy Intolerance Obsevation entryRelationship attribute code does not match!`);
        });

        // classCode
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entry classCode', function(){
          let classCode = allergySection.entry[0].act.entryRelationship.observation._attributes.classCode;
          expect(classCode).to.be.equal('OBS', `The Allergy Intolerance Obsevation entry classCode attribute code does not match!`);
        });

        // moodCode
        it('should have the correct code attribute for the Allergy Intolerance Obsevation entry moodCode', function(){
          let moodCode = allergySection.entry[0].act.entryRelationship.observation._attributes.moodCode;
          expect(moodCode).to.be.equal('EVN', `The Allergy Intolerance Obsevation entry moodCode attribute code does not match!`);
        });

        // templateId
        it('should have the correct code attribute for the Allergy observation templateId', function(){
          let templateIdRoot = allergySection.entry[0].act.entryRelationship.observation.templateId._attributes.root;
          expect(templateIdRoot).to.be.equal('2.16.840.1.113883.10.20.22.4.7', `The Allergy Obsevation templateId attribute root code does not match!`);
        });
      }); // end of Allergy Intolerance Obsevation 

      // Allergy observation id
      describe('Allergy Intolerance Obsevation', function() {
        // id
        it('should have the correct code attribute for the Allergy observation id', function(){
          let id = allergySection.entry[0].act.entryRelationship.observation.id._attributes.nullFlavor;
          expect(id).to.be.equal('UNK', `The Allergy Obsevation id attribute code does not match!`);
        });

        // code
        it('should have the correct code attribute for the Allergy observation code', function(){
          let code = allergySection.entry[0].act.entryRelationship.observation.code._attributes.code;
          expect(code).to.be.equal('ASSERTION', `The Allergy Obsevation code attribute code does not match!`);
        });

        // codeSystems
        it('should have the correct code attribute for the Allergy observation codeSystems', function(){
          let codeSystem = allergySection.entry[0].act.entryRelationship.observation.code._attributes.codeSystem;
          expect(codeSystem).to.be.equal('2.16.840.1.113883.5.4', `The Allergy Obsevation code attribute codeSystem does not match!`);
        });

        // status code
        it('should have the correct code attribute for the Allergy observation statusCode', function(){
          let statusCode = allergySection.entry[0].act.entryRelationship.observation.statusCode._attributes.code;
          expect(statusCode).to.be.equal('completed', `The Allergy Obsevation code attribute statusCode does not match!`);
        });

        // have questions still need to work on this test
          // codeSystem
          // displayName

      }); // end of allergy observation code


      // Adverse Event Date ... Needs tests


      // Adverse Event Type ... Needs tests

      

       // Product & Product Detail
      describe('Product & Product Detail', function() {
        // typeCode
        it('should have the correct code attribute for the product & product participant typeCode', function(){
          let typeCode = allergySection.entry[0].act.entryRelationship.observation.participant._attributes.typeCode;
          expect(typeCode).to.be.equal('CSM', `The Product & Product particpant attribute typeCode does not match!`);
        });

        // classCode
        it('should have the correct code attribute for the product & product participantRole classCode', function(){
          let classCode = allergySection.entry[0].act.entryRelationship.observation.participant.participantRole._attributes.classCode;
          expect(classCode).to.be.equal('MANU', `The Product & Product participantRole classCode attribute classCode does not match!`);
        });

          // classCode
          it('should have the correct code attribute for the product & product detail playingEntity classCode', function(){
            let classCode = allergySection.entry[0].act.entryRelationship.observation.participant.participantRole.playingEntity._attributes.classCode;
            expect(classCode).to.be.equal('MMAT', `The Product & Product code attribute playingEntity classCode does not match!`);
          });
        }); // end of product & Product Detail


        // Test Needed for Allergen Product 


    }); // end of Information Source for Allergy


    // Test Needed for Product Free-Text


    // Reaction Observation
    describe('Reaction Observation', function() {
      // inversionInd
      it('should have the correct code attribute for the reaction observation code attribute inversionInd', function(){
        let inversionInd = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0]._attributes.inversionInd;
        expect(inversionInd).to.be.equal('true', `The reaction observation code attribute inversionInd  does not match!`);
      });

      // typeCode
      it('should have the correct code attribute for the reaction observation code attribute typeCode', function(){
        let typeCode = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0]._attributes.typeCode;
        expect(typeCode).to.be.equal('MFST', `The reaction observation code attribute typeCode does not match!`);
      });

      // templatedID root
      it('should have the correct code attribute for the reaction observation code attribute root', function(){
        let root = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.templateId._attributes.root;
        expect(root).to.be.equal('2.16.840.1.113883.10.20.22.4.9', `The reaction observation code  template id attribute root does not match!`);
        });

      // Reaction Observation id
      describe('Reaction Observation id', function() {
        // id
        it('should have the correct code attribute for the reaction observation code id attribute nullFlavor', function(){
          let nullFlavor = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.id._attributes.nullFlavor;
          expect(nullFlavor).to.be.equal('UNK', `The reaction observation code id attribute nullFlavor does not match!`);
          });
      }); // end of id

      // Reaction Observation code
      describe('Reaction Observation code', function() {
        // code
        it('should have the correct code attribute for the reaction observation code attribute code', function(){
          let code = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.code._attributes.code;
          expect(code).to.be.equal('ASSERTION', `The reaction observation code attribute code does not match!`);
        });

        // codeSystem
        it('should have the correct code attribute for the reaction observation code attribute codeSystem', function(){
          let codeSystem = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.code._attributes.codeSystem;
          expect(codeSystem).to.be.equal('2.16.840.1.113883.5.4', `The reaction observation code attribute codeSystem does not match!`);
        });

        // codeSystemName
        it('should have the correct code attribute for the reaction observation code attribute codeSystemName', function(){
          let codeSystemName = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.code._attributes.codeSystemName;
          expect(codeSystemName).to.be.equal('HL7ActCode', `The reaction observation code attribute codeSystemName does not match!`);
        });
      });// end of code

    }); // end of Reaction Observation

    describe('severtiy Free-text', function(){

      // Needs test SDA Mappings

      it('Should have the code attribute for the severity Free-test allergy statusCode', function(){
        let statusCode = allergySection.entry[0].act.entryRelationship.observation.entryRelationship[0].observation.statusCode._attributes.code;
          expect(statusCode).to.be.equal('completed', `The severity Free-test allergy statusCode attribute code does not match!`);
      });

      // Needs test Severity Coded

      // Needs test No Known Allergy Entry

      // allergy template id
      describe('allergy template id', function(){
        it('Should have the code attribute for the allergy template id', function(){
          let root = allergySection.entry[1].act.templateId._attributes.root;
            expect(root).to.be.equal('2.16.840.1.113883.10.20.22.4.30', `The allergy template id attribute code does not match!`);
        });
      });  
      // allergy concern act id
      describe('allergy concern act id', function(){
        it('Should have the code attribute for the allergy concern act id', function(){
          let id = allergySection.entry[1].act.id._attributes.nullFlavor;
            expect(id).to.be.equal('NA', `The allergy concern act id attribute code does not match!`);
        });
      });  

      // allergy concern act code
      describe('allergy concern act code', function(){
        // code
        it('Should have the code attribute for the allergy concern act code', function(){
          let code = allergySection.entry[1].act.code._attributes.code;
            expect(code).to.be.equal('CONC', `The allergy concern act code attribute code does not match!`);
        });
        // codeSystem
        it('Should have the code attribute for the allergy concern act codeSystem', function(){
          let codeSystem = allergySection.entry[1].act.code._attributes.codeSystem;
            expect(codeSystem).to.be.equal('2.16.840.1.113883.5.6', `The allergy concern act code attribute codeSystem does not match!`);
        });
        // codeSystemName
        it('Should have the code attribute for the allergy concern act displayName', function(){
          let displayName = allergySection.entry[1].act.code._attributes.displayName;
            expect(displayName).to.be.equal('Concern', `The allergy concern act code attribute displayName does not match!`);
        });
      }); // end of allergy concern act code  

      // // allergy concern act status code 
      // describe('allergy concern act code', function(){
      //   // code
      //   it('Should have the code attribute for the allergy concern act status code ', function(){
      //     let code = allergySection.entry[1].act.code._attributes.code;
      //       expect(code).to.be.equal('CONC', `The allergy concern act status code attribute code does not match!`);
      //   });
      //   // codeSystem
      //   it('Should have the code attribute for the allergy concern act status code System', function(){
      //     let codeSystem = allergySection.entry[1].act.code._attributes.codeSystem;
      //       expect(codeSystem).to.be.equal('2.16.840.1.113883.5.6', `The allergy concern act status code attribute codeSystem does not match!`);
      //   });
      //   // codeSystemName
      //   it('Should have the code attribute for the allergy concern act displayName', function(){
      //     let displayName = allergySection.entry[1].act.code._attributes.displayName;
      //       expect(displayName).to.be.equal('Concern', `The allergy concern act status code attribute displayName does not match!`);
      //   });
      // }); // end of allergy concern act status code 

    }); // end of severity Free-text


  }); // end of allergySection
}); // end of CCD1.1



