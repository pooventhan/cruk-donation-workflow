import { DonationPage } from "../pages/DonationPage";

describe('Card Donation Workflow', () => {
  const donation = new DonationPage();
  let donor;

  before(() => {
    cy.fixture('donor.json').then((donorContent) => {
      donor = donorContent;
    });
  });

  beforeEach(() => {
    cy.visit('https://app.pws.int.cruk.org/support-us/your-donation');
    cy.title().should('eq', 'Single Donation | Cancer Research UK');

    donation.closeCookieBanner();
  });

  it('Should be able to donate with card', () => {
    donation
      .chooseDonationAmount(donor.amount)
      .selectDonationType(donor.donationType)
      .selectMotivation(donor.motivation)
      .selectCancerType(donor.cancerType)
      .clickContinue()
      .enterYourDetails(donor.firstname, donor.lastname, donor.email, donor.phone)
      .enterYourAddressManually(donor.homeAddress)
      .selectEmailOptIn(donor.emailOptIn === "yes" ? true : false)
      .clickContinue()
      .chooseToDonateByCard()
      .enterCardDetails(`${donor.firstname} ${donor.lastname}`, donor.cardNumber, donor.cardExpiry, donor.cvv)
      .clickOptForGiftAid(donor.giftaid === "yes" ? true : false)
      .clickCompleteMyDonation()
      .verifyReferenceNumber();
  });
    
})