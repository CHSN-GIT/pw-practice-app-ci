// Importamos la feature Page de la librería de Playwright
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


// Utilizaremos la keyword "export" para hacer nuestra clase visible
// para otros ficheros y "extends" para hacerla una clase heredada
// en este caso de nuestra HelperBase()
export class NavigationPage extends HelperBase {

    // Dentro de la clase crearemos

    // la instancia page para nuestro objeto*   **
    // ** ESTE CAMPO YA NO SERÁ REQUERIDO AL HEREDARLO DE **
    // ** LA CLASE HelperBase()                           **
    //         readonly page: Page


    // Un constructor deberá ser modificado al ahora haber definido a esta clase
    // como heredada de HelperBase()
    // constructor(page: Page){
    //    this.page = page    // asignamos al objeto creado en los test
                              // el parámetro asociado en la creación de 
                              // la instancia en el test para asegurarnos
                              // de que utilizamos la misma instancia de 
                              // de page durante la ejecución del test 

    // }
    // ** LA DEFINICION DEL CONTRUCTOR DE UNA CLASE "HEREDADA" SE REALIZA **
    // ** DE LA SIGUIENTE FORMA                                           **
    constructor(page: Page){

        super(page)
    }
    // ** TRAS ELLO YA PODREMOS LLAMAR AL O LOS MÉTODOS CREADOS EN HELPERBASE() DE MANERA NORMAL **
    // *** REALIZAREMOS ESTA MODIFICACIÓN EN TODAS LAS CLASES PARA DISPONER DE ESA BASE DE MÉTODOS ***
    // *** CREADAS EN TODO EL RESTO DE NUESTRAS CLASES


    // y el método *(podemos agregar todos los que sean necesarios 
    // para posicionamiento en la web del proyecto)
    async formLayoutsPage(){
    //  await this.page.getByText('Forms').click()        // THIS representa al objeto actual con lo que 
                                                          // this.page representará el page de nuestro objeto*
                                                          // instanciado de la clase NavigationPage
                                                          //
                                                          // Hemos comentado la llamada ya que ahora será realizada
                                                          // solo si el menú esta cerrado (evitando que se vuelva a
                                                          // cerrar en caso e que esté abierto) 
                                                          // *Haremos lo mismo para cada una de las llamadas

        await this.selectGroupMenuItem('Forms')

        await this.page.getByText('Form Layouts').click()  // forma no recomendada por PW **

        await this.waitForNumberOfSeconds(4)   // ** aquí vemos como ya podemos disponer de los métodos 
                                               // ** de la clase heredada (en este caso HelperBase())
    }


    // Sumaremos más ejemplos de Navegación utilizando nuestro proyecto
    // Cogeremos para ello las localizaciones realizadas anteriormente
    // (contenidas en el fichero uiComponens) y sumándole a las órdenes
    // this. para que apunten al objeto que se haya creado para llamarlos

    async datePickerPage(){

        // await this.page.getByText('Forms').click()   // Esta orden ya no es necesaria ya que utilizaremos 
                                                        // la función creada selectGroupMenuItem()
        await this.selectGroupMenuItem('Forms')

        await this.page.getByText('Datepicker').click()  // **

    }


    
    async smartTablePage(){

        // await this.page.getByText('Tables & Data').click()  // *

        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()  // **

    }


    
    async toastrPage(){

        // await this.page.getByText('Modal & Overlays').click()   // *

        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()   // **


    }


    
    async toolTipPage(){

        // await this.page.getByText('Modal & Overlays').click()   // *

        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()  // **

    }


    // Definimos la función como privada ya que solo será utilizada dentro
    // de NavigationPage.  Será llamada adjuntando el parámetro que indicará
    // cuál es el menú que se quiere analizar para ver si está o no desplegado
    // (esto para evitar que si está desplegado al llamarlo con un clic este
    // se vuelva a cerrar)
    private async selectGroupMenuItem(gruopItemTitle: string){

        // Primero recuperamos el item del menú (según sea la llamada)
        const groupMenuItem = this.page.getByTitle(gruopItemTitle)

        // Luego según el menú solicitado extraemos el parámetro "aria-expanded"
        // para ver si está o no desplegado
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        // y finalmente ya podemos realizar nuestra lógica para actuar solo
        // si el menú está aún cerrado
        if(expandedState  == "false")
            await groupMenuItem.click()
    }

} 