class ThankYouPage {
    verifyReferenceNumber(): ThankYouPage {
        cy.wait('@postTransaction').then((interception) => {
            let referenceNumber = interception.response.body.id;

            cy.get('p').filter(':contains("Your reference number is")').should('contain', referenceNumber);
        });

        return this;
    }
}

export { ThankYouPage };