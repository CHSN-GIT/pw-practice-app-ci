import { Page, expect } from "@playwright/test";


// Aquí haremos la importación de todas nuestras clases creadas (sin importar la cantidad)
import { NavigationPage } from "../page-objects/navigationPage"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatePickerPage } from "../page-objects/datepickerPage"



export class PageManager {

    private readonly page: Page

    // Sumado a nuestro campo page debemos crear un campo para cada uno de las clases importadas
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor(page: Page){

        this.page = page
        
        // luego debemos crear en el constructor una instancia para cada una de las clases
        // esta vez asociando el mismo obtejo que usa esta clase para de esta manera dejar
        // la instancia relacionada al mismo objeto (si no se asigna VSC nos refleja el error)
        this.navigationPage = new NavigationPage(page)
        this.formLayoutsPage = new FormLayoutsPage(page)
        this.datePickerPage = new DatePickerPage(page)
        
    }



    // Luego debemos crear un método para cada una de las instancias que creamos en los test.
    // Este método debe devolver el objeto correspondiente a cada clase
    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatePickerPage(){
        return this.datePickerPage
    }


}

