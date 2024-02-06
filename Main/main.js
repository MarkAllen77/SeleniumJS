const {Builder, By, Key, until} = require ('selenium-webdriver')
const assert = require('assert')
const driver = new Builder().forBrowser('chrome').build()

// const chrome = require('selenium-webdriver/chrome')
// const options = new chrome.Options()
// options.addArguments('--ignore-certificate-errors')
// options.addArguments('--allow-running-insecure-content')
// options.addArguments('excludeSwitches', ['enable-logging'])
// const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()



async function HandleInputandRadio()
{   
    await driver.get('https://demoqa.com/automation-practice-form')

    const firstnameInput = await driver.findElement(By.xpath('//input[@id="firstName"]'))
    const lastnameInput = await driver.findElement(By.xpath('//input[@id="lastName"]'))
  
    await firstnameInput.sendKeys('John')
    await lastnameInput.sendKeys('Doe')

    console.log('Firstname value: ', await firstnameInput.getAttribute('value'))

    assert.strictEqual(await firstnameInput.getAttribute('value'), 'John')


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

    await driver.findElement({id: 'country'})
    await driver.sleep(1000)
    await driver.findElement({id: 'country'}).sendKeys('Japan')

    const countryDropdown = await driver.findElement(By.xpath('//select[@id="country"]'))
    await countryDropdown.click()
    await countryDropdown.findElement(By.xpath('//option[@value="india"]')).click()
    await countryDropdown.click()

    console.log(await countryDropdown.getAttribute('value'))

    assert.equal(await countryDropdown.getAttribute('value'),'india')

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
    await submitButton.click()
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

    assert.equal(value,'Hello Selenium4! How are you today?')
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

    let tableLabel = await driver.findElement(By.xpath('//h2[text()="Pagination Table"]'))
    
}


async function HandleWindows()
{
    await driver.get('https://testautomationpractice.blogspot.com/')

    const fullNameList = await driver.findElements(By.xpath('//td//a'))

    for (let fullName of fullNameList)
    {
        console.log(await fullName.getText())
    }    
    
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
    await HandleDatePickers()
    // await HandleWindows()

    // setInterval(function(){
        
    // }, 5000)
    await driver.sleep(3000)
    await driver.quit()
}

StartTest()
