const { test, expect } = require('@playwright/test');
const {DuckStartPage} = require('../pages/duckStartPage')

test.describe('', () => {
    let page;
    let startPage;
        test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        startPage = new DuckStartPage(page);
        });

        test.beforeEach(async () => {
        await startPage.goto();
        });

   const pageBuildValue = ['3', '4', '5'];
    pageBuildValue.forEach(pageBuild => {

        /**       Tests are performing basic additions, together with checking of value added for oth number fields.
         ********* Also checking integer number check button work                        *****/

        test(`Build ${pageBuild} Checks addition`, async () => {
            await startPage.initiateSearch(pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', '2');
            await startPage.selectOperation('0');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('3');
        });

        test(`Build ${pageBuild} Checks if in addition error message is shown when field1 is not a number`, async () => {
            await startPage.initiateSearch(pageBuild);
            await page.fill('#number1Field', 'a');
            await page.fill('#number2Field', '2');
            await startPage.selectOperation('0');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 1 is not a number');
        });


        test(`Build ${pageBuild} Checks if integer check is working and shows correct`, async () => {
            await startPage.initiateSearch(pageBuild);
            await startPage.checkTheIntegerBox();
            await page.fill('#number1Field', '4.1');
            await page.fill('#number2Field', '1.2');
            await startPage.selectOperation('0');

            const resultInteger = await page.inputValue('#numberAnswerField');
            expect(resultInteger).toEqual('5');
        });


        /**       Tests are performing basic substraction, together with checking of value added for oth number fields.
         ********* Also checking integer number check button work                        *****/


        test(`Build ${pageBuild} Checks if in substraction error message is shown when Field_1 is not a number`, async () => {
            await startPage.initiateSearch(pageBuild);
            await page.fill('#number1Field', 'a');
            await page.fill('#number2Field', '2');
            await startPage.selectOperation('1');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 1 is not a number');
        });
});
});