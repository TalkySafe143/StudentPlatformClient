describe('template spec', () => {
  it('Obtiene los materiales existentes', () => {
    cy.visit('http://localhost:5174')

    cy.request('${import.meta.env.VITE_API_URL}/api/material')
        .should((response) => {
            expect(response.status).to.eq(200)
        })

  })
})