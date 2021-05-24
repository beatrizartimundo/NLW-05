/// <reference types="cypress"/>

describe("Check podcastr funcionalities",() => {

    context("Desktop version", () => {
            before(() => {
            cy.visit('/')
            
        })
        beforeEach(()=>cy.viewport('macbook-13'))
        it('should present the two last episodes ', () => {
            cy.get('section:nth-child(1) >h2').should('be.visible').and('contain','Últimos lançamentos')
            cy.get('[data-test="lastEpisode"]').should('be.visible')
            cy.get('[data-test="lastEpisode"] >li').should('be.visible').and('have.length',2)
            cy.get('[data-test="lastEpisode"] >li')
                .first()
                .find('button')
                .should('be.visible')
                .find('img')
                .should('be.visible')
            cy.get('[data-test="lastEpisode"] >li')
                .first()
                .should('contain','Faladev')
                .find('a')
                .should('be.visible')
                .and('have.attr','href')
                .and('contain','/episodes/')
            
        });
        it('should present the all episodes section', () => {
            cy.get('section:nth-child(2) > h2').should('be.visible').and('contain','Todos episódios')
            cy.get('section > table').should('be.visible')
            cy.get('thead > tr > th').should('be.visible').and('have.length',5)
            cy.get('[data-test="allEpisodes"]').should('be.visible').and('have.length.greaterThan',5)
            cy.get('[data-test="allEpisodes"]').first().find('a').should('be.visible')
                .and('have.attr','href')
                .and('contain','/episodes/')

        });
        it('should present the player', () => {
            cy.get('[data-test="player"]').should('be.visible')
            cy.get('[data-test="playerHead"]').should('be.visible').and('have.text','Tocando agora')
            cy.get('[data-test="playerFooter"]').should('be.visible')
            cy.get('[data-test="playerPlay"]').should('be.visible')
            cy.get('[data-test="playerPause"]').should('not.exist')
            
        });
        it('should play the episode', () => {
            cy.get('[data-test="allEpisodes"]').first().find('button').should('be.visible')
                .click()
            cy.get('[data-test="playerPlayBtn"]').should('be.visible')
            cy.wait(5000)
            cy.get('[data-test="playerPause"]').should('be.visible')
        });
        it('should go to next the episode', () => {
            cy.get('[data-test="sliderTimeEnd"]').invoke('text').then(initial=>{
                cy.get('[data-test="playerNextBtn"]').should('be.visible').click()
                cy.get('[data-test="sliderTimeEnd"]')
               .should('not.have.text',initial)
            })
        });
        it('should go to last the episode', () => {
            cy.get('[data-test="sliderTimeEnd"]').invoke('text').then(initial=>{
                cy.get('[data-test="playerPreviousBtn"]').should('be.visible').click()
                cy.get('[data-test="sliderTimeEnd"]')
               .should('not.have.text',initial)
            })
            
            
        });
        it('should hability the shuffle mode', () => {
            cy.get('[data-test="playerShuffleBtn"]').should('be.visible').and('not.have.class')
            cy.get('[data-test="playerShuffleBtn"]').click({force: true})
            cy.get('[data-test="playerShuffleBtn"]').should('be.visible').and('have.have.class','styles_isActive__PGy6l')
        });
        it('should hability the repeat mode', () => {
           cy.get('[data-test="playerRepeatBtn"]').should('be.visible').and('not.have.class')
           cy.get('[data-test="playerRepeatBtn"]').click({force: true}) 
           cy.get('[data-test="playerRepeatBtn"]').should('be.visible').and('have.class','styles_isActive__PGy6l')
        });

            context('details of a episode',()=> {
            it('should present details of a episode', () => {
            
                cy.visit('/')
                cy.get('[data-test="allEpisodes"]').first().find('a').should('be.visible').click();
                
                cy.get('.episode_episode__3xSMv > header').should('be.visible').and('not.be.empty')
                cy.get('.episode_description__3hw48 > p').should('be.visible').and('not.be.empty')
                
                
            
            });

            it('should play the episode', () => {
                cy.get('.episode_thumbnailContainer__g4oD1 [type="button"] :last()').should('be.visible').click();
                cy.get('[data-test="playerPlayBtn"]').should('be.visible')
                
                cy.get('[data-test="playerPause"]').should('be.visible')
            });
            
            it('should not go to last the episode', () => {
                cy.get('[data-test=playerPreviousBtn]').should('be.visible').and('be.disabled')
            });

            it('should change to dark mode', () => {
                cy.get('.light-mode').should('exist').and('be.visible')
                cy.get('.dark-mode').should('not.exist')
                cy.get('#dmcheck').should('be.visible').click()
                cy.get('.light-mode').should('not.exist')
                cy.get('.dark-mode').should('exist').and('be.visible')
            });
        })
        
        
    })
    context("Responsive version", () => {
        before(() =>{
            cy.visit('/')
            
        })
        beforeEach(()=> cy.viewport(360,640))

        it('should present the two last episodes ', () => {
            cy.get('section:nth-child(1) >h2').should('be.visible').and('contain','Últimos lançamentos')
            cy.get('[data-test="lastEpisode"]').should('be.visible')
            cy.get('[data-test="lastEpisode"] >li').should('be.visible').and('have.length',2)
            cy.get('[data-test="lastEpisode"] >li')
                .first()
                .find('button')
                .should('be.visible')
                .find('img')
                .should('be.visible')
            cy.get('[data-test="lastEpisode"] >li')
                .first()
                .should('contain','Faladev')
                .find('a')
                .should('be.visible')
                .and('have.attr','href')
                .and('contain','/episodes/')
        });

        it('should present the all episodes section', () => {
            cy.get('section:nth-child(2) > h2').should('be.visible').and('contain','Todos episódios')
            cy.get('section > table').should('be.visible')
            cy.get('thead > tr > th').should('be.visible').and('have.length',5)
            cy.get('thead > tr > th').eq(2).should('not.be.visible')
            cy.get('[data-test="allEpisodes"]').should('be.visible').and('have.length.greaterThan',5)
            cy.get('[data-test="allEpisodes"]').first().find('a').should('be.visible')
                .and('have.attr','href')
                .and('contain','/episodes/')

        });

        it('should present the player', () => {
            cy.get('[data-test="player"]').should('be.visible')
            cy.get('[data-test="playerHead"]').should('not.be.visible')
            cy.get('[data-test="playerFooter"]').should('be.visible')
            cy.get('[data-test="playerPlay"]').should('be.visible')
            cy.get('[data-test="playerPause"]').should('not.exist')
            
        });

        it('should play the episode', () => {
            cy.get('[data-test="allEpisodes"]').eq(1).find('button').scrollIntoView().should('be.visible')
                .click()
            cy.get('[data-test="playerPlayBtn"]').should('be.visible')
            cy.wait(5000)
            cy.get('[data-test="playerPause"]').should('be.visible')
        });

        it('should go to next the episode', () => {
            cy.get('[data-test="sliderTimeEnd"]').invoke('text').then(initial=>{
                cy.get('[data-test="playerNextBtn"]').should('be.visible').click()
                cy.get('[data-test="sliderTimeEnd"]')
               .should('not.have.text',initial)
            })
        });

        it('should go to last the episode', () => {
            cy.get('[data-test="sliderTimeEnd"]').invoke('text').then(initial=>{
                cy.get('[data-test="playerPreviousBtn"]').should('be.visible').click()
                cy.get('[data-test="sliderTimeEnd"]')
               .should('not.have.text',initial)
            })           
        });

        it('should change to dark mode', () => {
            cy.get('.light-mode').should('exist').and('be.visible')
            cy.get('.dark-mode').should('not.exist')
            cy.get('#dmcheck').should('be.visible').click()
            cy.get('.light-mode').should('not.exist')
            cy.get('.dark-mode').should('exist').and('be.visible')
        });
    })
    
})