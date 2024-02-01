const {Builder, By, Key} = require ('selenium-webdriver')
const assert = require('assert')

// const chrome = require('selenium-webdriver/chrome')
// const options = new chrome.Options()
// options.addArguments('--ignore-certificate-errors')
// options.addArguments('--allow-running-insecure-content')
// options.addArguments('excludeSwitches', ['enable-logging'])
// const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

const driver = new Builder().forBrowser('chrome').build()

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
    await driver.get('https://testautomationpractice.blogspot.com/');

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
    await driver.get('https://testautomationpractice.blogspot.com/');

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
    await driver.get('https://www.jquery-az.com/boots/demo.php?ex=63.0_2');

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


async function HandleWindows()
{
    await driver.get('https://ratings.fide.com/');

    const fullNameList = await driver.findElements(By.xpath('//td//a'))

    for (let fullName of fullNameList)
    {
        console.log(await fullName.getText())
    }    
    
}

async function StartTest()
{
    //await HandleInputandRadio()
    //await HandleDropdown()
    //await HandleMultiDropdown()
    await HandleBootstrapDropdown()
    //await HandleWindows()

    // setInterval(function(){
        
    // }, 5000)
    await driver.sleep(5000)
    await driver.quit()
}

StartTest()
