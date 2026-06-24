import { Page, expect } from "@playwright/test";

export class HelperBase {

    readonly page: Page

    constructor(page: Page){

        this.page = page
        
    }

    // crearemos un ejemplo con este time out, que luego será llamado mediante el
    // uso de la clase "heredada"
    async waitForNumberOfSeconds(timeInSeconds: number){

        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}