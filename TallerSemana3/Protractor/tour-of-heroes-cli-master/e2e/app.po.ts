import {browser, by, element, ElementFinder} from 'protractor';

export class TourOfHeroesPage {
  navigateTo() {
    return browser.get('/');
  }

  getTop4Heroes() {
    return element.all(by.css('.module.hero')).all(by.tagName('h4')).getText();
  }

  navigateToHeroes() {
    element(by.linkText('Heroes')).click();
  }

  getAllHeroes() {
    return element(by.tagName('my-heroes')).all(by.tagName('li'));
  }

  enterNewHeroInInput(newHero: string) {
    element(by.tagName('input')).sendKeys(newHero);
    element(by.buttonText('Add')).click();
  }

  /*Navegar al dashboard*/
  navigateToDashboard() {
    element(by.linkText('Dashboard')).click();
  }

  /*Escribe el nombre de heroe en elcampo de busqueda.*/
  enterSearchHeroInInput(srchHero: string) {
	element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.id('search-box')).first().sendKeys(srchHero);
  }

  /*Elimina Heroe*/
  deleteHero() {
    return element(by.tagName('my-heroes')).all(by.tagName('li')).first().all(by.tagName('button')).first().click();
  }

  /*Edita Heroe*/
  editHero(srchHero: string, srchHero2: string) {
	element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.id('search-box')).first().sendKeys(srchHero);
    element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.css('div.search-result')).first().click();
	var inputEdit = element.all(by.tagName('hero-detail')).all(by.tagName('input')).first();
	inputEdit.clear();
    inputEdit.sendKeys(srchHero2);
	element.all(by.tagName('hero-detail')).all(by.buttonText('Save')).first().click();
	element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.id('search-box')).first().sendKeys(srchHero);
    element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.css('div.search-result')).first().click();
  }

  /*Navegar a heroe desde dashboard*/
  navigateToHero(srchHero: string) {
	element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.id('search-box')).first().sendKeys(srchHero);
    element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.css('div.search-result')).first().click();
  }

  /*Navegar a heroe desde lista*/
  navigateToHeroList() {
    element(by.tagName('my-heroes')).all(by.tagName('li')).first().click();
    element(by.tagName('my-heroes')).all(by.buttonText('View Details')).first().click();
  }

  navigateSearchHero(srchHero: string) {
	element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.id('search-box')).first().sendKeys(srchHero);
    element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.css('div.search-result')).first().click();
  }
  
  getNameCust() {
    return element.all(by.tagName('hero-detail')).all(by.css('h2')).first().getText();
  }

  countResults() {
    return element.all(by.tagName('hero-search')).all(by.id('search-component')).all(by.css('div.search-result')).count();
  }
  
}
