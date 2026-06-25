// Primero que nada debemos importar el metodo test desde PlayWright y luego definir los tests

import { test, expect } from "@playwright/test";

// test.beforeAll() test.afterAll() test.afterEach() No son muy utilizadas pero se puede utilizar para cosas muy genéricas
// Acumularemos entonces en esta función (beforeEach()) las líneas de código que se repitan

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// crearemos el nuevo test para utilizar las reglas de sintaxis del localizador

test('Locator syntax rules', async({page}) => {

    // by Tag name
    await page.locator('input').first().click()   // Tras probar el locator inferior sumamos ahora el click a este locator que tiene más de un resultado (para el
                                        //ejemplo quitamos el click() al sgte). Vemos en este caso como identifica todos los inputs de la página 
                                        //designando un ERROR al tener 20 opciones y no poder decantarse por ninguna. En el mismo error playwright UI nos
                                        //da ejemplos de como identificar alguna de estas 20 opciones específicamente.
                                        // Otra solución es identificar por ejemplo anteponiendo la función "first" antes del click() (elegrá por supuesto el primero
                                        //que encuentre en la página)
                                        //Ahora ya no habrá errores, pero la ejecución del test acabaría aquí y no buscaría el sgte locator

    // find by ID
    await page.locator('#inputEmail1').click()  //Al ejecutar el test en el modo UI vemos como se queda en el último get que hemos hecho en la
                                                //función beforeEach(), esto es que playwright solo ejecutará estos "locator" si se ejecuta en ellos
                                                //alguna acción, en este caso un click() (que como su respuesta es vacía "promise") agregamos la función
                                                //await... al volver a ejecutar vemos como si se detine ahora en este locator.

    // find by Class Value
    page.locator('.shape-rectangle')  // figura en la definición CSS del rectángulo de inserción del email
                                      // se debe anteponer el punto "." para que PlayWright lo identifique como una CLASE CSS
                                      // si ponemos un "#" sabrá que es un ID (como en el anterior localizador)

    // by attributes
    page.locator('[placeholder="Email"]')   

    // by full Class Value -- like with attributes
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]') 

    // combine differents selectors
      page.locator('input[placeholder="Email"][nbinput]')     // we just need to put them together (important not to put a "space" in between)
                                                              // in this example PlayWright will find an element that have this three attributes


    // by XPath OJO ======> **(NOT RECOMENDED)**
    page.locator('//*[@id="inputEmail1"]')


    // by partial text match
    page.locator(':text("Using")')    // Esto buscará el texto "Using" en la página (en este caso está sobre el ingreso del Email)

    // by exact and complete text match
    page.locator(':text-is("Using the Grid")')    // Esto buscará el texto exacto "Using the Grid" en la página (en el título en este caso sobre el ingreso del Email)


})


test('User facing Locators', async({page}) => {

    await page.getByRole('textbox', {name: "Email"}).first().click()   // En este caso al haber más de un resultado elegimos el primero

    await page.getByRole('button', {name: "Sign in"}).first().click()  // En un test real tendremos que saber exactamente el elemento que testeemos, con este ejemplo 
                                                                       //buscamos un botón que tenga el testo definido como "Sign in" y que en caso de haber dos se
                                                                       //decante por el primero de ellos (en nuestro ejemplo hay dos y si no elegimos uno de ellos
                                                                       //el test tendrá el sgte error:
                                                                       //  Error: locator.click: 
                                                                       //  Error: strict mode violation: getByRole('button', { name: 'Sign in' }) resolved to 2 elements
                                                                       // Por esta razón elegimos en este locator el primero de ellos.
    

    await page.getByLabel('Email').first().click()  // Esta localización mediante el label nos dirige al elemento de input siguiente (si lo hay)

    await page.getByPlaceholder('Jane Doe').click()  // Placeholder es el texto de ejemplo que contiene una caja de input

    await page.getByText('Basic Form').click()  // Este localizador buscará cualquier texto estático que la página contenga (no distingue mayúsculas de minúsculas)

    await page.getByTestId('Enviar').click()   // Esto buscará identificadores que el tester introduce en el proyecto, haremos un ejemplo con el botón de "Submit" en el 
                                               // cual sumaremos el atributo "data-testid" al cual definimos con el nombre de "Enviar" (en este caso si que se distingue entre
                                               // mayúsculas y minúsculas).  y OJO solo buscará en el contexto en el que estemos (en este caso el formulario "Basic Form" dentro 
                                               // de la página completa)

    await page.getByTitle('IoT Dashboard').click()  // Búscará un elemento que contenga el atributo "Title" y que este tenga el valor señalado

})

test('Locating Child Elements', async({page}) => {

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()  // Esta orden realiza exactamente lo mismo que la de arriba pero en su versión más corta (y más utilizada)
                                                                         // Navegará a una nb-card que contenga a un nb-radio y q este a su vez contenga una opción llamada
                                                                         // "Option 1" (esta búsqueda ya no será en toda la página sino en el área delimitada por los "nb-"
                                                                         // padre e hijo)

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()  // Otra forma de identificar el campo donde debe buscar el rol "button" con el nombre
                                                                                          // específico "Sign In".  Podría utilizarse solo el ejemplo anterior del test 
                                                                                          // 'User facing Locators' pero de esta manera queda más claro lo qué y dónde se busca

    await page.locator('nb-card').nth(3).click()  // nth() buscará por indice, esto es, encontrará el cuarto elemento "nb-card" en la página (la cuenta comienza con 0)

    await page.locator('nb-card').nth(3).getByRole('button').click()  // Continuando el ejemplo anterior, este buscará un botón en la cuarta aparición de un "nb-card"

})

test('Locating Parent Elements', async({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('#exampleInputPassword1')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Email"}).click()   // En este caso hacemos referencia al 
                                                                                                                                //botón rojo (único en la página)
                                                                                                                                //y luego elegimos el elemento padre con getByRole()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).getByRole('textbox', {name: "Email"}).click() 
    // el primer locator no separará
    //todos los 'nb-card" que encuentre
                                //y este segundo filtro nos seleccionará los check boxes
                                //de esta página (son 3)                    //luego este tercer filtro identificará
                                                                            //solo los que tengan el botón que diga 
                                                                            //"Sign In"                     //Finalmente el getByRole() buscará el campo Email del formulario

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Password"}).click()  //en esta localización identificamos un elemento y utilizamos
                                                                                                                    // '..' para subir un nivel y dentro de él realizamos la busqueda
                                                                                                                    //que nos interesa 
    
})

test('Reusing the Locators', async({page}) => {

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click()

    // Ahora utilizaremos una constante para almacenar el código repetido (este ejemplo lo haremos con "Horizontal form")

    const basicForm = page.locator('nb-card').filter({hasText: "Horizontal form"})

    // podemos tambien crear otras constantes a través de una constante, por ejemplo reemplazando el getByRole() del localizador del Email

    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    // de esta manera esta línea de código que hace lo mismo quedará mucho más resumida y clara
    //        await basicForm.getByRole('textbox', {name: "Email"}).fill('horizontal@test.com')

    await emailField.fill('horizontal@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome12345')
    await basicForm.locator('nb-checkbox').click()      // Esta línea seleccionará el chebox del card 
    await basicForm.getByRole('button').click()
    
    await expect(emailField).toHaveValue('horizontal@test.com')   // la aserción EXPECT DEBE SER IMPORTADA JUNTO A TEST DESDE "@playwright/test"

})


// En este test detallaremos técnicas de extracción de valores de una página (campos, botones, inputs, placeHolders, etc)
test('Extracting Values', async({page}) => {

    // Single test Value

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()   // la función textContent extraerá el valor del texto del botón y la asignara a la variable buttonText

    expect(buttonText).toEqual('Submit')



    // All text values

    // Revisaremos el contenido de los textos de los radioButtons y veremos si uno de ellos al menos contiene un valor determinado

    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()  // allTextContents es similar a textContent pero lo hará con todos los textos que cumplan
                                                                                    // con el localizador y los almacenará en un array

    expect(allRadioButtonsLabels).toContain("Option 1")   // Esta consulta verá si existe el valor "Opcion 1" en el arreglo allRadioButtonsLabels*
                                                        //* Al estar en un arreglo en este caso si habrá distinción entre Mayúscula y Minúscula



    // Get Input Value  -- Esto al no ser parte del código de la página requerirá de nuevas funciones

    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    
    await emailField.fill('testeandoElValorDelCampoEmail@test.com')  // poblamos el valor con un correo ficticio

    const emailValue = await emailField.inputValue()    // obtenemos el valor del campo a rtavés de la función inputValue()

    expect(emailValue).toEqual('testeandoElValorDelCampoEmail@test.com')  // realizamos la comparación


    // revisaremos ahora si el placeHolder concuerda con el valor que indiquemos

    const placeHolderValue = await emailField.getAttribute('placeholder')  // getAttribute() no entrega el valor del componente que indiquemos

    expect(placeHolderValue).toEqual("Email")  // Tambien tiene distinción entre caps y no caps

})




// En este test detallaremos las aserciones. Ya hemos visto expect(), pero ahora explicaremos las diferencias entre llamarlas con y sin la función "await"
test('Assertions', async({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')   

    // General Assertions

    const value = 5
    expect(value).toEqual(5)    // esta es una comparación simple entre izq y der. Tenemos una lista de comparaciones disponibles (toGreaterThan, toNull, etc). No todas son 
                                // genéricas como veremos en el sgte ejemplo

                      

    const text = await basicFormButton.textContent()  // En esta línea es indispensable poner la función "await" o el test fallará como indica el sgte error:
                                                        // Error: expect(received).toEqual(expected) // deep equality
                                                        //                 Expected: "Submit"
                                                        //                 Received: Promise {}
    expect(text).toEqual('Submit')


    // Locator assertion

    await expect(basicFormButton).toHaveText('Submit')  // Si no utilizamos "await" esta línea de código no será testeada. 
                                                        // Await indica que esperará 5 segundos a que este disponible la información solicitada, sino simplemente pasará de ella

    // Soft Assertion    --  cuando tras una aserción fallida indicamos que el test puede continuar

    await expect.soft(basicFormButton).toHaveText('Submit')   // la función soft()  nos permite continuar con el test a pesar de un error, NO SE CONSIDERA UNA BUENA PRÁCTICA
                                                              // pero en ciertos casos puede ser una buena ayuda
    await basicFormButton.click()

})






