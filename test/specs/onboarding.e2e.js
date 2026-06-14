import { OnboardingPage } from '../pageobjects/OnboardingPage.js';

describe('My First Appium Test', () => {

    it('should launch the app and navigate from splash to onboarding to login', async () => {
        const onboardingPage = new OnboardingPage();
        await onboardingPage.waitForInitialActivity();
        await onboardingPage.navigateToLoginFromOnboardingIfNeeded();
    });

});