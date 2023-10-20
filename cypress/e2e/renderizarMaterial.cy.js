describe('Renderizar el material', () => {
    beforeEach(() => {
        fetch({
            method: 'POST',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/auth/login',
            headers: new Headers({
                "Authorization" : `Basic ${btoa("123:root")}`
            })
        })
            .then(res => res.json())
            .then(json => {
                cy.visit('http://localhost:5173/materiales')
                localStorage.setItem("jwt", json.token);
            })
    })
    it('Si no tiene materiales, mostrar un mensaje', () => {



        cy.request({
            method: 'GET',
            url: 'https://javeplatformapi.2.us-1.fl0.io/api/material?student=123'
        })
    });
});