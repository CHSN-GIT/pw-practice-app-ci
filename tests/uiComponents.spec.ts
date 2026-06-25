import test, { expect } from "@playwright/test"
import { timeout } from "rxjs-compat/operator/timeout"

// test.describe.configure({mode:"parallel"})

test.beforeEach(async({page}) => {
    await page.goto('/')
})


// test.describe.parallel('Form Layouts page', () => {    definición en caso de que este si sea un test q deba ejecutarse en forma paralela
test.describe('Form Layouts page', () => {

    // Redefinición de los reintentos en caso de error
    test.describe.configure({retries: 2})

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })


    test('Input Fields', async({page}, testInfo) => {

        // Identificamos el input que queremos y lo asignamos a la constante
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        // Con la función fill() llenamos el campo de input con el valor deseado
        await usingTheGridEmailInput.fill('test@test.com')

        // para limpiar el campo de input usamos la función clear()
        await usingTheGridEmailInput.clear()

        // Utilizaremos aquí una segunda definición en caso de que este sea un reintento del test
        // De esta manera corregiremos el error en la definición del email (solo para reflejar el uso de esta función)
        if(testInfo.retry){
           await usingTheGridEmailInput.pressSequentially('test123456789@test.com', {delay:100})
        } else {
        // la función pressSequentially()  llenará el campo secuencialmente y podremos poner un delay para que la inserción sea simulada a la humana
            await usingTheGridEmailInput.pressSequentially('test123456789000@test.com', {delay:100})
        }

        // Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()   // obtenemos el valor del campo input

        expect(inputValue).toEqual('test123456789@test.com')  // realizamos una aserción y vemos si cumple la condición señalada


        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test123456789@test.com')  // Para los campos de input debemos usar toHaveValue() no toHaveText()

    })



    test('Radio Buttons', async({page}) => {

        // Identificamos la zona general donde está incluído el radio button que queremos tratar
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        // Vamos directamente a la "opción 1" y la elegimos mediante la función check()
        await usingTheGridForm.getByLabel('Option 1').check({force: true})

        // Utilizaremos otro ejemplo de como acceder al radio button
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        // con esta orden podremos luego confirmar si el check está o no activo asignando el resultado booleano a radioStatus
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()

        // para comprobarlo utilizaremos la aserción expect() junto a la función toBeTruthy()
        expect(radioStatus).toBeTruthy()

        // Otra manera de realizar esta prueba utilizando la función toBeChecked() es la sgte:
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // Ahora realizaremos la prueba de realizar un check() en la "option 2" y ver si "option 1" deja de estar seleccionada
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })

})


// Como la sección de checkboxes está fuera de la modal "Using the Grid"
// crearemos un nuevo test con su propio beforEach() que nos posicione
// en la página indicada (en este caso como no hay más tests para esa área
// no sería necesario el "describe" que es utilizado para una serie de test
// relacionados a un área específica)    *Lo he hecho para practicar
test.describe('Checkboxes', () => {

    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })


    test('Check && unCheck', async({page}) => {

        // Debemos hacer notar que si bien existe una función check() y otra uncheck(), estas realizan la tarea a las que fue encomendada,
        //esto es, si un checkbox está seleccionado y se le apunta esta orden con un check() no hará ningún cambio al estar ya seleccionada
        // Distinto es el caso de la función click() que también haría cambiar el estado de check a unchek y viceversa pero si saber en que
        //estado ha quedado la opción (habría que utilizar expect())

        //*OJO al estar esta opción tb definida como visually-hidden (en las clases) se debe operar con force = True

        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})


        // Haremos el ejemplo de seleccionar todas las opciones del checkbox y darles un check() o un uncheck()
        const allBoxes = page.getByRole('checkbox')

        // Utilizaremos el loop FOR (iterador) de typescript.
        // Tendremos eso si que convertir allBoxes en un arreglo, utilizando la función all() que a su vez al ser "promise" requiere utilizar await
        for(const box of await allBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }

        // Para realizar un unCheck() la tarea es similar
        for(const box of await allBoxes.all()){
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })
    
})


// Utilizaremos la lista desplegable del header de la página de prácticas
test('Lists && Dropdowns', async({page}) => {

    // Para centrar la búsqueda nos situaremos en la zona del Header que contiene el botón 
    // que despliega el menú dropdown
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    // Para acceder al área de la lista dropdown una vez desplegada con la función anterior
    // recurriremos a getByRole() atacando tanto a UL como LI tags
    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when the list has LI tag

    // Una vez confirmado el uso de UL para la lista continuamos centrando la búsqueda con 
    // la función genérica locator() mediante el tipo 'nb-option'

    // tendremos estas dos opciones para localizar el item
    // ya sea con dos llamadas a locator
    //       const optionList = page.locator('list').locator('nb-option')

    // o esta versión más reducida y clara quizá
    const optionList = page.locator('nb-option-list nb-option')

    // Confirmación de que disponemos la lista de items en el arreglo obtenido en la función anterior
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])   
    // OJO => El orden debe ser el mismo de las opciones en la lista o tendrá un resultado de error

    // Para seleccionar una de las opciones realizamos un filtrado por el nombre de esta
    await optionList.filter({hasText: "Cosmic"}).click()

    // Para confirmar que la web ha cambiado de color correctamente, podemos simplemente seleccionar
    // una área y ver el nuevo color de background asignado mediante el inspector  (en este caso 50 50 89)
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // Ahora por buscar que cada perfil tiene el fondo correcto,
    // realizaremos lo sgte:

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])

        if(color != "Corporate") 
            await dropDownMenu.click()
    }

})



// El problema para identificar el tooltip en el DOM es que este desaparece,
// para ello necesitaremos ir a la ventana "source" del inspector y mientras
// no aparece el tooltip presionar F8 para pausar el debugger, de esta manera
// nos devolvemos a "elements" y vemos como localizar el componente
test('Tooltips', async({page}) => {


    // primero que nada nos posicionamos en la opción de los ejemplos de tooltips
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    // luego nos centramos en la zona de nb-card de la opción que buscamos
    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    // y mediante el rol "button" y el name "Top" más la función hover() nos mostrará el tooltip
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    // otra opción es fijar la posición mediante el ROL "tooltip"
    // que debe estar definido en el proyecto o de otro modo no lo encontrará
    page.getByRole('tooltip')  // only works if you have a role 'tooltip' created
    const tooltip = await page.locator("nb-tooltip").textContent()
    expect(tooltip).toEqual('This is a tooltip')

})


// En este caso podemos utilizar el seleccionador del inspector y dar con el área de código
// de estos Dialog Boxes sin problema (en el caso de los ejemplos en "Dialog" de "Modal & Overlays"),
// o que esta ventana sea parte del navegador como por ejemplo
// en el caso de un borrado en la "Smart Table" de "Tables & Data" en cuyo caso ......
test('Dialog Boxes', async({page}) => {


    // primero que nada nos posicionamos en la opción de los ejemplos 
    // de Dialog Boxes del proyecto
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // * Creamos entonces el listener (método "on") con las sgtes opciones:
    page.on('dialog', dialog => {

        // identificamos la ventana de dialogo que esperamos
        expect(dialog.message()).toEqual("Are you sure you want to delete?")  
        dialog.accept()  // y le indicamos que acepte esta orden
    
    })

    // Luego buscamos la tabla y en ella la línea (TR) que contenga en este caso "@mdo" (la 1ra de la lista)
    // y luego en esa línea el botón de trash por la clase "nb-trash" en el cual haremos click.
    // En esta situación Playwright simplemente nos cierra la ventana emergente debido a que ella es parte
    // del navegador y con ello no eliminará la línea en cuestión.
    // PARA PODER ELIMINARLO TENDREMOS QUE UTILIZAR UN "LISTENER" (que detecte la ventana de dialogo) ANTES DE ESTA LÍNEA *
    await page.getByRole('table').locator('tr', {hasText:"@mdo"}).locator('.nb-trash').click()

    // Luego realizaremos la comprobación de que la línea si ha sido borrada
    await expect(page.locator('table tr').first()).not.toHaveText("@mdo")

})



test('Web Tables', async({page}) => {

    // PRIMER ESCENARIO
    // primero que nada nos posicionamos en la opción de los ejemplos de la Web Table
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1) Get the row by any test in the selected row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})   // Elegimos la fila mediante el campo Email
    await targetRow.locator('.nb-edit').click()  // seleccionamos el botón de editar mediante la clase del lápiz
    await page.locator('input-editor').getByPlaceholder('Age').clear()  // buscamos el input de Edad y lo limpiamos
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')  // Ponemos el valor deseado a la celda
    await page.locator('.nb-checkmark').click()  // Volvemos a clicar sobre el ícono del lápiz en su modo edición
                                                 // accediendo mediante su clase de edición 


    // SEGUNDO ESCENARIO
    // Ahora plantearemos la búsqueda en un escenario más difícil, en la página dos hay dos campos que contienen el nro 11
    // y si queremos acceder a esa fila nos será imposible a través del modelo anterior con 'row'

    // Primero accederemos a la 2da página a través de la clase asociada a los botones de navegación 
    // y luego identificaremos con el nro "2"  (puede ser la clase ng2-smart-pagination-nav o la interior ng2-smart-pagination)
    await page.locator('.ng2-smart-pagination').getByText("3").click()

    // Esta búsqueda nos encontrará los dos campos que contienen un "27" y nos dará un error
    //          const targetRowById = page.getByRole('row', {name: "27"})  
    // por lo que utilizaremos un filtro para centrar la búsqueda en el valor y campo deseado
    // usando un filtro que contiene un locator que ubicará la columna e índice de ella indicado (es 1 al ser los botones 
    // de edición y borrado la columna 0)
    const targetRowById = page.getByRole('row', {name: "27"}).filter({has: page.locator('td').nth(1).getByText("27")})
    
    // una vez posicionados en la fila correcta hacemos clic sobre el botón de editar
    await targetRowById.locator('.nb-edit').click()

    // y finalmente modificamos el campo que se desee cambiar
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()  // buscamos el input de E-mail y lo limpiamos
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('correo@reemplazado.com')  // Ponemos el valor deseado a la celda

    await page.locator('.nb-checkmark').click()  // Volvemos a clicar sobre el ícono del lápiz en su modo edición
                                                 // accediendo mediante su clase de edición

    // Luego hacemos una asersión con "expect" para comprobar que el cambio se ha efectuado correctamente
    await expect(targetRowById.locator('td').nth(5)).toHaveText("correo@reemplazado.com")



    // TERCER ESCENARIO
    // ----------------------------------------------------------------------------------------------------------
    // Haremos una prueba que nos certifique que las búsquedas por filtro que tiene la tabla operan correctamente

    // Nos cambiamos a la pag.1   (no es necesario)
    //  await page.locator('.ng2-smart-pagination').getByText("1").click({timeout:0})  ***Verificar porque se detiene con el timeOut a 0***

    // Automatizaremos este escenario buscando distintos valores para robar el filtro de la tabla
    const ages = ["20", "27", "30", "40", "300"]

    // Este primer loop hará un filtro en secuencia para cada edad detallada a través del campor del tipo 'input-filter'
    // con PlaceHolder = "Age"
    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()  // buscamos el input filter de Edad y lo limpiamos
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)  // Ponemos el valor deseado en el filtro

        await page.waitForTimeout(400)   // incluímos un timeOut ya que de otra manera la ejecución es muy rápida
                                         // y la tabla no alcanza a actualizar los valores
 
        const ageRows = page.locator('tbody tr') // localizamos cada una de las filas

        for(let row of await ageRows.all()){    // realizamos un 2do loop con las filas y verificamos que el valor dado
                                                // de edad corresponde al que hay en esa fila 

            const cellValue = await row.locator('td').last().textContent() // accedemos a la última columna de la fila

            if(age!="300") {   
                expect(cellValue).toEqual(age)    // si no es 300 verifica que el campo Age (último de la fila) = age
            } else {
                // en caso de que sea 300 debemos obtener un "No data found" en el tbody de la tabla
                expect(await page.getByRole('table').textContent()).toContain("No data found")
            }
        }
    }

})




test('Date Picker', async({page}) => {

    // primero que nada nos posicionamos en la opción de los ejemplos 
    // de los Datepicker del proyecto
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()


    // 1er ESCENARIO
    // COMMON Datepicker (selección de un día específico)

    // Para inspeccionar el primero de los manejos de las fechas, desplegamos el calendario
    // y luego inspeccionamos el campo de input, vemos que utilizando el Placeholder = "Form Picker"
    // podremos acceder a este input

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    // ahora elegiremos uno de los días del mes en curso intentando evitar que se clique sobre días que son tanto del
    // mes anterior como del mes siguiente (no pueden ser elegidos) quien poseen la clase bounding-month que los diferencia
    // por lo cual realizaremos la búsqueda por la clase completa (para de esta manera solo seleccionar los días correspondientes
    // al mes correcto)

    await page.locator('[class="day-cell ng-star-inserted"]').getByText("17").click()

    // OJO
    // Pero este método tiene un conflicto y es q si buscamos el día "1" ó "2" nos encontrará todos los días que los contengan,
    // esto es del "10" al "19", "21" y "31" para el día "1" y similar para el día "2"

    // Qué debemos hacer?  Pues solo utilizar el parámetro "exact" de getByText() de la sgte forma:

    await calendarInputField.click()  // Volvemos a cargar el calendario
    await page.locator('[class="day-cell ng-star-inserted"]').getByText("1", {exact: true}).click()    // Elegimos el día "1"

    // Ahora confirmamos el funcionamiento del datepicker
    await expect(calendarInputField).toHaveValue("Mar 1, 2026")


    // 2do ESCENARIO
    // Elegir una fecha específica como "mañana" o "ayer" o el día tal del "próximo mes" dependiendo de los requerimientos del negocio
    // La idea también es, que no haya que tocar el código cada vez sino que dejar las fechas automatizadas también (día en curso, ayer, 
    // mañana, siguiente mes y/o siguiente año)

    // Crearemos el test para que se controle siempre "mañana", utilizando para ello el objeto DATE de Javascript

    let date = new Date()   // instaciamos al objeto 
    date.setDate(date.getDate() + 1)  // esto asignara a nuestra instancia el día en curso "MAS UNO" (mañana :-) ) *ver en la web la def de Date()

    const expectedDate = date.getDate().toString()  // Asignamos la fecha almacenada en formato string a nuestra constante

    await calendarInputField.click()  // Volvemos a cargar el calendario
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()    // Elegimos el día de mañana

    // Ahora para reemplazar también la fecha hardcodeada en el expect utilizaremos la sgte metodología
    // primero definimos una nueva constante para definir la fecha y que esta se entregue en forma equivalente a "Mar 11, 2026"

    const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})  // Aquí lo que se hace es extraer el mes en curso en su forma corta
                                                                                   // y en inglés

    // para completar el formato necesitamos también extraer el año
    const expectedYear = date.getFullYear()

    // Ahora nos queda unir los strings y formar la fecha en el modo en que esta se entrega ("Mar 11, 2026")
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`  // OjO las comillas utilizadas para crear el string son las de tilde inverso ` `

    await expect(calendarInputField).toHaveValue(dateToAssert)


})



test('Date Picker 2do CASO', async({page}) => {

    // ************************************************************************************//
    // He separado las pruebas para tener seguridad de que no se estaban liando las fechas //
    // ************************************************************************************//

    // primero que nada nos posicionamos en la opción de los ejemplos 
    // de los Datepicker del proyecto
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    // OjO
    // Todo parece estar ya correcto pero tenemos otro problema y es que si le sumamos en vez de un día a la fecha dos semanas y ello hace que la fecha cambie de mes
    // el calendario no cambiará de mes sino que contará los días volviendo a comenzar en el mismo mes en curso.  Para solucionar esto haremos uso de los botones
    // del calendario "<" y ">"  para cambiar de mes por el que nos interese (una vez confirmado el mes en curso del calendario).

    // Primero obtendremos el valor mes/año que el calendario contiene tras cargar el calendario
    const calendarInputField2doCaso = page.getByPlaceholder('Form Picker')
    await calendarInputField2doCaso.click()

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()  // obtendremos con ello el valor del mes y año reflejado 
                                                                                         // utilizaremos una variable para luego trabajar con ella
    
    let date2doCaso = new Date()   // instaciamos al objeto para este nuevo escenario
    date2doCaso.setDate(date2doCaso.getDate() + 200)  // Ahora definiremos una fecha 60 días superior para que en el presente ejemplo nos saltemos a meses siguientes

    const expectedDate2doCaso = date2doCaso.getDate().toString()  // Asignamos la fecha almacenada en formato string a nuestra constante
    
    // para completar el formato necesitamos también extraer el año
    const expectedYear = date2doCaso.getFullYear()
    
    // Extraeremos a una constante el valor del mes pero ahora en su forma completa
    const expectedMonthLong = date2doCaso.toLocaleDateString('En-US', {month: 'long'})
    // Volvemos a obtener el año
    const expectedYear2doCaso = date2doCaso.getFullYear()
    // y volvemos a definir nuetro nuevo mes en su forma corta
    const expectedMonthShort2doCaso = date2doCaso.toLocaleDateString('En-US', {month: 'short'})  

    // Tras ello ya podemos definir la fecha (mes/año del encabezado del calendario)
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear2doCaso} `   // Ponemos los espacios al comienzo y final ya q ese es el formato en el proyecto

    // Ahora realizaremos un ciclo "while" hasta que concuerde el mes requerido con el mes del calendario
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        // Como el mes/año no coincide haremos un clic en el botón hacia la derecha
        // utizando para ello el nb-calendar-pageable-navigation que es el componente
        // y el data-name="chevron-right" del ícono en cuestión
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()

        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    // Finalmente realizamos la comprobación de que la fecha seleccionada es la correcta

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate2doCaso, {exact: true}).click()  

    const dateToAssert2doCaso = `${expectedMonthShort2doCaso} ${expectedDate2doCaso}, ${expectedYear}`
    await expect(calendarInputField2doCaso).toHaveValue(dateToAssert2doCaso)

})


test('Sliders', async({page}) => {

    // Update Attribute

    // Mediante el uso del inspector accedemos al elemento circle que contiene las variables cx y cy que mueven el Slider
    // vemos que está contenido en un elemento ngx-temperature-dragger (que a su vez está contenido en un nb-tab que se compone
    // de la humedad y temperatura).

    // En este ejemplo moveremos el cursor a su máxima temperatura (haremos primero la localización de tabtitle="Temperature").
    // Los valores asignados los hemos obtenido moviendo con el cursor y mediante el inspector
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })

    // El paso anterior solo desplaza el circulo sin pintar la línea, para ello haremos un click en el elemento
    await tempGauge.click()


    // Mouse movement

    // 2da Metodología (mover el cursor y no cambiar solo los valores del slider)

    // Para este segundo caso debemos utilizar el dragger (ngx-temperature-dragger) que contiene ng-reflect-set-value 
    // el cual varía en funsión del desplazamiento del ratón dentro del área del recuadro de la temperatura

    // definimos la caja dónde se debería desplazar el ratón (quitando el circle del ejemplo anterior)
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')

    // Luego verificar que esta caja está completamente visible en el navegador (para ello debemos desplazar
    // levemente la página para que este recuadro esté completamente visible)
    await tempBox.scrollIntoViewIfNeeded()

    // * Ver definición de la Bounding Box en OneNote
    const box = await tempBox.boundingBox()

    // Primero definiremos el centro de nuestra área de movimiento
    const x = box.x + box.width/2
    const y = box.y + box.height/2

    // Ahora procederemos a mover el cursor partiendo por el centro
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()

    // Y finalmente realizamos la confirmación de que la acción dio resultado
    await expect(tempBox).toContainText("30")
})


