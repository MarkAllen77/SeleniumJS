const { Builder, By, Key, until } = require ('selenium-webdriver')
const { strictEqual, equal } = require('assert')

const driver = new Builder().forBrowser('chrome').build()

// const chrome = require('selenium-webdriver/chrome')
// const options = new chrome.Options()
// options.addArguments('--ignore-certificate-errors')
// options.addArguments('--allow-running-insecure-content')
// options.addArguments('excludeSwitches', ['enable-logging'])
// const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

// NOTES:  execute test > npm test
//         execute report > npx allure serve Allure-results

describe('HandelWebObjects', () => {
    jest.setTimeout(20000);

    afterAll(async () => {
        await driver.sleep(3000)
        await driver.quit()
    })

    test('HandleDropdown', async () => 
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

        // await new Promise(process.nextTick)
        // await jest.runAllTimersAsync()
    })

    test('HandleInputandRadio', async () => 
    {   
        await allure.step("Step 1: Open webpage URL", async (s1) => {
            await driver.get('https://demoqa.com/automation-practice-form')
        })

        await allure.step("Step 2: Update input box", async (s2) => {
            const firstnameInput = await driver.findElement(By.xpath('//input[@id="firstName"]'))
            const lastnameInput = await driver.findElement(By.xpath('//input[@id="lastName"]'))
        
            await firstnameInput.sendKeys('John')
            await lastnameInput.sendKeys('Doe')

            console.log('Firstname value: ', await firstnameInput.getAttribute('value'))

            strictEqual(await firstnameInput.getAttribute('value'), 'John')
        })

        await allure.step("Step 3: Update radio buttons", async (s3) => {
            const genderMaleLabel = await driver.findElement(By.xpath('//label[normalize-space()="Male"]'))
            const genderFemaleLabel = await driver.findElement(By.xpath('//label[normalize-space()="Female"]'))

            const genderMaleRadiobutton = await driver.findElement(By.xpath('//input[@id="gender-radio-1"]'))
            const genderFemaleRadiobutton = await driver.findElement(By.xpath('//input[@id="gender-radio-2"]'))

            await genderMaleLabel.click()

            console.log('Male radio: ', await genderMaleRadiobutton.isSelected())
            console.log('Female radio: ', await genderFemaleRadiobutton.isSelected())
        })

        await allure.step("Step 3: Update checkboxes", async (s4) => {
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
        })

        // await new Promise(process.nextTick)
        // await jest.runAllTimersAsync()
    })    
})