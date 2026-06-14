
import { SettingPage } from '../pageobjects/SettingPage.js';

describe('Settings Screen Validation', () => {

    it('Navigate to settings screen', async () => {
        const settingPage = new SettingPage();

        await settingPage.navigateToSettings();

        await driver.swipeDown();
        await driver.swipeDown();

        //click "Terms & Conditions"
        await settingPage.openTermsAndConditions();

        //feedback form
        //     await settingPage.submitFeedback('Test Feedback', 'This is a test feedback');

        //click rate app
        await settingPage.rateApp();

        // await driver.swipeUp();

        //toggle notifications
        await settingPage.toggleNotifications();

        await driver.swipeUp();

        //apply pin to app
        await settingPage.openAccessCode();
        await settingPage.toggleAccessCodeSwitch();
        await settingPage.clickKeypad();

        //enter 4 digit pin from keypad visible on screen
        const randomPin = settingPage.generateRandomPin();

        // enter pin digit by digit
        await settingPage.enterPin(randomPin);

        //confirm pin by entering the same pin again
        await settingPage.enterPin(randomPin);

        await driver.pause(2000);

        //verify user is on home screen
        await settingPage.verifyOnHomeScreen();

        //close the app
        await driver.closeApp();
        await driver.pause(6000);

        //reopen the app
        await driver.launchApp();
        await driver.pause(3000);


        //verify pin is applied
        await settingPage.verifyAccessCodeTitle('Enter Access Code');
        await driver.pause(2000);

        //enter pin
        await settingPage.enterPin(randomPin);

        await driver.pause(2000);

        //verify user is on home screen
        await settingPage.verifyOnHomeScreen();

        //go to settings and turn off the pin
        await settingPage.navigateToSettings();

        await settingPage.openAccessCode();

        await settingPage.toggleAccessCodeSwitch();

        await settingPage.clickKeypad();

        // enter pin digit by digit
        await settingPage.enterPin(randomPin);

        await driver.pause(2000);

        //verify user is on Access Code screen
        await settingPage.verifyAccessCodeTitle('Access Code');

    });

});