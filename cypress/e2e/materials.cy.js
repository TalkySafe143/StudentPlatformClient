describe('template spec', () => {
  it('Obtiene los materiales existentes', () => {
    cy.visit('http://localhost:5174')

    cy.request('https://javeplatformapi.2.us-1.fl0.io/api/material')
        .should((response) => {
            expect(response.status).to.eq(200)
        })

  })
})