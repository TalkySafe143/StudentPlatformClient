describe('template spec', () => {
  it('Obtiene los materiales existentes', () => {
    cy.visit('http://localhost:5174')

    cy.request('http://localhost:3000/api/material')
        .should((response) => {
            expect(response.status).to.eq(200)
        })

  })
})