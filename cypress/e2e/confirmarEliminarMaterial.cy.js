describe('Confirmar la eliminacion del material', () => {
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

    it ('Se debe mostrar un modal con un boton para eliminar el material', () => {
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?estudiante_cc=123',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            if (res.body.data.length > 0) {
                cy.get("#selectEliminar").click();
                cy.get("#eliminarMaterial").should('exist');
            } else {
                const form = new FormData();
                form.append('uploadedFiles', undefined);
                form.append('title', 'test title');
                form.append('desc', 'description test');
                form.append('materia_materia_id', '2');
                form.append('estudiante_cc', '123');
                cy.request({
                    url: 'https://javeplatformapi.2.us-1.fl0.io/api/material',
                    method: 'POST',
                    body: form,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                });
                cy.reload();
                cy.get("#selectEliminar").click();
                cy.get("#eliminarMaterial").should('exist');
            }
        })
    })

    it('Si se oprime el boton, se debe eliminar el material de la base de datos y no debe aparecer en la interfaz', () => {
        cy.get("#selectEliminar").click();
        cy.get("#eliminarMaterial").click();
        cy.wait(1000);
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?estudiante_cc=123',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            expect(res.body.data.length).to.eq(0);

            cy.reload();

            cy.get("#publicaAlgo").should('exist');
        })
    })
})