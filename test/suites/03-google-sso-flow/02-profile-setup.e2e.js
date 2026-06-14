/**
 * Google SSO Flow - Step 2: Profile Setup (if new user)
 * Complete profile setup if this is a new Google user
 */

import { HomePage } from '../../pageobjects/HomePage.js';
import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { ensureOnHomeScreen } from '../../helpers/authHelper.js';
import { scrollToValue } from '../../utils.js';

describe('Phase 3: Google SSO Flow - Profile Setup', () => {

    it('should complete profile setup if new user or verify home screen', async () => {
        const currentActivity = await driver.getCurrentActivity();
        
        // Check if we need to complete profile setup (new user flow)
        if (currentActivity?.includes('Profile') || currentActivity?.includes('Setup')) {
            console.log('New Google user - completing profile setup...');
            
            // Complete profile setup similar to guest flow
            const nameInput = await $('id=etName');
            if (await nameInput.isExisting()) {
                const nameRegex = /^[a-zA-Z]+$/;
                let name = '';
                while (!nameRegex.test(name)) {
                    name = Math.random().toString(36).substring(7);
                }
                await nameInput.setValue(name);
                console.log('Name set:', name);
            }

            // Date of birth
            const dobInput = await $('id=tv_dob');
            if (await dobInput.isExisting()) {
                await dobInput.click();
                const calendar = await $('android=new UiSelector().textContains("Select your date of birth")');
                await calendar.waitForDisplayed({ timeout: 10000 });
                await driver.pause(2000);

                await scrollToValue(0, '10');
                await scrollToValue(1, 'December');
                await scrollToValue(2, '1998');

                const saveBtn = await $('android=new UiSelector().textContains("Save")');
                await saveBtn.click();
            }

            // Gender selection
            const gender = await $('id=tv_gender');
            if (await gender.isExisting()) {
                await gender.click();
                const female = await $('android=new UiSelector().textContains("Female")');
                await female.click();
                const saveBtn2 = await $('android=new UiSelector().textContains("Save")');
                await saveBtn2.click();
            }

            // Continue through setup screens
            let continueBtn = await $('android=new UiSelector().textContains("Next")');
            while (await continueBtn.isExisting()) {
                try {
                    await continueBtn.click();
                    await driver.pause(1000);
                    continueBtn = await $('android=new UiSelector().textContains("Next")');
                } catch (e) {
                    break;
                }
            }

            console.log('✅ Profile setup completed for new Google user');
        }

        // Verify we're on home screen
        await ensureOnHomeScreen();
        console.log('✅ Google user on home screen');
    });

    it('should verify home screen modules', async () => {
        const homePage = new HomePage();
        await homePage.verifyHomeModules();
    });

});
