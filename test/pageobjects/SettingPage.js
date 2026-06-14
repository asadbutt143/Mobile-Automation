
export class SettingPage {

    async navigateToSettings() {
        const bubble1 = await $('id=bubble1');
        await expect(bubble1).toBeDisplayed();
        await bubble1.click();
        await driver.pause(2000);

        const settingsIcon = await $('id=profileIV');
        await expect(settingsIcon).toBeDisplayed();
        await settingsIcon.click();
        await driver.pause(2000);

        const settingsTitle = await $('id=settingsTitleTv').getText();
        expect(settingsTitle).toBe('Settings');
        await driver.pause(1000);
        console.log('Settings screen opened');
    }

    async openTermsAndConditions() {
        await driver.swipeDown();
        await driver.swipeDown();

        const termsConditions = await $('android=new UiSelector().text("Terms & Conditions")');
        await expect(termsConditions).toBeDisplayed();
        await termsConditions.click();
        await driver.pause(2000);

        const termsConditionsTitle = await $('android=new UiSelector().text("Terms and Conditions")').getText();
        expect(termsConditionsTitle).toBe('Terms and Conditions');
        await driver.pause(1000);
        console.log('Terms & Conditions screen opened');

        await driver.back();
        await driver.pause(1000);
    }

    async submitFeedback(title, description) {
        const feedback = await $('android=new UiSelector().text("Feedback Form")');
        await expect(feedback).toBeDisplayed();
        await feedback.click();
        await driver.pause(2000);

        const feedbackTitle = await $('id=et_tite');
        await expect(feedbackTitle).toBeDisplayed();
        await feedbackTitle.setValue(title);

        const feedbackDescription = await $('id=et_feedback');
        await expect(feedbackDescription).toBeDisplayed();
        await feedbackDescription.setValue(description);
        console.log('Feedback Form screen opened');

        const submitBtn = await $('id=submitBtn');
        await expect(submitBtn).toBeDisplayed();
        await submitBtn.click();

        //wait until feedback form submitted successfully
        await driver.waitUntil(async () => {
            const feedbackSubmitted = await $('id=tv_header').getText();
            return feedbackSubmitted === 'Feedback Submitted';
        });



        //verify feedback form submitted successfully
        const okBtn = await $('id=btn_ok');
        await expect(okBtn).toBeDisplayed();
        await okBtn.click();
        await driver.pause(2000);
    }

    async rateApp() {
        const rateApp = await $('android=new UiSelector().text("Rate Us")');
        await expect(rateApp).toBeDisplayed();
        await rateApp.click();
        await driver.pause(2000);

        //verify it takes to play store
        const playStore = await $('android=new UiSelector().text("iChums - Period Tracker (Early Access)")');
        await expect(playStore).toBeDisplayed();
        await driver.back();
    }

    async toggleNotifications() {
        await driver.swipeUp();

        const waternotification = await $('android=new UiSelector().text("Water")');
        await expect(waternotification).toBeDisplayed();
        await waternotification.click();
        await driver.pause(2000);

        const sleepMode = await $('android=new UiSelector().text("Sleep")');
        await expect(sleepMode).toBeDisplayed();
        await sleepMode.click();

        await $('id=btn_cancel').click();
        await driver.pause(2000);

        await driver.swipeUp();
    }

    async openAccessCode() {
        const applyPin = await $('android=new UiSelector().text("Access Code")');
        await applyPin.click();

        const applyPinTitle = await $('id=tv_header').getText();
        expect(applyPinTitle).toBe('Access Code');
    }

    async toggleAccessCodeSwitch() {
        const toggleSwitch = await $('id=switch_state');
        await expect(toggleSwitch).toBeDisplayed();
        await toggleSwitch.click();
        await driver.pause(2000);
    }

    async clickKeypad() {
        const keypad = await $('id=keypad');
        await expect(keypad).toBeDisplayed();
        await keypad.click();
        await driver.pause(2000);
    }

    async enterPin(pin) {
        for (const digit of pin) {
            const pinButton = await $(`id=btn_${digit}`);
            await expect(pinButton).toBeDisplayed();
            await pinButton.click();
        }
    }

    async verifyOnHomeScreen() {
        const cl_background = await $('id=cl_background');
        await expect(cl_background).toBeDisplayed();
    }

    async verifyAccessCodeTitle(title) {
        const headerToken = await $('id=tv_header').getText();
        expect(headerToken).toBe(title);
    }

    generateRandomPin() {
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(`Generated PIN: ${pin}`);
        return pin;
    }
}
