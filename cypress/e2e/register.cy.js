describe('template spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
    })


    it('Solicita cedula del estudiante', () => {
      cy.get('#CC').type('123456789{enter}');
      cy.get('.error-messages')
        .should('contain', 'Cedula no puede estar vacia')
    })

    // it('Solicita el nombre del estudiante', () => {
    //     cy.get('#name').type('Juan');
    // })

    // it('Solicita el semestre del estudiante', () => {
    //     cy.get('#semester').type('8');
    // })

    // it('Solicita la carrera del estudiante', () => {
    //     cy.get('#career').type('Ingenieria en Sistemas');
    // })


    // it('Si llena todos los campos, se registra correctamente', () => {
    //     cy.visit('http://localhost:5173/register');
    //     cy.get('name').type('Juan');
    //     cy.get('#semester').type('8');
    //     cy.get('#career').type('Ingenieria en Sistemas');
    //     cy.get('#password').type('123456');


    // })
})