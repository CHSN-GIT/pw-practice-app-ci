import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string   // fixture que nos ayudará a situar el test en esta página específica del sitio web
    pageManager: PageManager  // creamos la instancia de nuestro propio PageManager por medio de las fixtures para reemplazar
                              // las llamadas a él en el test (pm) y mejorar el rendimiento de estos
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    // formLayoutsPage: [async({page}, use) => {  // ahora creamos la función que realizará el fixture dentro del objeto

    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()

    //     await use('') // Para que podamos usar este fixture debemos utilizar la keyword "use()" poniendo en ella 
    //                   // el argumento pero como en nuestro ejemplo no lo utilizaremos lo dejamos con un espacio en blanco

    // }, {auto: true}],  // cambiamos la definición de nuestra fixture al tipo "array" para poder utilizar las opciones que ello
    //                   // nos brinda, de esta manera utilizamos la opción auto (para definir si es ejecutada o no automaticamente)
    //                   // y le asignamos un TRUE, así serña lo primero que se realice en el test donde importemos estas opciones


    formLayoutsPage: async({page}, use) => {  // ahora quitaremos el automático y llamaremos a esta fixture desde nuestra fixture pageManager
        
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

        await use('') // todo lo que se defina tras esta línea (de "use") se ejecutará una vez acabado el test

        console.log('Tear Down Line')

    }, 

    // pageManager: async({page}, use) => {

    pageManager: [async({page, formLayoutsPage}, use) => {   // reemplazamos la definición de nuesta fixture incluyendo ahora en ella la llamada a formLayoutsPage

        const pm = new PageManager(page)   // traemos la invocación al PageManager del test a nuestra fixture

        await use(pm)

    }, {auto: true}],  // además de invocar a formLayoutsPage defino la función como "auto" para ganar velocidad en el test (en mi portatil gano un segundo y pico o así)
})





