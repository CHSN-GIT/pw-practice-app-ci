import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Heredaremos la clase de nuestra HelperBase() *aplicando la herencia se importa automáticamente
export class DatePickerPage extends HelperBase{

    // retiramos el campo al heredarlo de HelperBase()
    //    private readonly page: Page

    constructor(page: Page){

        // modificamos la forma de definición del contructor debido a la herencia
        //   this.page = page    // POR
        super(page)
        
    }


    // /**
    //  * Método que realiza el test sobre el calendario unitario
    //  * @param numberOfDayFromToday Cantidad de días a futuro que elegiremos en el calendario
    //  */
    // async selectCommonDatePickerDateFromTodayORIGINAL(numberOfDayFromToday: number){

    //     const calendarInputField = this.page.getByPlaceholder('Form Picker')
    //     await calendarInputField.click()
        
    //     let date = new Date()   // instaciamos al objeto para este nuevo escenario
    //     date.setDate(date.getDate() + numberOfDayFromToday)  // Ahora definiremos una fecha 60 días superior para que en el presente ejemplo nos saltemos a meses siguientes
    //     const expectedDate = date.getDate().toString()  // Asignamos la fecha almacenada en formato string a nuestra constante
    //     const expectedYear = date.getFullYear()   // para completar el formato necesitamos también extraer el año
    //     const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})   // Extraeremos a una constante el valor del mes pero ahora en su forma completa
    //     const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'}) // y volvemos a definir nuetro nuevo mes en su forma corta
    //     const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    //     let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()  // obtendremos con ello el valor del mes y año reflejado 
    //                                                                                                // utilizaremos una variable para luego trabajar con ella
    //     const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `   // Ponemos los espacios al comienzo y final ya q ese es el formato en el proyecto
    
    //     // Ahora realizaremos un ciclo "while" hasta que concuerde el mes requerido con el mes del calendario
    //     while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    //         // Como el mes/año no coincide haremos un clic en el botón hacia la derecha
    //         // utizando para ello el nb-calendar-pageable-navigation que es el componente
    //         // y el data-name="chevron-right" del ícono en cuestión
    //         await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    //         calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    //     }
    
    //     // Finalmente realizamos la comprobación de que la fecha seleccionada es la correcta
    //     await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()  
    //     await expect(calendarInputField).toHaveValue(dateToAssert)

    // }


    // Como utilizaremos prácticamente el mismo código luego para realizar los test sobre el calendario con tramos de fechas
    // crearemos un método privado el cual hará el manejo de la fecha y lo quitaremos de los métodos que creemos para hacer 
    // el código más legible

    /**
     * Método que realiza el test sobre el calendario unitario
     * @param numberOfDayFromToday Cantidad de días a futuro que elegiremos en el calendario
     */
    async selectCommonDatePickerDateFromToday(numberOfDayFromToday: number){

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        // Aquí realizaremos la llamada al código extraído con el que generamos el nuevo método privado        
        const dateToAssert = await this.selectDateInCalendar(numberOfDayFromToday)
 
        // Como esta línea contiene la variable dateToAssert que ya no existe en este método
        // haremos que el método privado nos la devuelta mediante un return
        await expect(calendarInputField).toHaveValue(dateToAssert)

   }


    /**
     * Método que realiza el test sobre el calendario con rango de fechas
     * @param startDayFromToday - Cantidad de días que tendrá el rango a partir del día en curso para el Inicio del rango
     * @param endDayFromToday  - Cantidad de días que tendrá el rango a partir del día en curso para el Final del rango
     */
    async selectDatePickerWithRangeFromToday(startDayFromToday, endDayFromToday: number){

        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        // Aquí realizaremos las llamada al código extraído con el que generamos el nuevo método privado
        // Una vez para la fecha de inicio y otra para la de fin 
        const dateToAssertStart = await this.selectDateInCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDayFromToday)

        // Con los valores recibidos crearemos el rango que muestra el formulario
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
 
        await expect(calendarInputField).toHaveValue(dateToAssert)

   }




   // Método privado para seleccionar una fecha en el calendario (extraído de nuestra primer método creado)
   private async selectDateInCalendar(numberOfDayFromToday: number){

        let date = new Date()   // instaciamos al objeto para este nuevo escenario
        date.setDate(date.getDate() + numberOfDayFromToday)  // Ahora definiremos una fecha 60 días superior para que en el presente ejemplo nos saltemos a meses siguientes
        const expectedDate = date.getDate().toString()  // Asignamos la fecha almacenada en formato string a nuestra constante
        const expectedYear = date.getFullYear()   // para completar el formato necesitamos también extraer el año
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})   // Extraeremos a una constante el valor del mes pero ahora en su forma completa
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'}) // y volvemos a definir nuetro nuevo mes en su forma corta
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()  // obtendremos con ello el valor del mes y año reflejado 
                                                                                                   // utilizaremos una variable para luego trabajar con ella
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `   // Ponemos los espacios al comienzo y final ya q ese es el formato en el proyecto
    
        // Ahora realizaremos un ciclo "while" hasta que concuerde el mes requerido con el mes del calendario
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            // Como el mes/año no coincide haremos un clic en el botón hacia la derecha
            // utizando para ello el nb-calendar-pageable-navigation que es el componente
            // y el data-name="chevron-right" del ícono en cuestión
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        // Finalmente realizamos la comprobación de que la fecha seleccionada o rango sean correctos
        // NOTA:
        // Al mezclar dos calendarios (el unitario y el de rango) hubo que hacer una modificación al locator original del código
        //                  await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        // ya que sino encontraba más de un resultado (en caso de ser uno de los primeros días del mes ya que aparece el actual y el siguiente).
        // Para resolver este punto, tras analizar mediante el inspector el calendario encontramos una clase más llamada .bounding-month
        // para los días que no son del mes en curso, de esta manera si excluímos este parámetro mediante la negación de esa clase de CSS
        // ya no provocará el error de tener más de una opción *
  
        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, {exact: true}).click()  

                // * El profesor dio esta otra opción de solución que incluye lógicas de IF/ELSE
                //   (y que es bastante más enrevesada la verdad)
                //         const dayCell = this.page.locator([class="day-cell ng-star-inserted"])
                //         const rangeCell = this.page.locator([class="range-cell day-cell ng-star-inserted"])

                //         if(await dayCell.first().isVisible()){
                //              await dayCell.getByText(expectedDate, {exact: true}).click()
                //         } else {
                //              await rangeCell.getByText(expectedDate, {exact: true}).click()            
                //         }

        return dateToAssert
   }




}