/// <reference types="cypress"/>

describe("Check podcastr funcionalities",() => {

    context("Desktop version", () => {
            beforeEach(() => {
            cy.visit('/')
            cy.viewport('macbook-15')
        })
        it('should present the two last episodes ', () => {
            cy.get('ul > li').should('have.length',2).and('be.visible')
            
        });
    })
    context("Responsive version", () => {
        beforeEach(() =>{
            cy.visit('/')
            cy.viewport(360,640)
            cy.viewport('iphone-x')
        })

        it('should present the two last episodes ', () => {
            cy.get('ul > li').should('have.length',2).and('be.visible')
        });
    })
    
})