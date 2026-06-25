// Definiremos para nuestra primera PageObject el acceso al menú lateral de navegación 
// de nuestra página del proyecto

import {test, expect} from "@playwright/test"

// Para utilizar el método que creamos para acceder al menú debemos importar la clase
// que para ello se ha definido desde el fichero en que definiremos el resto de métodos
// de acceso
import { NavigationPage } from "../page-objects/navigationPage-PlayWright_Recomendations"


// Al tener solo una línea de código esta función no será definida en el fichero de navegación
test.beforeEach(async({page}) => {
    await page.goto('/')
})


test('Navigate to form page', async({page}) => {

    // Before of this we'll create a folder where to put our pageObject
    // and create in it a file .ts that define our class (navigationPage)
    // and yo be used here we must to import it

    // Instanciamos el objeto de la clase
    const navigateTo = new NavigationPage(page)

    // Llamamos a nuestro método formLayoutsPage de la clase NavigatePage 
    // para posicionarnos en el menú Layouts
    await navigateTo.formLayoutsPage()
})



