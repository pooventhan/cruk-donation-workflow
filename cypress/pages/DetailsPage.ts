import { PaymentPage } from "./PaymentPage";

class DetailsPage {

    enterYourDetails(firstName: string, lastName: string, email: string, phoneNumber: string): DetailsPage {
        cy.get('#forename').type(firstName);
        cy.get('#surname').type(lastName);
        cy.get('#emailAddress').type(email);
        cy.get('#phoneNumber').type(phoneNumber);
        return this;
    }

    enterYourAddressManually(homeAddress: any): DetailsPage {
        cy.get('button[class^="AddressLookup__ManualEntryButton"]').click();

        cy.get('input[name="addressLine1"]').type(homeAddress.address1);

        if(homeAddress.address2 !== ''){
            cy.get('input[name="addressLine2"]').type(homeAddress.address2);
        }

        if(homeAddress.address3 !== ''){
            cy.get('input[name="addressLine3"]').type(homeAddress.address3);
        }
        
        cy.get('input[name="city"]').type(homeAddress.town);
        cy.get('input[name="postalCode"]').type(homeAddress.postcode);
        cy.get('#country').select(homeAddress.country);

        return this;
    }

    selectEmailOptIn(optIn: boolean): DetailsPage {
        const emailOptInSelector = 'input[name="emailOptIn"]';
        const selector = optIn ? `${emailOptInSelector}[value="yes"]` : `${emailOptInSelector}[value="no"]`;

        // Note: The div element is placed after input and that causes (element blocking) error in Cypress.
        cy.get(selector).click({force: true});
        return this;
    }

    clickContinue(): PaymentPage {
        cy.get('button[type="submit"]').click();
        cy.url().should('contain', '/support-us/payment');
        return new PaymentPage();
    }
}

export { DetailsPage };