
describe("Prueba de creación de usuario", () => {                 //agrupa las pruebas
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
            })
    });


    it("Crea un usuario y confirma su creación", () => {       //dentro del describe van una serie de pruebas it
        cy.request({
            url:'https://javeplatformapi.2.us-1.fl0.io/api/users/123456789',
            method : 'DELETE',
            headers : {'Authorization' : `Bearer ${localStorage.getItem('jwt')}`}
        });



        // Abre la página de registro o inicio de sesión
        cy.visit('http://localhost:5173/register');                         //para navegar una URL de la pag web

        // Completa el formulario de registro con información válida
        //#selectoresparaobtenerdeldom
        cy.get("#CC").type("123456789"); // Reemplaza con un número de cédula válido
        cy.get("#Nombre").type("NombreUsuario"); // Reemplaza con un nombre válido
        cy.get("#Semestre").type("3"); // Reemplaza con un número de semestre válido
        cy.get("#Carrera").type("CarreraEjemplo"); // Reemplaza con una carrera válida
        cy.get("#C").type("ContraseñaSegura"); // Reemplaza con una contraseña válida


        // Envía el formulario
        cy.get("button").contains("Crear").click(); // Ajusta el selector al botón de registro

        // Confirma que el usuario se ha creado exitosamente
        //aquí debería llamar la API
        cy.get('#__react-alert__').should((s)=> {
            expect(s[0].childNodes.length).to.eq(1, "se está desplegando la alarma")
        })
    });
});
