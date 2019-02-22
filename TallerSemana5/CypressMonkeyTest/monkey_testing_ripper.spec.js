describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
		//randomClick(10);
		randomEvent(10,0);
    })
})

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick(monkeysLeft) {


    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft_par, optn_par) {

	var optn = optn_par;
	var monkeysLeft = monkeysLeft_par;
	if(optn == 0){
		optn = getRandomInt(1, 4);
	}
	console.log(monkeysLeft +'-'+ optn);
	switch(optn){
		case 1://click on link
			if(monkeysLeft > 0) {
				cy.get('a').then($links => {
					var randomLink = $links.get(getRandomInt(0, $links.length));
					if(!Cypress.dom.isHidden(randomLink)) {
						cy.wrap(randomLink).click({force: true});
						monkeysLeft = monkeysLeft - 1;
					}
					setTimeout(randomEvent, 1000, monkeysLeft, optn);
				});
			}   
		break;
		case 2://type on input
			if(monkeysLeft > 0) {
				cy.get('input').then($inputs => {
					var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
					if(!Cypress.dom.isHidden(randomInput)) {
						cy.wrap(randomInput).type("Monkey type",{force: true});
						monkeysLeft = monkeysLeft - 1;
					}
					setTimeout(randomEvent, 1000, monkeysLeft, optn);
				});
			}   
		break;
		case 3://click on button
			if(monkeysLeft > 0) {
				cy.get('button').then($buttons => {
					var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
					if(!Cypress.dom.isHidden(randomButton)) {
						cy.wrap(randomButton).click({force: true});
						monkeysLeft = monkeysLeft - 1;
					}
					setTimeout(randomEvent, 1000, monkeysLeft, optn);
				});
			}   
		break;
		case 4:
			if(monkeysLeft > 0) {
				cy.get('select').then($selects => {
					var randomSelect = $selects.get(getRandomInt(0, $selects.length));
					if(!Cypress.dom.isHidden(randomSelect)) {
						cy.wrap(randomSelect).click({force: true});
						monkeysLeft = monkeysLeft - 1;
					}
					setTimeout(randomEvent, 1000, monkeysLeft, optn);
				});
			}   
		break;
	}
}