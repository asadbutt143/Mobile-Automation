/**
 * Signup Flow - Step 1: Onboarding
 * Navigate from splash screen to login screen
 */

import { OnboardingPage } from '../../pageobjects/OnboardingPage.js';

describe('Phase 1: Signup Flow - Onboarding', () => {

    it('should launch the app and navigate from splash to login screen', async () => {
        const onboardingPage = new OnboardingPage();
        await onboardingPage.waitForInitialActivity();
        await onboardingPage.navigateToLoginFromOnboardingIfNeeded();
        console.log('✅ Onboarding completed - Ready for signup');
    });

});
