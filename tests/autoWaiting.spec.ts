// Generaremos un nuevo test para probar el funcinamiendo de los tiempos de espera (para obtener los datos desde una página web)

import { test, expect } from "@playwright/test";
import { timeout } from "rxjs-compat/operator/timeout";

// Acumularemos en la función (beforeEach()) las líneas de código que se repiten (como en los anteriores ejemplos)

test.beforeEach(async({page}) => {
    // await page.goto('http://uitestingplayground.com/ajax')  // página de testing  (botones con demora de 50seg etc)
                                                               // llamaremos a la web a través de Variables de entorno de .ENV
    await page.goto(process.env.URL_TIMEOUT!)    // sumamos el "!" para que Playwright no lo detecte como un fallo al no tener valor para él si
                                                 // no está en ejecución.
    await page.getByText('Button Triggering AJAX Request').click()
})



test('Auto waiting', async({page}) => {

    // Buscaremos primero que nada el texto con el que queremos interactuar (que aparece 30segs después de clickar en el botón)

    const successButton = page.locator('.bg-success')   // Todos estos valores los podemos encontrar inspeccionando la página a testear

    // await successButton.click() // En este ejemplo playWright esperará 30 segs para que el texto buscado aparezca (en modo automático)
                                // Luego cambiaremos el timeOut en el fichero de configuración playwright.config.ts, si el valor no está
                                // podemos introducir la nueva variable para indicar otra temporalidad (en milisegundos) timeout: 10000  (10 segs)

    // Al haber realizado este cambio obtendremos el sgte error:
            // Test timeout of 10000ms exceeded.
            //     @autoWaiting.spec.ts:20
            //     Error: locator.click: Test timeout of 10000ms exceeded.
            //     Call log:
            //     - waiting for locator('.bg-success')

    // tras dejar nuevamente el valor al por defecto de 30segs en el config realizaremos la sgte tarea en la prueba - dejando comentado el anterior .click()

    // const text = await successButton.textContent()
    // expect(text).toEqual("Data loaded with AJAX get request.") // Si intentáramos utilizar aquí la función allTextContent() no tiene implementada la espera y al no obtener valor
                                                                 // la sgte comparación nos daría un error por lo que debemos utilizar la función waitFor() de la sgte manera:
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()

    //cambiamos la función toEqual() por toContain() al usar allTextContents() y tener un array
    expect(text).toContain("Data loaded with AJAX get request.")


    // await expect(successButton).toHaveText("Data loaded with AJAX get request.")  // En esta línea de código obtendríamos un error al esperar la función toHaveText()
                                                                                     // solo 5 segs y no estar el texto disponible aún. Pero eto tiene solución,
                                                                                     // para ello utilizaremos un parámetro que modifique el timeOut de la función.

    // await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})  // para utilizar esta línea de código he debido comentar las líneas anteriores

})

// Otra manera de poder utilizar funciones como allTextContentes() que no tienen tiempo de espera es la siguiente:
test('Alternative waits', async({page}) => {

    const successButton = page.locator('.bg-success') 

    // __ WAIT FOR ELEMENT
    // await page.waitForSelector('.bg-success')  // Esperará hasta ener disponible la clase señalada

    // __ WAIT FOR PARTICULAR RESPONSE  (para esta necesitamos indagar respecto de la API [ajaxdata] en la pestaña Network del inspector)
                                        // miramos el status, el tiempo de que ha tardado en ejecutarse y nos quedamos con la URL

                                        // Request URL     http://uitestingplayground.com/ajaxdata
                                        // Request Method  GET
                                        // Status Code
                                        // 200 OK
                                        // Remote Address
                                        // 52.234.209.94:80
                                        // Referrer Policy
                                        // strict-origin-when-cross-origin
                                        
    // await page.waitForResponse("http://uitestingplayground.com/ajaxdata")

    // __ WAIT FOR NETWORK CALLS TO BE COMPLETED (***"NOT RECOMMENDED"***)  * No está recomendado ya q si una API está petando nos estropeará el Test al no cargar la página
    await page.waitForLoadState("networkidle")

    // explorar el resto de funciones "waitFor..." disponibles --> await page.waitFor.....()


    const text = await successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")


})


// Explicación con ejemplos respecto a los timeouts
test('Timeouts', async({page}) => {

        // test.setTimeout(10000)   //esta definición de timeout pasará por sobre la definida en el click() por lo que la prueba fallará

        // test.slow()  // Este comando hará que la espera definida en el config se multiplique por 3 (para testear en páginas con bajo rendimiento)

        const successButton = page.locator('.bg-success') 

        // Con la configuración actual en el fichero de configuración de playwright (30segs) el test pasará, pero si modificamos ese valor mediante el parámetro timeout 
        // a 10aegs fallará. Se puede cambiar tambien el paránetro general globalTimeout o los que se definen en la sección "use:" como actionTimeout y navigationTimeout

        // cabe recordad que además de las modificaciones en el fichero de configuración podemos definir en la misma función que llamemos el tiempo de espera con el parámetro
        // timeout como en el ejemplo siguiente*:     *Este parámetro pasará por sobre los valores definidos en el fichero de configuración de playwright

        await successButton.click({timeout:16000})

})

// Si queremos definir una suite específica de tests con un mayor o menos timeout podemos hacerlo de la sgte manera en el test.beforeEach()
// test.beforeEach(async({page}, testInfo) => {
//     await page.goto('http://uitestingplayground.com/ajax')  // página de testing  (botones con demora de 50seg etc)
//     await page.getByText('Button Triggering AJAX Request').click()
//     testInfo.setTimeout(testInfo.timeout + 3000)   // esto incrementará en 3segs la configuración actual en toda la suite
// })

// Un último parámetro modificable es el epecífico de expect() en el fichero de configuración de de PW (esto es para toda la Suite)
// expect:{
//     timeout: 3000
// },
// esto modificará los 5segs que tiene por defecto esa función y lo establecerá en 3 (recordad que se puede cambiar específicamente en la misma llamada de la función)