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

// Importación de la dependencia Faker para generar datos Random
import {faker} from '@faker-js/faker'


// Al tener solo una línea de código esta función no será definida en el fichero de navegación
test.beforeEach(async({page}) => {
    await page.goto('/')
})


test('Parametrized Methods IV Using PageManager', async({page}) => {

    // Instanciamos el objeto de la clase 
    const pm = new PageManager(page)

    const randomFullName = faker.person.fullName()
    // se puede reemplazar quitando el espacio con replace(" ","") pero pondremos un "."
    const randomEmail = `${randomFullName.replace(" ",".").toLowerCase()}${faker.number.int({min:10, max:99})}@test.com` 
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@test2.com', "Welcome1!", "Option 2")

    await page.screenshot({path: 'screenShots/Parametrized_Methods_IV_Login.jpg'})  // Esta función creará tanto la carpeta en nuestro proyecto como 
                                                                                 // también el fichero de la captura de pantalla completa
    
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckBox(randomFullName, randomEmail, true)

    await page.locator('nb-card', {hasText: "Using the Grid"}).screenshot({path: 'screenShots/Parametrized_Methods_IV_Login_AREA.jpg'})
    // Esta captura será solo del área que le estamos indicando

    const captura = await page.screenshot()
    // Esta orden almacenará la última captura en una constante

    console.log(captura.toString('base64'))
    // Con esta orden veremos el contenido del fichero binario


    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(6)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1,13)    

})