import {test, expect} from "@playwright/test"

// Para utilizar los métodos que creamos para acceder al menú debemos importar la clase
// que para ello se ha definido desde el fichero en que definiremos el resto de métodos
// de acceso
import { NavigationPage } from "../page-objects/navigationPage-PlayWright_Recomendations"


// Al tener solo una línea de código esta función no será definida en el fichero de navegación
test.beforeEach(async({page}) => {
    await page.goto('/')
})


test('Navigate to Form Page', async({page}) => {

    // Instanciamos el objeto de la clase
    const navigateTo = new NavigationPage(page)

    // Llamamos a nuestro método formLayoutsPage de la clase NavigatePage 
    // para posicionarnos en el menú Layouts
    await navigateTo.formLayoutsPage()

    // Ahora llamaremos a una de las opciones de Layouts como es el datePicker
    await navigateTo.datePickerPage()

    // Repetiremos la llamada para cada uno de los menús del proyecto
    await navigateTo.smartTablePage()

    await navigateTo.toastrPage()

    await navigateTo.toolTipPage()

})