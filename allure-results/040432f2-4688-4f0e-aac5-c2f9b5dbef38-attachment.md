# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\visualTest.spec.ts >> Form Layouts page >> Visual Test Radio Buttons
- Location: tests\visualTest.spec.ts:18:10

# Error details

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('nb-card').filter({ hasText: 'Using the Grid' })
  176 pixels (ratio 0.01 of all image pixels) are different.

Call log:
  - Expect "toHaveScreenshot" with timeout 2000ms
    - verifying given screenshot expectation
  - waiting for locator('nb-card').filter({ hasText: 'Using the Grid' })
    - locator resolved to <nb-card _nghost-xlp-c98="" _ngcontent-xlp-c290="">…</nb-card>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 176 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('nb-card').filter({ hasText: 'Using the Grid' })
    - locator resolved to <nb-card _nghost-xlp-c98="" _ngcontent-xlp-c290="">…</nb-card>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 176 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [ref=e7]:
  - navigation [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - link [ref=e13] [cursor=pointer]:
            - /url: "#"
            - img [ref=e15]
          - link "PW-test" [ref=e23] [cursor=pointer]:
            - /url: "#"
        - button "Light" [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: Light
          - img [ref=e28]
      - generic [ref=e34]:
        - button [ref=e37] [cursor=pointer]:
          - img [ref=e39]
        - link [ref=e45] [cursor=pointer]:
          - /url: "#"
          - img [ref=e47]
        - link [ref=e53] [cursor=pointer]:
          - /url: "#"
          - img [ref=e55]
        - generic [ref=e65] [cursor=pointer]: Nick Jones
  - generic [ref=e66]:
    - list [ref=e71]:
      - listitem [ref=e72]:
        - link "IoT Dashboard" [ref=e73] [cursor=pointer]:
          - /url: /pages/iot-dashboard
          - img [ref=e75]
          - generic: IoT Dashboard
      - listitem [ref=e80]:
        - generic [ref=e81]: FEATURES
      - listitem [ref=e82]:
        - link "Forms" [expanded] [ref=e83] [cursor=pointer]:
          - /url: "#"
          - img [ref=e85]
          - generic: Forms
          - img [ref=e92]
        - list [ref=e97]:
          - listitem [ref=e98]:
            - link "Form Layouts" [ref=e99] [cursor=pointer]:
              - /url: /pages/forms/layouts
              - generic: Form Layouts
          - listitem [ref=e100]:
            - link "Datepicker" [ref=e101] [cursor=pointer]:
              - /url: /pages/forms/datepicker
              - generic: Datepicker
      - listitem [ref=e102]:
        - link "Modal & Overlays" [ref=e103] [cursor=pointer]:
          - /url: "#"
          - img [ref=e105]
          - generic: Modal & Overlays
          - img [ref=e113]
        - list:
          - listitem [ref=e118]:
            - link "Dialog" [ref=e119] [cursor=pointer]:
              - /url: /pages/modal-overlays/dialog
              - generic: Dialog
          - listitem [ref=e120]:
            - link "Window" [ref=e121] [cursor=pointer]:
              - /url: /pages/modal-overlays/window
              - generic: Window
          - listitem [ref=e122]:
            - link "Popover" [ref=e123] [cursor=pointer]:
              - /url: /pages/modal-overlays/popover
              - generic: Popover
          - listitem [ref=e124]:
            - link "Toastr" [ref=e125] [cursor=pointer]:
              - /url: /pages/modal-overlays/toastr
              - generic: Toastr
          - listitem [ref=e126]:
            - link "Tooltip" [ref=e127] [cursor=pointer]:
              - /url: /pages/modal-overlays/tooltip
              - generic: Tooltip
      - listitem [ref=e128]:
        - link "Extra Components" [ref=e129] [cursor=pointer]:
          - /url: "#"
          - img [ref=e131]
          - generic: Extra Components
          - img [ref=e140]
        - list:
          - listitem [ref=e145]:
            - link "Calendar" [ref=e146] [cursor=pointer]:
              - /url: /pages/extra-components/calendar
              - generic: Calendar
      - listitem [ref=e147]:
        - link "Charts" [ref=e148] [cursor=pointer]:
          - /url: "#"
          - img [ref=e150]
          - generic: Charts
          - img [ref=e157]
        - list:
          - listitem [ref=e162]:
            - link "Echarts" [ref=e163] [cursor=pointer]:
              - /url: /pages/charts/echarts
              - generic: Echarts
      - listitem [ref=e164]:
        - link "Tables & Data" [ref=e165] [cursor=pointer]:
          - /url: "#"
          - img [ref=e167]
          - generic: Tables & Data
          - img [ref=e176]
        - list:
          - listitem [ref=e181]:
            - link "Smart Table" [ref=e182] [cursor=pointer]:
              - /url: /pages/tables/smart-table
              - generic: Smart Table
          - listitem [ref=e183]:
            - link "Tree Grid" [ref=e184] [cursor=pointer]:
              - /url: /pages/tables/tree-grid
              - generic: Tree Grid
      - listitem [ref=e185]:
        - link "Auth" [ref=e186] [cursor=pointer]:
          - /url: "#"
          - img [ref=e188]
          - generic: Auth
          - img [ref=e195]
        - list:
          - listitem [ref=e200]:
            - link "Login" [ref=e201] [cursor=pointer]:
              - /url: /auth/login
              - generic: Login
          - listitem [ref=e202]:
            - link "Register" [ref=e203] [cursor=pointer]:
              - /url: /auth/register
              - generic: Register
          - listitem [ref=e204]:
            - link "Request Password" [ref=e205] [cursor=pointer]:
              - /url: /auth/request-password
              - generic: Request Password
          - listitem [ref=e206]:
            - link "Reset Password" [ref=e207] [cursor=pointer]:
              - /url: /auth/reset-password
              - generic: Reset Password
    - generic [ref=e208]:
      - generic [ref=e212]:
        - generic [ref=e215]:
          - generic [ref=e216]: Inline form
          - generic [ref=e218]:
            - textbox "Jane Doe" [ref=e219]
            - textbox "Email" [ref=e220]
            - generic [ref=e222]:
              - checkbox "Remember me" [ref=e223]
              - generic [ref=e225]: Remember me
            - button "Submit" [ref=e226] [cursor=pointer]
        - generic [ref=e227]:
          - generic [ref=e228]:
            - generic [ref=e229]:
              - generic [ref=e230]: Using the Grid
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - generic [ref=e234]: Email
                  - textbox "Email" [ref=e236]
                - generic [ref=e237]:
                  - generic [ref=e238]: Password
                  - textbox "Password" [ref=e240]
                - generic [ref=e241]:
                  - generic [ref=e242]: Radios
                  - generic [ref=e244]:
                    - generic [ref=e246]:
                      - radio "Option 1" [ref=e247]
                      - generic [ref=e250]: Option 1
                    - generic [ref=e252]:
                      - radio "Option 2" [checked] [active] [ref=e253]
                      - generic [ref=e256]: Option 2
                    - generic [ref=e258]:
                      - radio "Disabled Option" [disabled] [ref=e259]
                      - generic [ref=e262]: Disabled Option
                - button "Sign in" [ref=e265] [cursor=pointer]
            - generic [ref=e266]:
              - generic [ref=e267]: Form without labels
              - generic [ref=e269]:
                - textbox "Recipients" [ref=e271]
                - textbox "Subject" [ref=e273]
                - textbox "Message" [ref=e275]
                - button "Send" [ref=e276] [cursor=pointer]
          - generic [ref=e277]:
            - generic [ref=e278]:
              - generic [ref=e279]: Basic form
              - generic [ref=e281]:
                - generic [ref=e282]:
                  - generic [ref=e283]: Email address
                  - textbox "Email address" [ref=e284]:
                    - /placeholder: Email
                - generic [ref=e285]:
                  - generic [ref=e286]: Password
                  - textbox "Password" [ref=e287]
                - generic [ref=e290]:
                  - checkbox "Check me out" [ref=e291]
                  - generic [ref=e293]: Check me out
                - button "Submit" [ref=e294] [cursor=pointer]
            - generic [ref=e295]:
              - generic [ref=e296]: Block form
              - generic [ref=e297]:
                - generic [ref=e298]:
                  - generic [ref=e300]:
                    - generic [ref=e301]: First Name
                    - textbox "First Name" [ref=e302]
                  - generic [ref=e304]:
                    - generic [ref=e305]: Last Name
                    - textbox "Last Name" [ref=e306]
                - generic [ref=e307]:
                  - generic [ref=e309]:
                    - generic [ref=e310]: Email
                    - textbox "Email" [ref=e311]
                  - generic [ref=e313]:
                    - generic [ref=e314]: Website
                    - textbox "Website" [ref=e315]
                - button "Submit" [ref=e316] [cursor=pointer]
        - generic [ref=e319]:
          - generic [ref=e320]: Horizontal form
          - generic [ref=e322]:
            - generic [ref=e323]:
              - generic [ref=e324]: Email
              - textbox "Email" [ref=e326]
            - generic [ref=e327]:
              - generic [ref=e328]: Password
              - textbox "Password" [ref=e330]
            - generic [ref=e335]:
              - checkbox "Remember me" [ref=e336]
              - generic [ref=e338]: Remember me
            - button "Sign in" [ref=e341] [cursor=pointer]
      - navigation [ref=e343]:
        - generic [ref=e344]:
          - generic [ref=e345]:
            - text: Created with ♥ by
            - link "Akveo" [ref=e347] [cursor=pointer]:
              - /url: https://akveo.page.link/8V2f
            - text: "2019"
          - generic [ref=e348]:
            - link "" [ref=e349] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e350] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e351] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e352] [cursor=pointer]:
              - /url: "#"
```

# Test source

```ts
  1  | import {test, expect } from "@playwright/test";
  2  | 
  3  | 
  4  | test.describe('Form Layouts page', () => {
  5  | 
  6  |     // Redefinición de los reintentos en caso de error
  7  |     test.describe.configure({retries: 0})
  8  |     // test.describe.configure({mode: 'parallel'})
  9  |     test.describe.configure({mode: 'serial'})
  10 | 
  11 |     test.beforeEach(async({page}) => {
  12 |         await page.goto('/')
  13 |         await page.getByText('Forms').click()
  14 |         await page.getByText('Form Layouts').click()
  15 |     })
  16 | 
  17 | 
  18 |     test.only('Visual Test Radio Buttons', async({page}) => {
  19 | 
  20 |         // Identificamos la zona general donde está incluído el radio button que queremos tratar
  21 |         const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
  22 |         
  23 |         // Vamos directamente a la "opción 1" y la elegimos mediante la función check()
  24 |         await usingTheGridForm.getByLabel('Option 2').check({force: true})
  25 | 
  26 |         // con esta orden podremos luego confirmar si el check está o no activo asignando el resultado booleano a radioStatus
  27 |         const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
  28 | 
  29 | 
  30 |         // *** Reemplazaremos esta comprobación por una visual *** //
  31 | 
  32 |                     // // para comprobarlo utilizaremos la aserción expect() junto a la función toBeTruthy()
  33 |                     // expect(radioStatus).toBeTruthy()
  34 |                     // // Otra manera de realizar esta prueba utilizando la función toBeChecked() es la sgte:
  35 |                     // await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()
  36 | 
  37 |         // Con esta orden y antes de continuar, lanzaremos el test para que playwright almacene la imagen a comparar (Baseline)
> 38 |         await expect(usingTheGridForm).toHaveScreenshot()
     |                                        ^ Error: expect(locator).toHaveScreenshot(expected) failed
  39 |         
  40 | 
  41 |     })
  42 | 
  43 | })
  44 | 
```