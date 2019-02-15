describe('Los estudiantes login', function() {
    it('Visits los estudiantes and fails at login', function() {
        cy.visit('https://losestudiantes.co')
		cy.contains('Cerrar').click()
    	cy.contains('Ingresar').click()
    	cy.get('.cajaLogIn').find('input[name="correo"]').click().type("jl.pulgarin@uniandes.edu.co")
    	cy.get('.cajaLogIn').find('input[name="password"]').click().type("testing123")
    	cy.get('.cajaLogIn').contains('Ingresar').click()
		cy.get('#__next').find('div').find('nav').find('div').find('div').find('form').find('input').type("Kelly Garcés{Enter}",{force: true})
		cy.get('#react-select-required_error_checksum--option-0').click()
		cy.get(':nth-child(5) > .labelHover > input.jsx-3367902293').click()
    })
})