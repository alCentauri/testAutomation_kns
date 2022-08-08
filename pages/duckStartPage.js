const {expect} = require("@playwright/test");
exports.DuckStartPage = class DuckStartPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async initiateSearch(pageBuildNumber){
        await this.page.selectOption('#selectBuild', pageBuildNumber);
      //  await this.page.click('#search_button_homepage');
      //  await this.page.waitForNavigation();
    }

    async selectOperation(operationIndex){
        await this.page.selectOption('#selectOperationDropdown', operationIndex);
        await this.page.click('#calculateButton');
        //  await this.page.click('#search_button_homepage');
        //  await this.page.waitForNavigation();
    }

    async checkTheIntegerBox(){

        const integerBoxIsChecked = await this.page.isChecked('#integerSelect');
        expect(integerBoxIsChecked).toBeFalsy();
        await this.page.check('#integerSelect');
        expect(await this.page.isChecked('#integerSelect')).toBeTruthy();
        //  await this.page.click('#search_button_homepage');
        //  await this.page.waitForNavigation();
    }
}