import SampleAppPage from "../pages/sample-app-page";
//todo: put visit in general steps
// put url path as a constant

import { GeneralSteps, generalSteps } from "./general-steps";
import AjaxDataPage from "../pages/ajax-data-page";

export class SampleAppSteps extends GeneralSteps
{
    //todo: should be moved out of the login func, because log out doesn't have it?
    //todo: make a mainURL config variable and pass it from the console
    //todo: should be pwd passed from the the Command Log? https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
    // challenge: I want to pass a couple of logins; store "" pwd in congig.js?

    visit(){
        cy.visit(this.baseUrl + SampleAppPage.path)
        // cy.url().should('include', SampleAppPage.path)
        this.isOnSampleAppPage();
    }

    isOnSampleAppPage(){
        this.urlPathIs(SampleAppPage.path)
        // cy.url().should('include', 'sampleapp')
        //todo: improve matcher to the full match
    }
    //
    // titleTextIs(text) {
    //     SampleAppPage.getPageTitle.should('have.text', text);
    //     // then($el => $el.text().trim()).should('eq', text);
    //
    // }

    fillInLoginForm(credentials) {
        if (credentials.userName) {
            SampleAppPage.getUserNameField
                .type(credentials.userName).should('have.value', credentials.userName);
        }
        if (credentials.password) {
            SampleAppPage.getPasswordField
                .type(credentials.password).should('have.value', credentials.password);
        }
    }

    verifyLoginFormIsClear(){
        SampleAppPage.getUserNameField.should('be.empty')
        SampleAppPage.getPasswordField.should('be.empty')
    }

    submitLoginForm() {
        SampleAppPage.getSubmitButton.click();
    }

    successfulLoginMessageIsDisplayed (userName) {
        SampleAppPage.getLoginStatusMessage
            .should('have.text', 'Welcome, ' + userName + '!')
    }

    successfulLogOutMessageIsDisplayed () {
        SampleAppPage.getLoginStatusMessage
            .should('have.text', 'User logged out.')
    }

    hasLogoutButton() {
        SampleAppPage.getLogoutButton
    }

    clickLogOutBtn(){
    SampleAppPage.clickLogoutButton
    }

}

export const sampleAppSteps = new SampleAppSteps();