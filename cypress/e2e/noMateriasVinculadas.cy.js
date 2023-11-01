describe('No existen materias vinculadas', () => {

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
            headers: {
                "Authorization": `Basic ${btoa("123:root")}`
            },
            failOnStatusCode: false
        })
            .then(json => {
                cy.viewport(1920, 1080)
                localStorage.setItem("test", "Y");
                localStorage.setItem("jwt", json.body.token);
                localStorage.setItem("user", "123");
                cy.visit("http://localhost:5173/materias")
            })
    });

    after(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("test");
    })

    it('No tiene materias vinculadas a su usuario ', () => {

        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            failOnStatusCode: false
        }).then(res => {
            // Eliminar materias asociadas
            // Validar que no existan materias asociadas al estudiante
 

        })

           // Retornar materias asociadas

    });









})