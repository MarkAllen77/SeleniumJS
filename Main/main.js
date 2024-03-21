import { Builder, By, Key, until } from 'selenium-webdriver'
import { strictEqual, equal } from 'assert'
import { writeFileSync } from 'fs'
const driver = new Builder().forBrowser('chrome').build()

// const chrome = require('selenium-webdriver/chrome')
// const options = new chrome.Options()
// options.addArguments('--ignore-certificate-errors')
// options.addArguments('--allow-running-insecure-content')
// options.addArguments('excludeSwitches', ['enable-logging'])
// const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

let originalWindow

async function HandleInputandRadio()
{   
    await driver.get('https://demoqa.com/automation-practice-form')

    const firstnameInput = await driver.findElement(By.xpath('//input[@id="firstName"]'))
    const lastnameInput = await driver.findElement(By.xpath('//input[@id="lastName"]'))
  
    await firstnameInput.sendKeys('John')
    await lastnameInput.sendKeys('Doe')

    console.log('Firstname value: ', await firstnameInput.getAttribute('value'))

    strictEqual(await firstnameInput.getAttribute('value'), 'John')


    const genderMaleLabel = await driver.findElement(By.xpath('//label[normalize-space()="Male"]'))
    const genderFemaleLabel = await driver.findElement(By.xpath('//label[normalize-space()="Female"]'))

    const genderMaleRadiobutton = await driver.findElement(By.xpath('//input[@id="gender-radio-1"]'))
    const genderFemaleRadiobutton = await driver.findElement(By.xpath('//input[@id="gender-radio-2"]'))

    await genderMaleLabel.click()

    console.log('Male radio: ', await genderMaleRadiobutton.isSelected())
    console.log('Female radio: ', await genderFemaleRadiobutton.isSelected())


    const hobbiesSportsLabel= await driver.findElement(By.xpath('//label[normalize-space()="Sports"]'))
    const hobbiesReadingLabel = await driver.findElement(By.xpath('//label[normalize-space()="Reading"]'))
    const hobbiesMusicLabel = await driver.findElement(By.xpath('//label[normalize-space()="Music"]'))

    const hobbiesSportsCheckbox= await driver.findElement(By.xpath('//input[@id="hobbies-checkbox-1"]'))
    await hobbiesSportsLabel.click()
    console.log('Sports box: ', await hobbiesSportsCheckbox.isSelected())

    await hobbiesSportsLabel.click()
    await hobbiesReadingLabel.click()
    await hobbiesMusicLabel.click()

    console.log('Sports box: ', await hobbiesSportsCheckbox.isSelected())
}


async function HandleDropdown()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    await driver.wait(until.elementLocated(By.xpath('//select[@id="country"]')), 5000)

    await driver.findElement({id: 'country'})
    await driver.sleep(1000)
    await driver.findElement({id: 'country'}).sendKeys('Japan')

    const countryDropdown = await driver.findElement(By.xpath('//select[@id="country"]'))
    await countryDropdown.click()
    await countryDropdown.findElement(By.xpath('//option[@value="india"]')).click()
    await countryDropdown.click()

    console.log(await countryDropdown.getAttribute('value'))

    equal(await countryDropdown.getAttribute('value'),'india')

    await driver.findElement(By.css('#country > option:nth-child(6)')).click();
}


async function HandleMultiDropdown()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    const colorsSelect = await driver.findElement(By.xpath('//select[@id="colors"]'))

    driver.executeScript("arguments[0].scrollIntoView()", colorsSelect);

    const colorsSelectItems = await driver.findElements(By.xpath('//select[@id="colors"]//option'))
    let colorsSelectItemsLength = await colorsSelectItems.length

    console.log('Number of options: ', colorsSelectItemsLength)
    const colorsArray = ['blue','red','yellow']
    for (let item of colorsSelectItems)
    {
        if (colorsArray.includes(await item.getAttribute('value')))
        {
            console.log(await item.getAttribute('value'))  
            await item.click()  
        }
    }
}


async function HandleBootstrapDropdown()
{
    await driver.get('https://www.jquery-az.com/boots/demo.php?ex=63.0_2')

    const outputButton = await driver.findElement(By.xpath('//button'))
    const outputOptions = await driver.findElements(By.xpath('//ul//li//label//input'))

    let outputOptionsLength = await outputOptions.length
    console.log('Number of options: ', outputOptionsLength)

    await outputButton.click()

    for (let item of outputOptions)
    {
        const value = await item.getAttribute('value')
        if (value.includes('Angular') || value.includes('Java'))
        {
            console.log(await item.getAttribute('value'))
            await item.click()
            console.log(await item.isSelected())
        }

        if (value.includes('HTML') || value.includes('CSS'))
        {
            console.log(await item.getAttribute('value'))
            await item.click()
            console.log(await item.isSelected())
        }       
    }
}


async function HandleAutoSuggestion()
{
    await driver.get('https://www.redbus.in/')

    const autoDropdown = await driver.findElement(By.xpath('//input[@id="src"]'))

    await autoDropdown.sendKeys('Delhi')

    // await driver.sleep(2000)        
    await driver.wait(until.elementLocated(By.xpath('//li[contains(@class,"sc-iwsKbI")]/div/text[1]')), 3000)

    let autoDropDownOptions = await driver.findElements(By.xpath('//li[contains(@class,"sc-iwsKbI")]/div/text[1]'))

    for (let option of autoDropDownOptions)
    {
        let value = await option.getAttribute('innerText')
        console.log(value)

        if (value.includes('RK Ashram'))
        {
            await option.click()
            break;
        }
    }
}


async function HandleHiddenItems()
{
    await driver.get('https://opensource-demo.orangehrmlive.com/')

    await driver.wait(until.elementLocated(By.xpath('//input[@name="username"]')), 5000)

    const usernameInput = await driver.findElement(By.xpath('//input[@name="username"]'))
    const passwordInput = await driver.findElement(By.xpath('//input[@name="password"]'))
    const submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'))

    await usernameInput.sendKeys('Admin')
    await passwordInput.sendKeys('admin123')
    // await submitButton.click()
}


async function HandleDialogsAlerts()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    const alertButton = await driver.findElement(By.xpath('//button[text()="Alert"]'))
    const confirmButton = await driver.findElement(By.xpath('//button[text()="Confirm Box"]'))
    const promptButton = await driver.findElement(By.xpath('//button[text()="Prompt"]'))
    const promptMessage = await driver.findElement(By.xpath('//p[@id="demo"]'))

    await alertButton.click()
    await driver.sleep(2000)  
    await driver.wait(until.alertIsPresent());   
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(alertText)
    await alert.accept();

    await confirmButton.click()
    await driver.sleep(2000)  
    await driver.wait(until.alertIsPresent());
    let confirm = await driver.switchTo().alert();
    let confirmText = await confirm.getText();
    console.log(confirmText)
    await confirm.dismiss();

    await promptButton.click()
    await driver.sleep(1000)  
    await driver.wait(until.alertIsPresent());
    let prompt = await driver.switchTo().alert();
    await prompt.sendKeys("Selenium4");
    await driver.sleep(2000) 
    await prompt.accept();
    let value = await promptMessage.getText()
    console.log(value)

    equal(value,'Hello Selenium4! How are you today?')
}


async function HandleFramesiFrames()
{
    await driver.get('https://ui.vision/demo/webtest/frames/')

    driver.wait(async function() {
        const readyState = await driver.executeScript('return document.readyState')
        return readyState === 'complete'
    });

    const frameWindow = await driver.findElements(By.xpath('//frame'))
    console.log('Number of frames: ', frameWindow.length)

    //approach 1: using locator
    await driver.switchTo().defaultContent()
    const frame1 = await driver.findElement(By.xpath('//frame[@src="frame_1.html"]'))
    await driver.switchTo().frame(frame1)
    const frame1Input = await driver.findElement(By.xpath('//input[@name="mytext1"]'))
    await frame1Input.sendKeys('This is frame 1')

    //approach 2: using index
    await driver.switchTo().defaultContent()
    await driver.switchTo().frame(4)
    const frame5Input = await driver.findElement(By.xpath('//input[@name="mytext5"]'))
    await frame5Input.sendKeys('This is frame 5')

    //nested
    await driver.switchTo().defaultContent()
    const frame3 = await driver.findElement(By.xpath('//frame[@src="frame_3.html"]'))
    await driver.switchTo().frame(frame3)
    const frame3Input = await driver.findElement(By.xpath('//input[@name="mytext3"]'))
    await frame3Input.sendKeys('This is frame 3')

    const iframe = driver.findElement(By.css('iframe'))
    await driver.switchTo().frame(iframe)
    const frame3Radio = await driver.findElement(By.xpath('//div[@id="i5"]/div[3]/div'))
    driver.executeScript("arguments[0].scrollIntoView()", frame3Radio)
    driver.sleep(2000)
    await frame3Radio.click()
}


async function HandleWebTablePagination()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    let tableLabel = await driver.findElement(By.xpath('//h2[text()="Pagination Table"]'))
    driver.executeScript("arguments[0].scrollIntoView()", tableLabel)

    let paginationTable = await driver.findElement(By.xpath('//table[@id="productTable"]'))
    let columns = await paginationTable.findElements(By.css('thead tr th'))
    let rows = await paginationTable.findElements(By.css('tbody tr'))

    let rowsCells = await paginationTable.findElements(By.css('tbody tr td'))

    console.log('Number of columns: ', columns.length)
    console.log('Number of rows: ', rows.length)

    //select checkbox
    let matchedRow = await driver.findElement(By.xpath('//td[text()="Product 2"]//following-sibling::td//input'))
    await matchedRow.click()

    selectProduct("Product 4")
    selectProduct("Product 5")

    let rowArray = []
    let index = 0

    for (let elements of rowsCells) {
        rowArray[index] = await elements.getText()

        index++
        if (index == 4){
            console.log(rowArray)
            index = 0
        }
    }

    let pages = await driver.findElements(By.xpath('//ul[@id="pagination"]//li//a'))
    for (let page of pages) {
        console.log(await page.getText())
        page.click()

        rows = await paginationTable.findElements(By.css('tbody tr'))
        for (let elements of rows) {
            console.log(await elements.getText())
        }
    }
}


async function selectProduct(productName){
    const matchedRow = await driver.findElement(By.xpath('//td[text()="'+ productName +'"]//following-sibling::td//input'))
    await matchedRow.click()
}


async function HandleDatePickers()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    let colorsLabel = await driver.findElement(By.xpath('//label[text()="Colors:"]'))
    driver.executeScript("arguments[0].scrollIntoView()", colorsLabel)
    
    //direct type date
    let datePicker = await driver.findElement(By.xpath('//input[@id="datepicker"]'))
    await datePicker.click()
    await datePicker.sendKeys('12/12/2023')
    await driver.actions().keyDown(Key.TAB).perform()

    //using date picker
    const dateString  = '3/15/2024'
    const dateStringSplit = dateString.split('/')
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const month = monthName[dateStringSplit[0]-1]
    const day = dateStringSplit[1]
    const year = dateStringSplit[2]

    await datePicker.click()
    while(true)
    {
        const displayedYear = await driver.findElement(By.xpath('//span[@class="ui-datepicker-year"]')).getText()
        const displayedMonth = await driver.findElement(By.xpath('//span[@class="ui-datepicker-month"]')).getText()

        if(displayedYear == year && displayedMonth == month)
        {
            break;
        }

        await driver.findElement(By.xpath('//span[text()="Next"]')).click()
    }

    await driver.findElement(By.xpath('//a[@class="ui-state-default"][text()="' + day + '"]')).click()
    await driver.actions().keyDown(Key.TAB).perform()

    await driver.sleep(2000)
}


async function HandleMouseActions()
{
    // //-----How to handle Mouse Hover-----
    // await driver.get('https://demo.opencart.com/')

    // let desktopsLabel = await driver.findElement(By.xpath('//a[text()="Desktops"]'))
    // let macLabel = await driver.findElement(By.xpath('//a[text()="Mac (1)"]'))

    // const actions = driver.actions({async: true})
    // await actions.move({origin: desktopsLabel}).perform()
    // await actions.move({origin: macLabel}).perform()

    // await driver.sleep(2000)

    //-----How to handle Mouse Right Click-----
    await driver.get('https://swisnl.github.io/jQuery-contextMenu/demo.html')
    
    const buttonRightClick = await driver.findElement(By.xpath('//span[@class="context-menu-one btn btn-neutral"]'))
    let actions = driver.actions({async: true})
    await actions.contextClick(buttonRightClick).perform()

    const pasteContext = await driver.findElement(By.xpath('//span[normalize-space()="Paste"]'))
    await actions.move({origin: pasteContext}).perform()

    await driver.sleep(2000)

    //-----How to handle Mouse Double Click-----
    await driver.get('https://testautomationpractice.blogspot.com/')
    
    const buttonDoubleClick = await driver.findElement(By.xpath('//button[text()="Copy Text"]'))
    actions = driver.actions({async: true})
    await actions.doubleClick(buttonDoubleClick).perform()

    const field1 = await driver.findElement(By.xpath('//input[@id="field1"]')).getAttribute('value')
    console.log("Text is: ", field1)

    const field2 = await driver.findElement(By.xpath('//input[@id="field2"]')).getAttribute('value')
    strictEqual(field1, field2)

    //-----How to handle Mouse Drag and Drop-----
    const draggable = driver.findElement(By.xpath('//div[@id="draggable"]'))
    const droppable = driver.findElement(By.xpath('//div[@id="droppable"]'))

    actions = driver.actions({async: true})
    await actions.dragAndDrop(draggable, droppable).perform()
}


async function HandleKeyboardActions()
{
    await driver.get('https://gotranscript.com/text-compare/')

    const fromTextArea = await driver.findElement(By.xpath('//textarea[@name="text1"]'))
    const toTextArea = await driver.findElement(By.xpath('//textarea[@name="text2"]'))
    const buttonCompare = await driver.findElement(By.xpath('//button[@id="recaptcha"]'))

    await fromTextArea.sendKeys('Hello World was here')
    await fromTextArea.click()

    await driver.actions()
        .keyDown(Key.CONTROL)
        .sendKeys('a')
        .keyDown(Key.CONTROL)
        .sendKeys('c')
        .perform()

    await toTextArea.click()
    await driver.actions()
        .keyDown(Key.CONTROL)
        .sendKeys('v')
        .perform()

    await buttonCompare.click()
    await driver.sleep(2000)
}


async function HandleUploadFiles()
{
    try {
        await driver.sleep(2000)
        await driver.get('https://www.foundit.in/')
        await driver.wait(until.elementLocated(By.xpath('//i[@class="mqfihd-upload"]')), 6000)

        //upload single file
        const uploadButton = await driver.findElement(By.xpath('//i[@class="mqfihd-upload"]'))
        const windowsUpload = await driver.findElement(By.xpath('//input[@id="file-upload"]'))

        await uploadButton.click()
        await windowsUpload.sendKeys('C:/Temp/sample1.txt')
    }
    catch (err) {
        
    }

    //upload mulitple file
    await driver.get('https://davidwalsh.name/demo/multiple-file-upload.php')

    let noFilesLabel = await driver.findElement(By.xpath('//ul[@id="fileList"]/li')).getText()
    equal(noFilesLabel,'No Files Selected')

    const filesToUploadButton = await driver.findElement(By.xpath('//input[@id="filesToUpload"]'))
    await filesToUploadButton.sendKeys("C:/Temp/sample1.txt \n C:/Temp/sample2.txt");

    const fileName1 = await driver.findElement(By.xpath('//ul[@id="fileList"]/li[1]')).getText()
    const fileName2 = await driver.findElement(By.xpath('//ul[@id="fileList"]/li[2]')).getText()

    equal(fileName1,'sample1.txt')
    equal(fileName2,'sample2.txt')
}


async function HandlePagesWindows()
{
    await driver.get('https://opensource-demo.orangehrmlive.com/')
    originalWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'OrangeHRM')

    await driver.switchTo().newWindow('tab')
    await driver.get('https://www.orangehrm.com/')
    const tabWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'Human Resources Management Software | OrangeHRM')

    await driver.switchTo().newWindow('window')
    await driver.get('https://www.google.com/')
    const newWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'Google')
    await driver.sleep(2000)
    await driver.close()

    console.log('Original Window: ', originalWindow)
    console.log('Tab Window: ', tabWindow)
    console.log('New Window: ', newWindow)

    const totalWindows = (await driver.getAllWindowHandles()).length
    console.log('Number of Window(s): ', totalWindows)

    await driver.switchTo().window(tabWindow)
    await driver.sleep(1000)
    await driver.close()

    await driver.switchTo().window(originalWindow)
    await driver.sleep(2000)
}


async function HandleMultiplePagesWindows()
{
    //Original Window
    await driver.get('https://opensource-demo.orangehrmlive.com/')
    originalWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'OrangeHRM')

    await driver.wait(until.elementsLocated(By.xpath('//a[text()="OrangeHRM, Inc"]')), 10000)

    const orangeLink = await driver.findElement(By.xpath('//a[text()="OrangeHRM, Inc"]'))
    await orangeLink.click()

    //New Tab   
    const openWindows = await driver.getAllWindowHandles();
    await driver.switchTo().window(openWindows[1]);

    const tabWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'OrangeHRM HR Software | OrangeHRM')

    //New Window
    await driver.switchTo().newWindow('window')
    await driver.get('https://www.google.com/')
    const newWindow = await driver.getWindowHandle()
    equal(await driver.getTitle(),'Google')
    await driver.sleep(2000)

    console.log('Original Window: ', originalWindow)
    console.log('Tab Window: ', tabWindow)
    console.log('New Window: ', newWindow)

    const totalWindows = (await driver.getAllWindowHandles()).length
    console.log('Number of Window(s): ', totalWindows)

    await driver.switchTo().window(originalWindow)
    const usernameInput = await driver.findElement(By.xpath('//input[@name="username"]'))
    usernameInput.sendKeys('username123')
    await driver.sleep(3000)
 
    await driver.switchTo().window(tabWindow)
    const emailInput = await driver.findElement(By.xpath('//input[@id="Form_submitForm_EmailHomePage"]'))
    emailInput.sendKeys('username123@email.com')
    await driver.sleep(3000)

    await driver.switchTo().window(newWindow)
    const searchInput = await driver.findElement(By.xpath('//textarea[@name="q"]'))
    searchInput.sendKeys('selenium node')
    await driver.sleep(3000)
    await driver.close()

    await driver.switchTo().window(originalWindow)
}


async function HandleCaptureScreen()
{
    const today = new Date()
    const yyyy = today.getFullYear()
    let MM = today.getMonth() + 1
    let dd = today.getDate()
    let hh = today.getHours()
    let mm = today.getMinutes()
    let ss = today.getSeconds()

    if (dd < 10) dd = '0' + dd
    if (MM < 10) MM = '0' + MM

    const formattedToday = MM + dd + yyyy + '_' + hh + mm + ss

    await driver.get('https://testautomationpractice.blogspot.com/')

    let screenshotWindow = await driver.takeScreenshot();
    await writeFileSync('Captures/window_'+formattedToday+'.png', screenshotWindow, 'base64');

    let droppableElement = await driver.findElement(By.xpath('//div[@id="droppable"]'))
    let screenshotElement = await droppableElement.takeScreenshot(true);
    await writeFileSync('Captures/element_'+formattedToday+'.png', screenshotElement, 'base64');
}

async function ExecutionEnd() {
    console.log('---- EXECUTION COMPLETE ----')
    await driver.sleep(3000)
    await driver.quit()
}

import {Google} from './page.js'
async function HandleUsingClass()
{
    const GoogleInstance = new Google(driver)

    await GoogleInstance.openPage()
    await GoogleInstance.searchKeyword()
}


async function StartTest()
{
    // await HandleInputandRadio()
    // await HandleDropdown()
    // await HandleMultiDropdown()
    // await HandleBootstrapDropdown()
    // await HandleAutoSuggestion()
    // await HandleHiddenItems()
    // await HandleDialogsAlerts()
    // await HandleFramesiFrames()
    // await HandleWebTablePagination()
    // await HandleDatePickers()
    // await HandleMouseActions()
    // await HandleKeyboardActions()
    // await HandleUploadFiles()
    await HandlePagesWindows()
    // await HandleMultiplePagesWindows()
    // await HandleCaptureScreen()
    // await HandleUsingClass()
    await ExecutionEnd()
}

StartTest()