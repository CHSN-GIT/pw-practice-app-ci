// Primero que nada debemos importar el metodo test desde PlayWright y luego definir los tests

import { test, expect } from "@playwright/test";



// Ahora el nuevo test apuntando a la dirección web con un ejemplo https://globalsqa.com/demo-site/draganddrop/

test('Drag and Drop with Iframe', async({page}) => {

    await page.goto('https://globalsqa.com/demo-site/draganddrop/')

    // Antes que nada la página en cuestión ha cambiado y ahora tiene una plantilla en donde se acepta o no
    // el manejo de las cookies.  Para que la prueba se pueda llevar a cabo haremos un clic en el botón de
    // aceptar para que la prueba pueda ejecutarse automáticamente.
    const concent = page.locator('.fc-consent-root .fc-dialog-container .fc-footer-buttons-container .fc-footer-buttons')
    await concent.locator('.fc-button-label').getByText("Consent").click()


    // Intentaremos acceder a una de las imágenes con la siguiente orden:
        // await page.locator('li', {hasText: "High Tatras 2"}).click()
    
    // Nos ha dado fallo de TimeOut debido a que el locator() no puede encontrar
    // el elemento señalado debido a ser parte de un Iframe lo cual lo hace 
    // inaccesible.

    // Para resolver esta situación y poder acceder a un Iframe contenido en una WEB
    // lo que debemos hacer es localizar este Iframe sobre la página que lo contiene
    // con la funcion frameLocator() y luego trabajar dentro de esa constante Iframe:

    const iframePage = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await iframePage.locator('li', {hasText: "High Tatras 2"}).click()

    // Superada esta parte de la prueba ya podemos centrarnos en el Drag&Drop
    // para ello necesitamos identificar el área donde deseamos depositar la
    // imágen en este caso (el Trash que posee su propio ID con ese nombre).
    // Utilizaremos la misma instrucción anterior pero en vez d e realizar un click
    // haremos un Drag&Drop
    await iframePage.locator('li', {hasText: "High Tatras 3"}).dragTo(iframePage.locator('#trash'))

    // More Precise Control
    // Otro método es controlado el desplazamiento
    await iframePage.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()                      // esta orden toma el control del ratón
    await iframePage.locator("#trash").hover()
    await page.mouse.up()                        // esta orden libera el control del ratón

    // Solo nos queda realizar la comprobación de que estas pruebas han sido correctas
    // verificando que ambas imágenes se encuentran en el trash 

    await expect(iframePage.locator('#trash li h5')).toHaveText(["High Tatras 3", "High Tatras 4"])
})

