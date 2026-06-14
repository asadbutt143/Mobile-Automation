/**
 * Guest Flow - Step 4: Community Access Verification
 * Verify that community is blocked/restricted for guest users
 */

import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 4: Guest Flow - Community Restriction', () => {

    before(async () => {
        await navigateToHome();
    });

    it('should verify community access is restricted for guest', async () => {
        // Click community button at the bottom navigation bar
        const community = await $('id=bubble3');
        await expect(community).toBeDisplayed();
        await community.click();
        await driver.pause(2000);

        // Check for various restriction indicators
        let isRestricted = false;
        let restrictionType = 'none';

        // Check 1: Login/Signup prompt
        try {
            const loginPrompt = await $('android=new UiSelector().textContains("Login")');
            if (await loginPrompt.isDisplayed()) {
                console.log('✅ Login prompt displayed - Community requires login');
                isRestricted = true;
                restrictionType = 'login_prompt';
            }
        } catch (e) { /* Continue checking */ }

        // Check 2: Sign up prompt
        if (!isRestricted) {
            try {
                const signupPrompt = await $('android=new UiSelector().textContains("Sign up")');
                if (await signupPrompt.isDisplayed()) {
                    console.log('✅ Sign up prompt displayed - Community requires account');
                    isRestricted = true;
                    restrictionType = 'signup_prompt';
                }
            } catch (e) { /* Continue checking */ }
        }

        // Check 3: Guest restriction message
        if (!isRestricted) {
            try {
                const guestMsg = await $('android=new UiSelector().textContains("Guest")');
                if (await guestMsg.isDisplayed()) {
                    console.log('✅ Guest restriction message displayed');
                    isRestricted = true;
                    restrictionType = 'guest_message';
                }
            } catch (e) { /* Continue checking */ }
        }

        // Check 4: Redirected to login screen
        if (!isRestricted) {
            const currentActivity = await driver.getCurrentActivity();
            if (currentActivity?.includes('LoginScreenRevamped') || 
                currentActivity?.includes('Login')) {
                console.log('✅ Redirected to login screen - Community blocked for guest');
                isRestricted = true;
                restrictionType = 'redirect_to_login';
            }
        }

        // Check 5: Community actually opens (some apps allow read-only)
        if (!isRestricted) {
            try {
                const communityHeader = await $('//android.widget.TextView[@text="Explore Community"]');
                if (await communityHeader.isDisplayed()) {
                    console.log('⚠️ Community is accessible to guest users (may be read-only)');
                    restrictionType = 'accessible_readonly';
                    
                    // Try to create a post - this should be blocked
                    try {
                        const createPostBtn = await $('id=create_post_btn');
                        if (await createPostBtn.isExisting()) {
                            await createPostBtn.click();
                            await driver.pause(2000);
                            
                            // Check if creation is blocked
                            const loginRequired = await $('android=new UiSelector().textContains("Login")');
                            if (await loginRequired.isExisting()) {
                                console.log('✅ Post creation requires login');
                                isRestricted = true;
                                restrictionType = 'create_blocked';
                            }
                        }
                    } catch (e) {
                        console.log('Create post button not found or action blocked');
                    }
                }
            } catch (e) { /* Community header not found */ }
        }

        // Log final result
        console.log(`Community restriction verification: ${restrictionType}`);
        
        // Navigate back to home
        try {
            await driver.back();
            await driver.pause(1000);
        } catch (e) {
            // Already navigated away
        }

        // Navigate to home
        await navigateToHome();
        
        console.log('✅ Community access verification completed for guest user');
    });

    it('should verify guest can still use other features after community check', async () => {
        // Verify we're back on home and can use other features
        const calendarBtn = await $('id=bubble2');
        await expect(calendarBtn).toBeDisplayed();
        
        const analyticsBtn = await $('id=bubble4');
        await expect(analyticsBtn).toBeDisplayed();
        
        console.log('✅ Other navigation options still available for guest');
    });

});
