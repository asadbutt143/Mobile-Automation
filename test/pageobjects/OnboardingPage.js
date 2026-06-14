export class OnboardingPage {

    async waitForInitialActivity() {
        // Wait for app to load (could be Splash, OnBoarding, or Login)
        await driver.waitUntil(
            async () => {
                const activity = await driver.getCurrentActivity();
                return activity.includes('MainActivity') ||
                    activity.includes('OnBoardingScreen') ||
                    activity.includes('LoginScreenRevamped');
            },
            { timeout: 15000, timeoutMsg: 'Expected app to launch into a known activity' }
        );

        await driver.pause(2000);

        console.log('App launched successfully');
    }

    async navigateToLoginFromOnboardingIfNeeded() {
        await driver.pause(2700);
        // Wait for either OnBoarding or Login screen (to handle first-time vs subsequent launches)
        await driver.waitUntil(
            async () => {
                const activity = await driver.getCurrentActivity();
                return activity?.includes('OnBoardingScreen') || activity?.includes('LoginScreenRevamped');
            },
            {
                timeout: 15000,
                timeoutMsg: 'Expected app to be in OnBoarding or Login state'
            }
        );

        const currentActivity = await driver.getCurrentActivity();
        console.log('Current activity after splash:', currentActivity);

        if (currentActivity.includes('OnBoardingScreen')) {
            console.log('Onboarding screen detected. Proceeding to click Get Started.');

            const getStartedBtn = await $('id=btn_get_started');
            await getStartedBtn.waitForDisplayed({ timeout: 10000 });
            await getStartedBtn.click();
            console.log('Clicked Get Started button');

            // Wait for Login Screen after onboarding
            await driver.waitUntil(
                async () => {
                    const activity = await driver.getCurrentActivity();
                    return activity?.includes('LoginScreenRevamped');
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Expected LoginScreenRevamped activity after onboarding'
                }
            );
        } else {
            console.log('Login screen detected directly (Onboarding likely already completed).');
            expect(currentActivity).toContain('LoginScreenRevamped');
        }
    }
}


