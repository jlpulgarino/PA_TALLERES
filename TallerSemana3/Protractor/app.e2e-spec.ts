import { TourOfHeroesPage } from './app.po';

describe('Tour of heroes Dashboard', () => {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage();
  });

  it('should display top 4 heroes', () => {
    page.navigateTo();
    expect(page.getTop4Heroes()).toEqual(['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas']);
  });

  it('should navigate to heroes', () => {
    page.navigateToHeroes();
    expect(page.getAllHeroes().count()).toBe(11);
  });

  /*Test Busqueda heroe*/
  it('should search heroe', () => {
	page.navigateTo();
    page.enterSearchHeroInInput('Bombasto');
    expect(page.countResults()).toEqual(1);
  });

  /*Test navegar desde Busqueda heroe*/
  it('should navigate to hero from search', () => {
	page.navigateTo();
    page.navigateSearchHero('Bombasto');
    expect(page.getNameCust()).toEqual('Bombasto details!');
  });

  /*Test Borrar heroe*/
  it('should delete heroe', () => {
    page.navigateToHeroes();
	var numHeroes = page.getAllHeroes().count();
    page.deleteHero();
    expect(page.getAllHeroes().count()).not.toEqual(numHeroes);
  });
  
  /*Test Editar heroe*/
  it('should edit heroe', () => {
	page.navigateTo();
    page.editHero('Bombasto','Bombasto2');
    expect(page.getNameCust()).toEqual('Bombasto2 details!');
  });

  /*Test navegar a heroe*/
  it('should navigate to heroes from dashboard', () => {
	page.navigateTo();
    page.navigateToHero('Bombasto');
    expect(page.getNameCust()).toEqual('Bombasto details!');
  });

  /*Test navegar a heroe lista*/
  it('should navigate to heroes from list', () => {
	page.navigateToHeroes();
    page.navigateToHeroList();
    expect(page.getNameCust()).toEqual('Zero details!');
  });

  
});

describe('Tour of heroes, heroes page', () => {
  let page: TourOfHeroesPage;

  beforeEach(() => {
    page = new TourOfHeroesPage;
    page.navigateToHeroes();
  });

  it('should add a new hero', () => {
    const currentHeroes = page.getAllHeroes().count();
    page.enterNewHeroInInput('My new Hero');
    expect(page.getAllHeroes().count()).toBe(currentHeroes.then(n => n + 1));
  });

});
