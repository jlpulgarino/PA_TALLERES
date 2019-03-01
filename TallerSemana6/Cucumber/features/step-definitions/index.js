//Complete siguiendo las instrucciones del taller
var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if(browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  When('I fill a wrong email and password', () => {
    var cajaLogIn = browser.element('.cajaLogIn');

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys('wrongemail@example.com');

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys('123467891')
  });

  When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click()
  });

  Then('I expect to not be able to login', () => {
    browser.waitForVisible('.aviso.alert.alert-danger', 10000);
  });
//Metodos con tablas de datos
	When(/^I fill with (.*) and (.*)$/ , (email, password) => {
		 var cajaLogIn = browser.element('.cajaLogIn');

		var mailInput = cajaLogIn.element('input[name="correo"]');
		mailInput.click();
		mailInput.keys(email);

		var passwordInput = cajaLogIn.element('input[name="password"]');
		passwordInput.click();
		passwordInput.keys(password)
	});

	Then('I expect to see {string}', error => {
		browser.waitForVisible('.aviso.alert.alert-danger', 10000);
		var alertText = browser.element('.aviso.alert.alert-danger').getText();
		expect(alertText).to.include(error);
	});

// Login correcto
  When('I fill a correct email and password', () => {
    var cajaLogIn = browser.element('.cajaLogIn');

    var mailInput = cajaLogIn.element('input[name="correo"]');
    mailInput.click();
    mailInput.keys('jl.pulgarin@uniandes.edu.co');

    var passwordInput = cajaLogIn.element('input[name="password"]');
    passwordInput.click();
    passwordInput.keys('testing123')
  });

  Then('I expect to be able to login', () => {
    browser.waitForVisible('.dropDown.dropdown.btn-group', 10000);
  });
  
 // Steps register
   When('I try to register', () => {
    var cajaSignUp = browser.element('.cajaSignUp');
    cajaSignUp.element('button=Registrarse').click()
  });

	
	When(/^I fill register with (.*) and (.*) and (.*) and (.*) and (.*)$/ , (fname, sname, email, password, acepta) => {
		browser.waitForVisible('.cajaSignUp', 5000);
		var cajaSignUp = browser.element('.cajaSignUp');
		var nameInput = cajaSignUp.element('input[name="nombre"]');
		nameInput.click();
		nameInput.keys(fname);

		var snameInput = cajaSignUp.element('input[name="apellido"]');
		snameInput.click();
		snameInput.keys(sname);
		
		var mailInput = cajaSignUp.element('input[name="correo"]');
		mailInput.click();
		mailInput.keys(email);
		
		var passwordInput = cajaSignUp.element('input[name="password"]');
		passwordInput.click();
		passwordInput.keys(password)

		if(acepta == 'Y'){
			var passwordInput = cajaSignUp.element('input[name="acepta"]');
			passwordInput.click();
		}
		
	});

   Then('I expect to sees {string}', error => {
		browser.waitForVisible('.input-group.has-error.has-feedback', 10000);
		var alertText = "Error no identificado";
		if(browser.element('.aviso.alert.alert-danger') != null){
			alertText = "Campo obligatorio";
		}
		expect(alertText).to.include(error);
  });
	
});