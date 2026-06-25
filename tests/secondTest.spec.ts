// Primero que nada debemos importar el metodo test desde PlayWright y luego definir los tests

import test from "@playwright/test";

// test.beforeAll() test.afterAll() test.afterEach() No son muy utilizadas pero se puede utilizar para cosas muy genéricas
// Acumularemos entonces en esta función (beforeEach()) las líneas de código que se repitan

test.beforeEach(async({page}) => {
    await page.goto('/')

})

// crearemos los test dentro de una suite en este ejemplo
test.describe('Suite Nro1', () => {

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test('Navegar a Form Layouts', async ({page}) => {
        // solo dejaremos aquí la llamada que no se duplica

        await page.getByText('Form Layouts').click()
    })


    test('Navegar a datepicker page', async ({page}) => {

        await page.getByText('Datepicker').click()
    })


})



