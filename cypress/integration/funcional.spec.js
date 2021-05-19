/// <reference types="cypress"/>

describe("Check podcastr funcionalities",() => {

    context("Desktop version", () => {
            before(() => {
            cy.visit('/')
            cy.viewport('macbook-15')
        })
        it('should present the two last episodes ', () => {
            cy.get('[data-test="lastEpisode"]').should('be.visible')
            cy.get('[data-test="lastEpisode"] >li').should('be.visible').and('have.length',2)
            cy.get('[data-test="lastEpisode"] >li').first().find('button').should('be.visible')
            
        });
        it('should present the all episodes section', () => {
            /* ==== Generated with Cypress Studio ==== */
            cy.get('tbody > :nth-child(1) > .home_mobile__1Q_Ar').should('be.visible')
            cy.get('tbody > :nth-child(1) > :nth-child(2) > a').should('be.visible');
            
            /* ==== End Cypress Studio ==== */
        });
        it('should present details of a episode', () => {
            
            
            cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click();
            cy.get('.episode_thumbnailContainer__g4oD1 > :nth-child(3) > img').click();
            cy.get('.styles_playButton__fmvI6').click();
            cy.get(':nth-child(4) > img').should('be.disabled');
           
        });
    })
    context.skip("Responsive version", () => {
        beforeEach(() =>{
            cy.visit('/')
            cy.viewport(360,640)
            cy.viewport('iphone-x')
        })

        it('should present the two last episodes ', () => {
            cy.get('[data-test="lastEpisode"]').should('be.visible')
        });
    })
    
})