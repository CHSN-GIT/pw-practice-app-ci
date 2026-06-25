// import {test, expect} from "@playwright/test"
// ahora en vez de importar test desde playwright lo haremos desde nuestro test-options.ts
// de esta manera incluiremos las fixtures que extienden de él
import {test} from '../test-options'

// import { PageManager } from "../page-objects/pageManager"  // ya podemos quitar este import al utilizar nuestra fixture de PageManager
                                                              // creada en test-options

import {faker} from '@faker-js/faker'


// test.beforeEach(async({page}) => {
//     await page.goto('/')
// })


// test('Parametrized Methods With Fixtures', async({page, formLayoutsPage}) => {    // incluimos ahora nuestro fixture formLayoutsPage
                                                                                  // y con ello ya podemos quitar nuestro beforeEach()
                                                                                  // ya que esa función será realizada por ella

// test('Parametrized Methods With Fixtures', async({page}) => {    // quitamos ahora nuestro fixture formLayoutsPage
                                                                // ya que la hemos definido en test-options.ts como automática, 
                                                                // de esta manera será siempre lo primero en ejecutarse         
                                                                
                                                                
test('Parametrized Methods With Fixtures', async({pageManager}) => {    // reemplazamos page por nuestra nueva fixture pageManager 
                                                                        //    

    // const pm = new PageManager(page)   // ahora crearemos otra fixture que reemplace esta llamada al PageManager

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(" ",".").toLowerCase()}${faker.number.int({min:10, max:99})}@test.com` 

    // await pm.navigateTo().formLayoutsPage()   // tampoco es necesaria ahora al utilizar para ello nuestra fixture
    
    // await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@test2.com', "Welcome1!", "Option 2")
    // await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckBox(randomFullName, randomEmail, true)

    // reemplazamos ahora pm con nuestro fixture pageManager
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('testing@test2.com', "Welcome1!", "Option 2")
    await pageManager.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckBox(randomFullName, randomEmail, true)

})