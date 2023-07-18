class searchPage{

    constructor() {
       this.url = "http://qalab.pl.tivixlabs.com/"
       this.title = "qalab.pl.tivixlabs"
       this.msgAlert = 'Please fill pickup and drop off dates'
       this.msgAlertEmptyCarsList = "Empty cars list"
       this.msgAlertCountryNotMatchCity = "Country doesn't match city"
    }
     
    visit() {
       cy.visit(this.url)
    }

    elements ={
        alertMessage : () => cy.get('h3[class="alert alert-danger"]'),
        selectCountry : () => cy.get('select#country'),
        selectCity : () => cy.get('select#city'),
        inputModel : () => cy.get('input#model'),
        inputPickUpDate : () => cy.get('input#pickup'),
        inputDropOffDate : () => cy.get('input#dropoff'),
        btnSubmit : () => cy.get('button[type="submit"]'),
        tableResults : () => cy.get('table#search-results')
    }

    checkAlertMessage()
    {
        this.elements.alertMessage().should('be.visible').should('have.text', this.msgAlert);
    }

    checkMessageEmptyCarsList(){
        cy.contains(this.msgAlertEmptyCarsList).should('be.visible')
    }
    
    checkMessageCountryDoesntMatchCity(){
        cy.contains(this.msgAlertCountryNotMatchCity).should('be.visible')
    }

    chooseCountry(country)
    {
        this.elements.selectCountry().should('be.visible').select(country)
    }

    chooseCity(city) 
    {
        this.elements.selectCity().should('be.visible').select(city)
    }

    chooseModel(model)
    {
        this.elements.inputModel().should('be.visible').type(model)
    }

    choosePickUpDate(datePickUp)
    {
        this.elements.inputPickUpDate().should('be.visible').type(datePickUp)
    }

    chooseDropOffDate(dateDropOff)
    {
        this.elements.inputDropOffDate().should('be.visible').type(dateDropOff)
    }

    clickOnSearch()
    {
        this.elements.btnSubmit().should('be.visible').click()
    }

    checkVisibilityResultsTable()
    {
        this.elements.tableResults().should('be.visible')
    }

    getTableResults()
    {
        return this.elements.tableResults()
    }
}


module.exports = new searchPage();