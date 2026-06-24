import {Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


// Utilizaremos también la keyword "export" 
// para hacer nuestra clase visible para otros ficheros
export class FormLayoutsPage extends HelperBase{

    // Esta vez definiremos el campo page como privado
    // private readonly page: Page   // REMOVIDO AL APLICAR LA HERENCIA


    // constructor MODIFICADO POR AGREGAR LA HERENCIA
    constructor(page: Page){
        //this.page = page
        super(page)
        
    }


    // No importa lo largo del nombre de un método ya que luego será
    // fácilmente reconocible gracias a ello
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){

            const usingTheGridEmailInput = this.page.locator('nb-card', {hasText: "Using the Grid"})
            await usingTheGridEmailInput.getByRole('textbox', {name: "Email"}).fill(email)
            await usingTheGridEmailInput.getByRole('textbox', {name: "Password"}).fill(password)
            await usingTheGridEmailInput.getByRole('radio', {name:optionText}).check({force: true})
            await usingTheGridEmailInput.getByRole('button').click()

    }


    // Crearemos un nuevo método para realizar tests en el campo InLine

    // Podemos sumar una descripción del método utilizando "/**"  que generará un detalle de los parámetros del método

    /**
     * Esta es la descripción del método que incluye el InLine Form
     * @param name        - Nombre del usuario
     * @param email       - email usuario
     * @param rememberMe  - parámetro booleno para el checkbox del formulario
     */
    async submitInLineFormWithNameEmailAndCheckBox(name: string, email: string, rememberMe: boolean ){

            const inLineForm = this.page.locator('nb-card', {hasText: "Inline form"})
            await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)  //Buscamos el input que contiene "Jane Doe"
            await inLineForm.getByRole('textbox', {name: "Email"}).fill(email)

            if(rememberMe)
                await inLineForm.getByRole('checkbox').check({force: true})

            await inLineForm.getByRole('button').click()


    }




}