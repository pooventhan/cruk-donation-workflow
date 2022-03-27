import { DetailsPage } from "./DetailsPage";

class DonationPage {
    
    closeCookieBanner(): void{
        const bannerWaitTime = 5000;
        const animationWaitTime = 2000;

        cy.get('#onetrust-banner-sdk', {timeout: bannerWaitTime}).should('be.visible');
        cy.wait(animationWaitTime);
        cy.get('#onetrust-accept-btn-handler').click();
    }

    chooseDonationAmount(amount: string): DonationPage {
        if(amount === '10.00') {
            cy.get('[data-cy=amount-sel-10]').click();
        }
        else if(amount === '20.00') {
            cy.get('[data-cy=amount-sel-20]').click();
        }
        else if(amount === '30.00') {
            cy.get('[data-cy=amount-sel-30]').click();
        }
        else{
            // If other than predefined amount, enter amount in text box.
            cy.get('#otherAmount').type(amount);
        }
        
        return this;
    }

    selectDonationType(type: string): DonationPage {
        cy.contains(type).click();
        return this;
    }

    selectMotivation(motivation: string): DonationPage {
        cy.get('[name=motivation]').select(motivation);
        return this;
    }

    selectCancerType(type: string): DonationPage {
        // Note: The div element is placed after input and that causes (element blocking) error in Cypress.
        cy.get('input[aria-label="Choose a cancer type or an area of research"]').check('choose', {force: true});
        cy.get('select[aria-label="Select a cancer type or research area"]').select(type);
        return this;
    }

    clickContinue(): DetailsPage {
        cy.get('button[type="submit"]').click();
        cy.url().should('contain', '/support-us/details');
        return new DetailsPage();
    }
}

export { DonationPage };