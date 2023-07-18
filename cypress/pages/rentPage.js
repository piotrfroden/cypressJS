class rentPage{

    elements = {
        textCarName : () => cy.get('div[class="card-header"]'),
        textCompany : () => cy.get('.card-title'),
        textPricePerDay : () => cy.get('p.card-text:nth-child(2)'),
        textLocation : () => cy.get('p.card-text:nth-child(3)'),
        textLicensePlate : () => cy.get('p.card-text:nth-child(4)'),
        textPickUpDate : () => cy.get('.card-body > h6:nth-child(5)'),
        textDropOffDate : () => cy.get('.card-body > h6:nth-child(6)'),
        buttonRent : () => cy.get('a[class="btn btn-primary"]'),
        textName : () => cy.get('input#name'),
        textLastName : () => cy.get('input#last_name'),
        textCardNumber : () => cy.get('input#card_number'),
        textEmail : () => cy.get('input#email'),
        buttonRent2 : () => cy.get('button[class="btn btn-primary"]'),
        msgAlertSuccess : () => cy.get('h2[class="alert alert-success"]')
    }

    getTextCarName()
    {
        return this.elements.textCarName().invoke('text')
    }

    getTextCompany()
    {
        return this.elements.textCompany().invoke('text')
    }

    getTextPricePerDay()
    {
        return this.elements.textPricePerDay().invoke('text')
    }

    getTextLocation()
    {
        return this.elements.textLocation().invoke('text')
    }

    getTextLicensePlate()
    {
        return this.elements.textLicensePlate().invoke('text')
    }

    getTextPickUpDate()
    {
        return this.elements.textPickUpDate().invoke('text')
    }

    getTextDropOffDate()
    {
        return this.elements.textDropOffDate().invoke('text')
    }

    getButtonRent()
    {
        return this.elements.buttonRent()
    }

    getButtonRent2()
    {
        return this.elements.buttonRent2()
    }

    setFirstname(firstname)
    {
        this.elements.textName().type(firstname)
    }

    setLastname(lastname)
    {
        this.elements.textLastName().type(lastname)
    }

    setCardNumber(cardNumber)
    {
        this.elements.textCardNumber().type(cardNumber)
    }

    setEmail(email)
    {
        this.elements.textEmail().type(email)
    }

    getAlertSuccess(){
        return this.elements.msgAlertSuccess()
    }
}

module.exports = new rentPage();