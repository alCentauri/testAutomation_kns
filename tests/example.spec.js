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

    test('Checks that duckduckgo page is opening',
        async () => {
            const isLogoVisible = await page.isVisible("#logo_homepage_link");
            expect(isLogoVisible).toBe(true);
        });

    test('Checks that results page opens and results are correct', async () => {
        await startPage.initiateSearch('Test')
        const searchResult = await page.textContent('#r1-0');
        expect(searchResult).toContain('Test');
    });

    test('Checks that cheat sheet tab and Microsoft title are visible', async () => {
        await startPage.initiateSearch('microsoft word cheat sheet')
        const titleResult = await page.textContent('.c-base__title');
        expect(titleResult).toBe('Microsoft Word 2010');
        const tabResult = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets')
        expect(tabResult).toBe(true)
    });

    test('Checks short wiki url', async () => {
        await startPage.initiateSearch('shorten www.wikipedia.com')

        const urlResult = await page.inputValue('#shorten-url');
        await page.goto(urlResult);

        const logoResult = await page.isVisible('.central-textlogo__image.sprite.svg-Wikipedia_wordmark');
        expect(logoResult).toBe(true);

    });

//    const pageBuildValue = ['3', '4', '5'];
//    pageBuildValue.forEach(pageBuild => {

        /*test.beforeAll(async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
        });
/**/
        /**       Tests are performing basic additions, together with checking of value added for oth number fields.
         ********* Also checking integer number check button work                        *****/
/*
        test(`Build ${pageBuild} Checks addition`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '0');
            await page.click('#calculateButton');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('3');
        });

        test(`Build ${pageBuild} Checks if in addition error message is shown when field1 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', 'a');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '0');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 1 is not a number');
        });

        test(`Build ${pageBuild} Checks if in addition error message is shown when field2 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', 'b');
            await page.selectOption('#selectOperationDropdown', '0');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 2 is not a number');
        });

        test(`Build ${pageBuild} Checks if integer check is working and shows correct`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            const integerBoxIsChecked = await page.isChecked('#integerSelect');
            expect(integerBoxIsChecked).toBeFalsy();
            await page.check('#integerSelect');
            expect(await page.isChecked('#integerSelect')).toBeTruthy();
            await page.fill('#number1Field', '4.1');
            await page.fill('#number2Field', '1.2');
            await page.selectOption('#selectOperationDropdown', '0');
            await page.click('#calculateButton');
            const resultInteger = await page.inputValue('#numberAnswerField');
            expect(resultInteger).toEqual('5');
        });

*/
        /**       Tests are performing basic substraction, together with checking of value added for oth number fields.
         ********* Also checking integer number check button work                        *****/

/*
        test(`Build ${pageBuild} Checks Substract`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '0.1');
            await page.fill('#number2Field', '-0.2');
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('#calculateButton');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('0.3');
        });

        test(`Build ${pageBuild} Checks if in substraction error message is shown when Field_1 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', 'a');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 1 is not a number');
        });

        test(`Build ${pageBuild} Checks if in Substraction error message is shown when Field_2 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', 'b');
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 2 is not a number');
        });

        test(`Build ${pageBuild} Checks if integer check in Substraction is working and shows correct result`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            const integerBoxIsChecked = await page.isChecked('#integerSelect');
            expect(integerBoxIsChecked).toBeFalsy();
            await page.check('#integerSelect');
            expect(await page.isChecked('#integerSelect')).toBeTruthy();
            await page.fill('#number1Field', '4.1');
            await page.fill('#number2Field', '1.2');
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('#calculateButton');
            const resultInteger = await page.inputValue('#numberAnswerField');
            expect(resultInteger).toEqual('2');
        });
*/
        /**       Tests are performing basic multiplying action, together with checking of value added for oth number fields.
         ********* Also checking integer number check button work                        *****/
/*
        test(`Build ${pageBuild} Checks Multiply`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '10');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '2');
            await page.click('#calculateButton');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('20');
        });

        test(`Build ${pageBuild} Checks if in Multiplying error message is shown when Field_1 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', 'a');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '2');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 1 is not a number');
        });

        test(`Build ${pageBuild} Checks if in Multiplying error message is shown when Field_2 is not a number`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', 'b');
            await page.selectOption('#selectOperationDropdown', '2');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Number 2 is not a number');
        });

        test(`Build ${pageBuild} Checks if integer check in Multiplying is working and shows correct result`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            const integerBoxIsChecked = await page.isChecked('#integerSelect');
            await page.check('#integerSelect');
            expect(integerBoxIsChecked).toBeFalsy();
            expect(await page.isChecked('#integerSelect')).toBeTruthy();
            await page.fill('#number1Field', '4.1');
            await page.fill('#number2Field', '1.2');
            await page.selectOption('#selectOperationDropdown', '2');
            await page.click('#calculateButton');
            const resultInteger = await page.inputValue('#numberAnswerField');
            expect(resultInteger).toEqual('4');
        });
*/
        /**       Tests are performing basic Division action, together with checking of value added for both number fields.
         ********* Also checking integer number check button work                        *****/
/*
        test(`Build ${pageBuild} Checks Division`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '10');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '3');
            await page.click('#calculateButton');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('5');
        });

        test(`Build ${pageBuild} Checks if integer check in Division is working and shows correct result`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            const integerBoxIsChecked = await page.isChecked('#integerSelect');
            expect(integerBoxIsChecked).toBeFalsy();
            await page.check('#integerSelect');
            expect(await page.isChecked('#integerSelect')).toBeTruthy();
            await page.fill('#number1Field', '4.1');
            await page.fill('#number2Field', '1.2');
            await page.selectOption('#selectOperationDropdown', '3');
            await page.click('#calculateButton');
            const resultInteger = await page.inputValue('#numberAnswerField');
            expect(resultInteger).toEqual('3');
        });

        test(`Build ${pageBuild} Checks if in Division error message is shown when dividing by 0`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '1');
            await page.fill('#number2Field', '0');
            await page.selectOption('#selectOperationDropdown', '3');
            await page.click('#calculateButton');
            const error = await page.textContent('#errorMsgField');
            expect(error).toEqual('Divide by zero error!');
        });

        /**       Tests are performing basic Concatenation action, together with checking of value added for both number fields.
         ********* Also checking integer number check button work                        *****/

        /*
        test(`Build ${pageBuild} Checks Concatenate`, async ({page}) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', pageBuild);
            await page.fill('#number1Field', '10');
            await page.fill('#number2Field', '2');
            await page.selectOption('#selectOperationDropdown', '4');
            await page.click('#calculateButton');
            const resultHappy = await page.inputValue('#numberAnswerField');
            expect(resultHappy).toEqual('102');
        });
    })*/
});