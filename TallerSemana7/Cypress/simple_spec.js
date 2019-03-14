describe('Los estudiantes login failed', function() {
    it('Visits los estudiantes and fails at login', function() {
        cy.visit('https://losestudiantes.co')
		cy.screenshot();
		cy.contains('Cerrar').click()
    	cy.contains('Ingresar').click()
		cy.screenshot();
    	cy.get('.cajaLogIn').find('input[name="correo"]').click().type("usuarioTest@test.edu.co")
    	cy.get('.cajaLogIn').find('input[name="password"]').click().type("testing123")
    	cy.get('.cajaLogIn').contains('Ingresar').click()
		cy.screenshot();

    })
})


describe('Los estudiantes login', function() {
    it('Visits los estudiantes and login', function() {
        cy.visit('https://losestudiantes.co')
		cy.screenshot();
		cy.contains('Cerrar').click()
    	cy.contains('Ingresar').click()
		cy.screenshot();
    	cy.get('.cajaLogIn').find('input[name="correo"]').click().type("jl.pulgarin@uniandes.edu.co")
    	cy.get('.cajaLogIn').find('input[name="password"]').click().type("testing123")
    	cy.get('.cajaLogIn').contains('Ingresar').click()
		cy.screenshot();

    })
})

describe('Buscar Profesor', function() {
    it('Visits los estudiantes and fails at login', function() {
		cy.screenshot();
		cy.get('#__next').find('div').find('nav').find('div').find('div').find('form').find('input').type("Kelly Garcés{Enter}",{force: true})
		cy.get('#react-select-required_error_checksum--option-0').click()
		cy.get(':nth-child(5) > .labelHover > input.jsx-3367902293').click()
		cy.screenshot();
    })
})