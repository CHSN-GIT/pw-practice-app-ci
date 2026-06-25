import test, { expect } from "@playwright/test"


test('Input Fields', async({page}, testInfo) => {

    await page.goto('/')


    // Para REUTILIZAR los test y no crear uno específico para el móvil si los cambios son menores
    // podemos utilizar los valores de testInfo para que, SOLO EN CASO de que se esté ejecutando la prueba 
    // definida para los móviles se ejecute una tarea definida específicamente para ellos,
    // como el ejemplo a continuación:
    if (testInfo.project.name == 'mobile'){

        await page.locator('.sidebar-toggle').click()   // Sumamos esta línea para la prueba en el móvil 
                                                        // al no estar disponible el menú por defecto

    }

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    if (testInfo.project.name == 'mobile'){

        await page.locator('.sidebar-toggle').click()   // Una vez posicionados en la opción de acceso
                                                        // debemos volver a clicar en el menú para hacerlo
                                                        // desaparecer y mostrar el acceso completamente

    }


    // Identificamos el input que queremos y lo asignamos a la constante
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    // Con la función fill() llenamos el campo de input con el valor deseado
    await usingTheGridEmailInput.fill('test@test.com')

    // para limpiar el campo de input usamos la función clear()
    await usingTheGridEmailInput.clear()

    // 
    await usingTheGridEmailInput.type('test@test.com')   // obtenemos el valor del campo input
                                                        // * "type" figura como una función deprecada pero aún se ejecuta

})



