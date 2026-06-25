import {test, expect} from "@playwright/test"

// Para utilizar los métodos que creamos para acceder al menú debemos importar la clase
// que para ello se ha definido desde el fichero que hayamos definido y lo mismo haremos
// con la clase Parametrizada FormLayoutsPage
import { NavigationPage } from "../page-objects/navigationPage"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatePickerPage } from "../page-objects/datepickerPage"

// Aquí importaremos la nueva clase creada PageManager (Esta importación nos permite luego eliminar
// todas las importaciones a nuestras clases individuales)
import { PageManager } from "../page-objects/pageManager"



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

    await navigateTo.toolTipPage()

    await navigateTo.toastrPage()

})


// crearemos un nuevo test para utilizar nuestro nuevo metodo FormLayoutsPage
test('Parametrized Methods', async({page}) => {

    // Instanciamos el objeto de la clase
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "Welcome1!", "Option 1")

})


// podemos crear un nuevo test para utilizar nuestro metodo FormLayoutsPage pero con diferentes parámetros y sumando a él
// el nuevo método submitInLineFormWithNameEmailAndCheckBox()
test('Parametrized Methods II', async({page}) => {

    // Instanciamos el objeto de la clase
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('testing@test2.com', "Welcome1!", "Option 2")
    await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckBox('John Smith', 'john@testing.com', true)

})


// podemos crear un nuevo test para utilizar nuestro metodo FormLayoutsPage pero con diferentes parámetros y sumando a él
// el nuevo método submitInLineFormWithNameEmailAndCheckBox()
test('Parametrized Methods III', async({page}) => {

    // Instanciamos el objeto de la clase
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(6)

    await onDatePickerPage.selectDatePickerWithRangeFromToday(1,13)


})


// Crearemos en este nuevo TEST las llamadas a nuestro nueva Clase PageManager para utilizar nuestras otras clases
// generadas de una forma más eficiente
test('Navigate to Form Page using PageManager', async({page}) => {

    // Instanciamos el objeto de la clase 
    const pm = new PageManager(page)

    // y luego utilizamos las mismas llamadas a los métodos pero a traves de esta nueva clase
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toolTipPage()
    await pm.navigateTo().toastrPage()

})

test('Parametrized Methods IV Using PageManager', async({page}) => {

    // Instanciamos el objeto de la clase 
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@test2.com', "Welcome1!", "Option 2")
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckBox('John Smith', 'john@testing.com', true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(6)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1,13)    

})