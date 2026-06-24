// Primero que nada debemos importar el metodo test desde PlayWright y luego definir los tests

import test from "@playwright/test"


test('primer test', async ({page}) => {
    await page.goto('http://localhost:4200/')

    // ahora realizaremos un par de clicks en la página
    // primero en la opción Form y luego dentro de ella en Form Layouts

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('Navegar a datepicker page', async ({page}) => {
    await page.goto('http://localhost:4200/')

    // ahora realizaremos un par de clicks en la página
    // primero en la opción Form y luego dentro de ella en Form Layouts

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})






// test.describe('Suite Nro1', () => {

//    test('primer test de la suite', () => {

//     })

// })