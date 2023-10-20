describe('Renderizar el material', () => {
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
            headers: {
                "Authorization" : `Basic ${btoa("123:root")}`
            },
            failOnStatusCode: false
        })
            .then(json => {
                cy.viewport(1920, 1080)
                localStorage.setItem("jwt", json.body.token);
                localStorage.setItem("user", "123");
                cy.visit("http://localhost:5173/materiales")
            })
    });

    after(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
    })

    it('Si no tiene materiales, mostrar un mensaje', () => {
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            if (res.body.data.length === 0) {
                cy.get("#publicaAlgo").should('exist');
            } else {
                res.body.data.forEach(material => {
                    cy.request({
                        method: 'DELETE',
                        url: 'https://javeplatformapi.2.us-1.fl0.io/api/material/' + material.material_id,
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                        }
                    })
                })
                cy.reload();
                cy.get("#publicaAlgo").should('exist');
            }
        })
    });

    it('Los materiales deben contener un boton de preview', () => {
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            if (res.body.data.length > 0) {
                cy.get("#previewMaterial").should('exist');
            }
        })
    })
});