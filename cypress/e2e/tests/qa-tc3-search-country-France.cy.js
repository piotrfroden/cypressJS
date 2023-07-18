import searchPage, { checkAlertMessage } from "../../pages/searchPage"
import dayjs from 'dayjs'
import rentPage from "../../pages/rentPage"
const testUser = require("../../fixtures/testUser.json")
const jsonData = require("../../fixtures/qa-tc3-parameters.json")

describe('search vehicles in country France', () => {
  var date = new Date()
  let datePickUp = date.toJSON().slice(0, 10)
  const targetDate = dayjs().add(5, 'day').format('YYYY-MM-DD')

  beforeEach(() => {
    searchPage.visit()
  })

  it(jsonData.test1.testname, () => {
    searchPage.checkAlertMessage()
    //fill search form with input country, city, model, date pickup and date drop off
    cy.searchVehicles(jsonData.test1.country, jsonData.test1.city, jsonData.test1.model, datePickUp, targetDate)
    //search on results table one vehicle
    cy.rentCar(jsonData.test1.company, jsonData.test1.carModel, jsonData.test1.licensePlate, jsonData.test1.price, jsonData.test1.pricePerDay)
    //after click Rent button on results table selected row try to verify selected data on rent page
    cy.verifySelectedCar(jsonData.test1.carModel, jsonData.test1.company, jsonData.test1.pricePerDay, jsonData.test1.country, jsonData.test1.city, jsonData.test1.licensePlate, datePickUp, targetDate)
    //click rent button
    rentPage.getButtonRent().should('be.visible').click()
    //fill personal data
    cy.summaryRentCar(testUser.userdata.firstname, testUser.userdata.lastname, testUser.userdata.cardNumber, testUser.userdata.email)
    //click button rent
    rentPage.getButtonRent2().should('be.visible').click()
    //check if alert on end will appear
    rentPage.getAlertSuccess().should('have.text', 'Success')
  })

  it(jsonData.test2.testname, () => {
    searchPage.checkAlertMessage()
    cy.searchVehicles(jsonData.test2.country, jsonData.test2.city, jsonData.test2.model, datePickUp, targetDate)
    searchPage.checkMessageEmptyCarsList()
    searchPage.checkMessageCountryDoesntMatchCity()
  })

  it(jsonData.test3.testname, () => {
    searchPage.checkAlertMessage()
    cy.searchVehicles(jsonData.test3.country, jsonData.test3.city, jsonData.test3.model, datePickUp, targetDate)
    searchPage.checkMessageEmptyCarsList()
    searchPage.checkMessageCountryDoesntMatchCity()
  })

  it(jsonData.test4.testname, () => {
    searchPage.checkAlertMessage()
    cy.searchVehicles(jsonData.test4.country, jsonData.test4.city, jsonData.test4.model, datePickUp, targetDate)
    searchPage.checkMessageEmptyCarsList()
    searchPage.checkMessageCountryDoesntMatchCity()
  })

  it(jsonData.test5.testname, () => {
    searchPage.checkAlertMessage()
    cy.searchVehicles(jsonData.test5.country, jsonData.test5.city, jsonData.test5.model, datePickUp, targetDate)
    searchPage.checkMessageEmptyCarsList()
  })
})
