describe('No existen materias vinculadas', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.request({
            method: 'POST',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
            headers: {
                "Authorization": `Basic ${btoa("123:root")}`
            },
            failOnStatusCode: false
        }).then(json => {
                localStorage.setItem("test", "Y");
                localStorage.setItem("jwt", json.body.token);
                localStorage.setItem("user", "123");
                cy.visit("http://localhost:5173/materias")
            });
    });

    after(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("test");
    })

    it('No tiene materias vinculadas a su usuario ', () => {
        let response;
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/materiaxestudiante',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            failOnStatusCode: false
        }).then(res => {
            // Eliminar materias asociadas
            response = res.body.data;
            console.log(response)
            response.forEach(materia => {
                cy.request({
                    method: 'GET',
                    url: 'https://javeplatformapi.2.us-1.fl0.io/api/materiaxestudiante/'+materia.materia_id,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    failOnStatusCode: false
                })
            })
            // Validar que no existan materias asociadas al estudiante
            
            cy.get("#noMateriasVinculadas").should('exist');

            response.forEach(materia => {
                cy.request({
                    method: 'POST',
                    url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias/',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify(materia),
                    failOnStatusCode: false
                })
            })

        })


    });









})