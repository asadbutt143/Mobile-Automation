/**
 * Shared Settings Test Module
 * Reusable settings tests that can be run in any auth state
 */

import { SettingPage } from '../../pageobjects/SettingPage.js';

/**
 * Run full settings tests including PIN
 */
export async function runSettingsFullTests() {
    describe('Settings Screen - Full', () => {
        
        const settingPage = new SettingPage();
        let randomPin;

        it('should navigate to settings screen', async () => {
            await settingPage.navigateToSettings();
        });

        it('should open Terms & Conditions', async () => {
            await driver.swipeDown();
            await driver.swipeDown();
            await settingPage.openTermsAndConditions();
        });

        it('should rate the app', async () => {
            await settingPage.rateApp();
        });

        it('should toggle notifications', async () => {
            await settingPage.toggleNotifications();
        });

        it('should apply PIN to app', async () => {
            await driver.swipeUp();
            await settingPage.openAccessCode();
            await settingPage.toggleAccessCodeSwitch();
            await settingPage.clickKeypad();

            // Enter 4 digit pin
            randomPin = settingPage.generateRandomPin();
            await settingPage.enterPin(randomPin);

            // Confirm pin
            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            // Verify on home screen
            await settingPage.verifyOnHomeScreen();
        });

        it('should verify PIN on app relaunch', async () => {
            // Close and reopen app
            await driver.closeApp();
            await driver.pause(6000);
            await driver.launchApp();
            await driver.pause(3000);

            // Verify PIN is required
            await settingPage.verifyAccessCodeTitle('Enter Access Code');
            await driver.pause(2000);

            // Enter PIN
            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            // Verify on home screen
            await settingPage.verifyOnHomeScreen();
        });

        it('should disable PIN', async () => {
            await settingPage.navigateToSettings();
            await settingPage.openAccessCode();
            await settingPage.toggleAccessCodeSwitch();
            await settingPage.clickKeypad();

            // Enter pin to disable
            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            // Verify on Access Code screen
            await settingPage.verifyAccessCodeTitle('Access Code');
        });
    });
}

/**
 * Run settings sanity tests (without PIN)
 */
export async function runSettingsSanityTests() {
    describe('Settings Screen - Sanity', () => {
        
        const settingPage = new SettingPage();

        it('should navigate to settings screen', async () => {
            await settingPage.navigateToSettings();
        });

        it('should open Terms & Conditions', async () => {
            await driver.swipeDown();
            await driver.swipeDown();
            await settingPage.openTermsAndConditions();
        });

        it('should navigate back to home', async () => {
            await driver.back();
            await driver.pause(1000);
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });
}

/**
 * Run settings tests without PIN (for flows that skip PIN testing)
 */
export async function runSettingsWithoutPinTests() {
    describe('Settings Screen - Without PIN', () => {
        
        const settingPage = new SettingPage();

        it('should navigate to settings screen', async () => {
            await settingPage.navigateToSettings();
        });

        it('should open Terms & Conditions', async () => {
            await driver.swipeDown();
            await driver.swipeDown();
            await settingPage.openTermsAndConditions();
        });

        it('should rate the app', async () => {
            await settingPage.rateApp();
        });

        it('should toggle notifications', async () => {
            await settingPage.toggleNotifications();
        });

        it('should navigate back to home', async () => {
            await driver.back();
            await driver.pause(1000);
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });
}

export default {
    runSettingsFullTests,
    runSettingsSanityTests,
    runSettingsWithoutPinTests
};
