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

    it('Si no tiene materiales, mostrar un mensaje', () => {
        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?estudiante_cc=123',
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
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?estudiante_cc=123',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            if (res.body.data.length > 0) {
                cy.get("#previewMaterial").should('exist');
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
                cy.get("#previewMaterial").should('exist');
            }
        })
    })

    it('Se debe mostrar un modal que muestre el contenido del material', () => {
        cy.get("#previewMaterial").click();
        cy.get("#materialModal").should('exist');
    });

    it('La materia asociada al material debe existir', () => {

        cy.get("#previewMaterial").click();
        cy.get("#chipMateria").then(element => {
            let idMateria = element[0].children[0].innerHTML;
            cy.request({
                url: 'https://javeplatformapi.2.us-1.fl0.io/api/materias/'+idMateria,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then(res => {
                expect(res.body.data.length).to.eq(1, "Existe la materia renderizada")
            })
        })

    });

    it('Se debe mostrar el titulo y la descripcion renderizada', () => {
        cy.get("#previewMaterial").click();
        cy.get("#tituloPreview").should('exist');
        cy.get("#cuerpoModal").should('exist');
    });

    it('En caso de no existir algun archivo, se debe renderizar una imagen predeterminada', () => {
        cy.get("#previewMaterial").click();
        cy.get("#filePreview").then(element => {
            cy.get(".photo").then(img => {
                expect(img[0].currentSrc).to.eq('https://materiales-javeplatform.s3.amazonaws.com/noFile.png', 'La imagen predeterminada se renderiza')
            })
        })

        // Eliminar material para pruebas

        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?estudiante_cc=123',
            failOnStatusCode: false,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: 'https://javeplatformapi.2.us-1.fl0.io/api/material/'+res.body.data[0].material_id,
                failOnStatusCode: false,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            })
        })
    });
});