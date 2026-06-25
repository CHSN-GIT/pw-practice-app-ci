import {test, expect } from "@playwright/test";


test.describe('Form Layouts page', () => {

    // Redefinición de los reintentos en caso de error
    test.describe.configure({retries: 0})
    // test.describe.configure({mode: 'parallel'})
    test.describe.configure({mode: 'serial'})

    test.beforeEach(async({page}) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })


    test.only('Visual Test Radio Buttons', async({page}) => {

        // Identificamos la zona general donde está incluído el radio button que queremos tratar
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        // Vamos directamente a la "opción 1" y la elegimos mediante la función check()
        await usingTheGridForm.getByLabel('Option 2').check({force: true})

        // con esta orden podremos luego confirmar si el check está o no activo asignando el resultado booleano a radioStatus
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()


        // *** Reemplazaremos esta comprobación por una visual *** //

                    // // para comprobarlo utilizaremos la aserción expect() junto a la función toBeTruthy()
                    // expect(radioStatus).toBeTruthy()
                    // // Otra manera de realizar esta prueba utilizando la función toBeChecked() es la sgte:
                    // await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // Con esta orden y antes de continuar, lanzaremos el test para que playwright almacene la imagen a comparar (Baseline)
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})
        

    })

})


