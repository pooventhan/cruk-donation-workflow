import { ThankYouPage } from "./ThankYouPage";
import 'cypress-iframe';

class PaymentPage {
    cardNumberIframe: string = '#braintree-hosted-field-number';
    expiryDateIframe: string = '#braintree-hosted-field-expirationDate';
    cvvIframe: string = '#braintree-hosted-field-cvv';

    chooseToDonateByCard(): PaymentPage {
        // Note: The div element is placed after input and that causes (element blocking) error in Cypress.
        cy.get('input[value="bt"]').click({force: true});
        return this;
    }

    enterCardDetails(cardHolderName: string, cardNumber: string, expiryDate: string, securityCode: string): PaymentPage {
        cy.get('#cardholderName').type(cardHolderName);

        cy.frameLoaded(this.cardNumberIframe);
        cy.iframe(this.cardNumberIframe).find('#credit-card-number').type(cardNumber);

        cy.frameLoaded(this.expiryDateIframe);
        cy.iframe(this.expiryDateIframe).find('#expiration').type(expiryDate);

        cy.frameLoaded(this.cvvIframe);
        cy.iframe(this.cvvIframe).find('#cvv').type(securityCode);

        return this;
    }

    clickOptForGiftAid(opt: boolean): PaymentPage {
        if(opt){
            cy.get('input[name="giftAid"]').check('yes');
        }
        return this;
    }

    clickCompleteMyDonation(): ThankYouPage {
        // Listen to POST /transaction
        cy.intercept('POST', '**/transaction').as('postTransaction');

        cy.get('button[type="submit"]').click();
        cy.url({timeout: 20000}).should('contain', '/support-us/thanks');
        return new ThankYouPage();
    }
}

export { PaymentPage };