describe('No existen materias en el sistema', () => {
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
                localStorage.setItem("jwt", json.body.token);
                localStorage.setItem("user", "123");
                localStorage.setItem("test", "Y");
                cy.visit("http://localhost:5173/materias")
            })
    });

    after(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("test");
    })

    it('Cuando se va a agregar alguna materia al estudiante, no hay materias', () => {

        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            failOnStatusCode: false
        }).then(res => {
            const response = res.body.data;
            response.forEach(materia => {
                cy.request({
                    method: 'DELETE',
                    url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias/'+materia.materia_id,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    failOnStatusCode: false
                })
            })

            cy.reload();

            cy.get("#chipMateria").should("exist");

            // Reponer las materias
            response.forEach(materia => {
                cy.request({
                    method: 'POST',
                    url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias/',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    failOnStatusCode: false,
                    body: materia
                })
            })

            cy.reload();
        })
       /*cy.get("#chipMateria").then(element => {
            let idMateria = element[0].children[0].innerHTML;
            cy.request({
                url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias/'+idMateria,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then(res => {
                expect(res.body.data.length).to.eq(0, "No existen materias")
            })
        })*/


    })




});