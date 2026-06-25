/* ||||| EN ESTE FICHERO SEGUIREMOS LA CLASE ESPECÍFICA DE ÉL ||||| */
/* PARA ELLO LIMPIAREMOS EL FICHERO DE CONFIGURACIONES INNECESARIAS */

import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'; 

import dotenv from 'dotenv';
import path from 'path';
import { url } from 'inspector';

// Determinamos el entorno (por defecto local)
const environment = process.env.ENV || 'local'; // Si process.env.ENV no tiene valor se le asigna 'local', en caso contrario
                                                // continúa con el valor que tenga (asignado p.e. en la ejecución) y este 
                                                // se le asigna a su vez a environment 

console.log("environment", environment)
console.log("process.env.ENV", process.env.ENV)

// Carga el archivo correspondiente de .env => .env."entorno"
dotenv.config({
  path: path.resolve(__dirname, `.env.${environment}`),
});


export default defineConfig<TestOptions>({   

  timeout: 30000,
  // globalTimeout: 60000,   // Como el test en Docker se ejecutará más lentamente no necesitamos ya este timeout

  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 250}
  },

  retries: 1,

  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ['allure-playwright'],
    ['html']
  ],

  use: {

    globalsQaURL: 'https://globalsqa.com/demo-site/draganddrop/',

    // baseURL: 'http://localhost:4200/',

    baseURL 
           : process.env.ENV === 'stg' ?  'http://localhost:4203/'
	         : process.env.ENV === 'dev' ?  'http://localhost:4201/'
           : process.env.ENV === 'local' ?  'http://localhost:4200/'
           : 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode:'off',
      size: {width:1920, height: 1080}  // Full HD
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        browserName: 'chromium'
      },
      
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { 
        ...devices['Galaxy Tab S9'],
        // en vez de utilizar "...devices" tambien podemos definir 
        // el tamaño del dispositivo manualmente
        // a través de la opción viewport de la sgte forma:
            // viewport: {width: 400, height: 800}
      },
    }, 

    {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'],
          browserName: 'firefox'
        }
      
   },

    // {
    //   name: 'stg',
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4202/'
    //    },
    // },

    // {
    //   name: 'local',
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4200/'
    //    },
    // },

  ],

  // DOCKER -> utilizaremos la configuración de "webserver" para agilizar el funcionamiento de nuestro test
  //          En esta configuración incluiremos la ejecución de nuestro proyecto para que playWright lo haga por nosotros
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 180000, // <-- antes 60000 (1min) por defecto, ahora 3min (al tardar más con la Docker es conveniente aumentarlo)
  }

});

