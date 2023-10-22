describe('template spec', () => {
        it('Registro correctamente', () => {
            cy.visit('http://localhost:5173/register');
            cy.get("#CC").type("123");
            cy.get("#Nombre").type("Santiago");
            cy.get("#Semestre").type("4");
            cy.get("#Carrera").type("Ingenieria de Sistemas");
            cy.get("#C").type("root");

            cy.request({
                method: 'POST',
                url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
                headers: {
                    "Authorization" : `Basic ${btoa("123:root")}`
                },
                failOnStatusCode: false
            })
                .then(response => {
                    localStorage.setItem("jwt", response.body.token);
                    localStorage.setItem("user", "123");
                })
        })

        it('Registro No válido', () => {
            cy.visit('http://localhost:5173/register');
            cy.get("#CC").type("987");
            cy.get("#Nombre").type("Hernando");
            cy.get("#Semestre").type("cuatro");
            cy.get("#Carrera").type("Derecho");
            cy.get("#C").type("password");
            cy.request({
                method: 'POST',
                url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
                headers: {
                    "Authorization" : `Basic ${btoa("987:password")}`
                },
                failOnStatusCode: false
            })
                .should(response => {
                    expect(response.status).to.eq(500)
                })
        })


});
