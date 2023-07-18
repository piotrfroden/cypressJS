// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import searchPage, { chooseCity, chooseCountry, chooseDropOffDate, chooseModel, choosePickUpDate, clickOnSearch } from "../pages/searchPage"
import rentPage, { setLastname } from "../pages/rentPage"

Cypress.Commands.add('addDays', (date, days) => {
    date.setDate(date.getDate() + days)
    console.log('data za 5 dni ' + date.toJSON().slice(0, 10))
    return date.toJSON().slice(0, 10)
}),

Cypress.Commands.add('searchVehicles', (country, city, model, datePickUp, dateDropOff) => {
    searchPage.chooseCountry(country)
    searchPage.chooseCity(city)
    searchPage.chooseModel(model)
    searchPage.choosePickUpDate(datePickUp)
    searchPage.chooseDropOffDate(dateDropOff)
    searchPage.clickOnSearch()
})

Cypress.Commands.add('rentCar', (company, model, licensePlate, price, pricePerDay) => {
    searchPage.checkVisibilityResultsTable();
    let numRows = searchPage.getTableResults().get('tbody > tr');
    let numColumns = searchPage.getTableResults().get('tbody > tr:nth-child(1) > td');
    console.log('table have rows: ' + numRows + ' and columns: ' + numColumns)
    
    searchPage.getTableResults().get('tbody > tr > td:nth-child(2)').each(($elem, index, $list)=> {
        const txtCompany = $elem.text();

        if(txtCompany.includes(company)){ 
            cy.get('tr td:nth-child(3)').eq(index).then(function (modelColumn) {
                expect(modelColumn.text()).to.contains(model);
            })
            cy.get('tr td:nth-child(4)').eq(index).then(function (licensePlateColumn) {
                expect(licensePlateColumn.text()).to.contains(licensePlate);
            })
            cy.get('tr td:nth-child(5)').eq(index).then(function (priceColumn) {
                expect(priceColumn.text()).to.contains(price);
            })
            cy.get('tr td:nth-child(6)').eq(index).then(function (pricePerDayColumn) {
                expect(pricePerDayColumn.text()).to.contains(pricePerDay);
            })
            cy.get('tr td:nth-child(7)').eq(index).then(function (rentButton) {
                expect(rentButton.text()).to.contains('Rent');
            })
            cy.get('tr td:nth-child(7) a').eq(index).click()
        }
     })
})

Cypress.Commands.add('verifySelectedCar', (strCarModel, strCompany, strPricePerDay, strCountry, strCity, strLicensePlate, datePickUp, targetDate) => {
    cy.wait(3)
    rentPage.getTextCarName().should('contains', strCarModel)
    rentPage.getTextCompany().should('contains', strCompany)
    rentPage.getTextPricePerDay().should('contains', strPricePerDay)
    rentPage.getTextLocation().should('contains', strCountry + ', ' + strCity)
    rentPage.getTextLicensePlate().should('contains', strLicensePlate)
    rentPage.getTextPickUpDate().should('contains', datePickUp)
    rentPage.getTextDropOffDate().should('contains', targetDate)
})

Cypress.Commands.add('summaryRentCar', (firstName, lastName, cardNumber, email) => {
    cy.wait(2)
    rentPage.setFirstname(firstName)
    rentPage.setLastname(lastName)
    rentPage.setCardNumber(cardNumber)
    rentPage.setEmail(email)
})