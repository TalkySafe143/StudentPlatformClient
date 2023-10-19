describe('template spec', () => {
  it('Si el estudiante no esta autorizado, no puede acceder a los materiales', () => {
    cy.visit('http://localhost:5173/materias');

    cy.url().should(url => {
        expect(url).to.eq('http://localhost:5173/login');
    })

    cy.request({
        url: `https://javeplatformapi.2.us-1.fl0.io/api/material`,
        failOnStatusCode: false
    })
        .should((response) => {
            expect(response.status).to.eq(401)
        })

  })
})