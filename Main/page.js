import { Builder, By, Key, until } from 'selenium-webdriver'

export class Google {
    constructor(driver) {
        this.driver = driver
    }

    async openPage() {
        await this.driver.get('https://www.google.com/')
        await this.driver.sleep(2000)
    }

    async searchKeyword() {
        const searchInput = await this.driver.findElement(By.xpath('//textarea[@name="q"]'))
        searchInput.sendKeys('selenium node')
        await this.driver.sleep(1000)
        await this.driver.actions().keyDown(Key.ESCAPE).perform()
        await this.driver.sleep(2000)
    }
}