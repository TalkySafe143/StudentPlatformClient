describe('PublicarMaterial Form', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.request({
            method: 'POST',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
            headers: {
                "Authorization" : `Basic ${btoa("123:root")}`
            },
            failOnStatusCode: false
        })
            .then(json => {
                localStorage.setItem("test", "Y");
                localStorage.setItem("jwt", json.body.token);
                localStorage.setItem("user", "123");
                cy.visit("http://localhost:5173/materiales")
            })
    });

    after(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("test");
    })

    it('displays an alert for empty name field', () => {
        cy.visit('http://localhost:5173/materiales');

        //interactuar
        cy.get('h1').should('contain', 'Materiales');
        cy.get('button').contains('Publicar material').click();

        cy.get('input#idTitulo').clear(); //limpia el titulo
        cy.get('textarea#idDescripcion').type('Descripción'); //llena la descripción
        cy.get('#publicarMaterial').contains('Publicar').click(); // Click al Publicar

        //mira si saca una alerta
        cy.get('#relleneMaterial').should('be.visible');
    });
});
