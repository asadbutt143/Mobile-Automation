import {
    scrollToValue,
    waitForActivity
} from '../utils.js';

export class AuthenticationPage {

    // Helper to adjust SeekBar to target value (moved from spec, logic unchanged)
    async moveSliderToValue(slider, label, targetValue) {
        const location = await slider.getLocation();
        const size = await slider.getSize();
        const startX = location.x;
        const y = Math.floor(location.y + size.height / 2);
        const width = size.width;
        const steps = 30; // Reduced steps for speed while maintaining reasonable precision

        console.log(`Adjusting slider for target: ${targetValue}`);

        for (let i = 0; i <= steps; i++) {
            const x = Math.floor(startX + (i * width / steps));

            await driver.performActions([{
                type: 'pointer', id: 'finger1', parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 50 }, // Reduced pause
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await driver.pause(100); // Reduced wait time between steps
            const currentText = await label.getText();
            console.log(`Current: ${currentText}`);

            const currentVal = parseInt(currentText.replace(/\D/g, '')) || 0;
            const targetVal = parseInt(targetValue.toString().replace(/\D/g, ''));

            if (currentVal === targetVal) {
                console.log(`Target ${targetVal} reached!`);
                return;
            }

            if (currentVal > targetVal) {
                console.warn(`Passed target (${currentVal} > ${targetVal}). Stopping.`);
                return;
            }
        }
    }

    async continueAsGuestAndCompleteProfile() {
        const continueAsGuestBtn = await $('android=new UiSelector().textContains("Join as Guest")');
        await continueAsGuestBtn.waitForDisplayed({ timeout: 5000 });
        await continueAsGuestBtn.click();

        console.log('Guest login initiated, completing profile setup...');
        await this.completeProfileSetup();
    }

    // Helper method to get OTP from Yopmail (moved from spec, logic unchanged)
    async getOtpFromYopmail(email) {
        console.log(`Opening Yopmail for: ${email}`);

        // 1. Launch Google App
        await driver.activateApp('com.google.android.googlequicksearchbox');

        // 2. Perform Search
        // Wait for search bar and click it
        const searchBar = await $('android=new UiSelector().textContains("Search")');
        await searchBar.waitForDisplayed({ timeout: 10000 });
        await searchBar.click();

        // Wait for the actual input field (EditText)
        const searchInput = await $('android=new UiSelector().className("android.widget.EditText")');
        await searchInput.waitForDisplayed({ timeout: 10000 });

        // Type yopmail.com and hit Enter
        await searchInput.setValue('yopmail.com');
        await driver.pressKeyCode(66); // ENTER key


        // 4. Interact with Yopmail (Native Context)
        console.log('Waiting for Yopmail Native Login Input...');

        // Selector: //android.widget.EditText[@resource-id="login"]
        const loginInput = await $('//android.widget.EditText[@resource-id="login"]');
        await loginInput.waitForDisplayed({ timeout: 20000 });

        await loginInput.clearValue();
        await loginInput.setValue(email);
        await driver.pressKeyCode(66); // Enter

        // 5. Open Mail
        console.log('Waiting for Mail Item...');
        // User Selector: click the mail received...
        // Constructing robust selector based on user input
        // Using textContains for the static part of the subject "iChums Period Tracker OTP"
        // User provided: "15:48 iChums Period Tracker OTP..."
        const mailItem = await $('android=new UiSelector().textContains("iChums Period Tracker OTP")');
        await mailItem.waitForDisplayed({ timeout: 20000 });
        await mailItem.click();

        // 6. Extract OTP from Body
        console.log('Waiting for Mail Body...');
        // User Selector: //android.view.View[@resource-id="mail"]
        const mailBody = await $('//android.view.View[@resource-id="mail"]');
        await mailBody.waitForDisplayed({ timeout: 10000 });

        let bodyText = await mailBody.getText();
        console.log('Full Email Text:', bodyText);

        // If container text is empty/short, fetch from ALL children
        if (!bodyText || bodyText.length < 10) {
            console.log('Fetching text from ALL children...');
            // Broad search for any element with text attribute inside the mail body
            const children = await mailBody.$$('.//*');
            const texts = [];
            for (const child of children) {
                // Try getting 'text' attribute directly, then getText method
                let txt = await child.getText().catch(() => '');
                if (!txt) txt = await child.getAttribute('content-desc').catch(() => '');
                if (txt && txt.trim().length > 0) texts.push(txt);
            }
            bodyText = texts.join('\n');
            console.log('Collected Child Texts:', bodyText);
        }

        // Regex to find 4-8 digit OTP
        const otpMatch = bodyText.match(/\b\d{4,8}\b/);

        if (!otpMatch) {
            // Fallback: look for a TextView containing ONLY digits
            try {
                const otpEl = await $('android=new UiSelector().textMatches("\\d{4,8}")');
                if (await otpEl.isExisting()) {
                    const otp = await otpEl.getText();
                    console.log('Found isolated OTP element:', otp);
                    await driver.activateApp('com.techsacare.periodtracker');
                    return otp;
                }
            } catch (e) { }

            throw new Error(`OTP not found in email body. Content: ${bodyText.substring(0, 100)}...`);
        }

        const otp = otpMatch[0];
        console.log('Extracted OTP:', otp);

        // 7. Return to App
        await driver.activateApp('com.techsacare.periodtracker');
        return otp;
    }

    async signUpWithYopmailOtp() {
        // Navigate to Email Login screen
        const emailBtn = await $('android=new UiSelector().textContains("Login with Email")');
        await emailBtn.waitForDisplayed({ timeout: 5000 });
        await emailBtn.click();

        // Navigate to Sign Up
        const signUpLink = await $('android=new UiSelector().textContains("Sign up")');
        await signUpLink.waitForDisplayed({ timeout: 5000 });
        await signUpLink.click();

        // Fill Sign Up Form
        const randomStr = Math.random().toString(36).substring(7);
        const username = `test_${randomStr}`;
        const emailText = `${username}@yopmail.com`;

        // Assuming Name/Email/Password fields are present
        // Using updated selectors if available, or text placeholders
        //await $('android=new UiSelector().textContains("Name")').setValue(`Test User ${randomStr}`);
        await $('android=new UiSelector().textContains("Email")').setValue(emailText);
        // Note: Password might not be asked if it's OTP-only flow, but if it is:
        //const passwordInput = await $('android=new UiSelector().textContains("Password")');
        //if (await passwordInput.isDisplayed()) {
        //   await passwordInput.setValue("Password123");
        //}

        // Check "I agree" checkbox (using ID found in file)
        const iAgreeCheckbox = await $('id=com.techsacare.periodtracker:id/rememberMeCheckbox');
        if (await iAgreeCheckbox.isExisting()) {
            await iAgreeCheckbox.click();
        }

        // Click "Send OTP" or "Sign up"
        const sendOtpBtn = await $('id=com.techsacare.periodtracker:id/sendOtpBtn');
        if (await sendOtpBtn.isExisting()) {
            await sendOtpBtn.click();
        } else {
            // Fallback to text
            await $('android=new UiSelector().textContains("Sign up")').click();
        }

        // Wait for OTP Screen
        // We assume we are on OTP screen now. Pause briefly or wait for element.
        await driver.pause(2000);

        // Wait for OTP Activity to start
        // We use waitForActivity helper which checks the current activity name
        console.log('Waiting for OTP Screen activity...');
        await waitForActivity('CreateAccountOtpRevampActivity', 10000);
        console.log('OTP screen detected. Proceeding to fetch OTP.');

        // Fetch OTP
        const otp = await this.getOtpFromYopmail(username);

        if (!otp) {
            throw new Error('OTP was not retrieved from Yopmail!');
        }
        console.log('Retrieved OTP:', otp);

        // Enter OTP
        // Try identifying the OTP input. 
        // Often implemented as multiple EditTexts or one. Assuming one here.
        await driver.pause(2000);


        // Enter OTP - Generic Approach (Tap & Type)
        console.log('Entering OTP:', otp);

        // 1. Tap somewhere in the upper-middle of the screen to focus the input (assuming it's there)
        // Using W3C actions instead of deprecated touchAction
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 500 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        // Pause to allow keyboard to appear or focus to register
        await driver.pause(2000);

        // 2. Type OTP characters
        // Splitting into array sometimes helps with speed/reliability on numeric fields
        await driver.keys(otp.split(''));

        // 3. Press Enter
        // await driver.pressKeyCode(66);

        // Submit (if no auto-submit)
        // Check for a verify button
        try {
            const verifyBtn = await $('id=com.techsacare.periodtracker:id/verifyOtpBtn');
            // Short timeout check
            await verifyBtn.waitForDisplayed({ timeout: 3000 });
            await verifyBtn.click();
        } catch (e) {
            console.log('Verify button not found or not needed, assuming auto-submit.');
        }

        await driver.pause(4000);

        //verify set password screen
        await waitForActivity('SetPasswordRevampActivity', 5000);
        console.log('Set Password screen detected. Proceeding to set password.');

        //fill password
        const passwordInput = await $('id=passwordEt');
        await passwordInput.setValue('Pass@123');

        //fill confirm password
        const confirmPasswordInput = await $('id=confirmPasswordEt');
        await confirmPasswordInput.setValue('Pass@123');

        //click on create account button
        const createAccountBtn = await $('id=setPasswordBtn');
        await createAccountBtn.click();

        console.log('New activity is: ' + await driver.getCurrentActivity());


        // Verify Navigation to Success
        await driver.waitUntil(
            async () => {
                const currentActivity = await driver.getCurrentActivity();
                return !currentActivity.includes('LoginScreenRevamped') && !currentActivity.includes('OtpRevampActivity');
            },
            { timeout: 15000, timeoutMsg: 'Expected to navigate away from OTP Screen' }
        );

        const finalActivity = await driver.getCurrentActivity();
        expect(finalActivity).not.toContain('LoginScreenRevamped');

        // Complete profile setup after signup
        console.log('Completing profile setup after signup...');
        await this.completeProfileSetup();

        // Return email for potential use in login test
        return emailText;
    }

    /**
     * Complete profile setup flow (used after signup or guest login)
     * Handles: Name, DOB, Gender, Cycle Length, Period Start, Period Length
     */
    async completeProfileSetup() {
        console.log('Starting profile setup...');
        
        // Wait for profile setup screen
        await driver.waitUntil(
            async () => {
                const activity = await driver.getCurrentActivity();
                return activity?.includes('PersonelInfoAddingScreen') || 
                       activity?.includes('PersonalInfoAddingScreen');
            },
            { timeout: 10000, timeoutMsg: 'Expected PersonelInfoAddingScreen to be active' }
        );

        // Enter name
        const nameInput = await $('id=etName');
        await nameInput.waitForDisplayed({ timeout: 5000 });
        await nameInput.click();
        
        // Generate name with only alphabets
        const nameRegex = /^[a-zA-Z]+$/;
        let name = '';
        while (!nameRegex.test(name)) {
            name = Math.random().toString(36).substring(7);
        }
        await nameInput.setValue(name);
        console.log('Name:', name);

        // Enter Date of Birth
        const dobInput = await $('id=tv_dob');
        await dobInput.waitForDisplayed({ timeout: 5000 });
        await dobInput.click();

        // Wait for the calendar picker
        const calendar = await $('android=new UiSelector().textContains("Select your date of birth")');
        await calendar.waitForDisplayed({ timeout: 10000 });
        await driver.pause(2000);

        // Select Day, Month and Year
        await scrollToValue(0, '10');
        await scrollToValue(1, 'December');
        await scrollToValue(2, '1998');
        console.log('Date of Birth selected: 10 December 1998');

        // Click save button
        const saveBtn = await $('android=new UiSelector().textContains("Save")');
        await saveBtn.waitForDisplayed({ timeout: 5000 });
        await saveBtn.click();

        // Select gender
        const gender = await $('id=tv_gender');
        await gender.waitForDisplayed({ timeout: 5000 });
        await gender.click();

        // Select female
        const female = await $('android=new UiSelector().textContains("Female")');
        await female.waitForDisplayed({ timeout: 5000 });
        await female.click();

        // Click save button
        const saveBtn2 = await $('android=new UiSelector().textContains("Save")');
        await saveBtn2.waitForDisplayed({ timeout: 5000 });
        await saveBtn2.click();

        // Click continue button
        const continueBtn = await $('android=new UiSelector().textContains("Next")');
        await continueBtn.waitForDisplayed({ timeout: 5000 });
        await continueBtn.click();

        // Select length of menstrual cycle
        const cycleLengthLabel = await $('id=tv_cycle_day');
        await cycleLengthLabel.waitForDisplayed({ timeout: 5000 });
        const cycleSlider = await $('id=seekBar');
        await cycleSlider.waitForDisplayed({ timeout: 5000 });

        console.log('Adjusting Menstrual Cycle length to 30 days...');
        await this.moveSliderToValue(cycleSlider, cycleLengthLabel, '30');
        console.log('Menstrual Cycle length adjusted to ' + await cycleLengthLabel.getText() + ' days');
        await driver.pause(2000);

        // Click continue button
        const continueBtn2 = await $('android=new UiSelector().textContains("Next")');
        await continueBtn2.waitForDisplayed({ timeout: 5000 });
        await continueBtn2.click();

        // Select period start date
        console.log('Waiting for Period Start Date screen...');
        await driver.waitUntil(
            async () => (await driver.getCurrentActivity())?.includes('LMPScreen'),
            { timeout: 10000, timeoutMsg: 'Expected LMPScreen to be active' }
        );
        console.log('Period Start Date screen displayed');

        // Click continue button (use default date)
        const continueBtn3 = await $('android=new UiSelector().textContains("Next")');
        await continueBtn3.waitForDisplayed({ timeout: 5000 });
        await continueBtn3.click();

        // Select period length
        const periodLengthLabel = await $('id=tv_period_days');
        await periodLengthLabel.waitForDisplayed({ timeout: 5000 });
        const periodLengthSlider = await $('id=seekBar');
        await periodLengthSlider.waitForDisplayed({ timeout: 5000 });

        console.log('Adjusting Period length to 5 days...');
        await this.moveSliderToValue(periodLengthSlider, periodLengthLabel, '5');
        console.log('Period length adjusted to ' + await periodLengthLabel.getText() + ' days');

        // Click continue button
        const continueBtn4 = await $('android=new UiSelector().textContains("Next")');
        await continueBtn4.waitForDisplayed({ timeout: 5000 });
        await continueBtn4.click();

        // Verify all the details
        const nameNode = await $('id=tv_name');
        await nameNode.waitForDisplayed({ timeout: 10000 });
        console.log('Name:', await nameNode.getText());

        const dobNode = await $('id=tv_dob');
        console.log('DOB:', await dobNode.getText());

        const genderNode = await $('id=tv_gender');
        console.log('Gender:', await genderNode.getText());

        const periodStartNode = await $('id=tv_lmp');
        console.log('Period Start:', await periodStartNode.getText());

        const periodLenNode = await $('id=tv_pl');
        console.log('Period Length:', await periodLenNode.getText());

        const cycleLenNode = await $('id=tv_cl');
        console.log('Cycle Length:', await cycleLenNode.getText());

        const finalContinueBtn = await $('id=btn_next');
        await finalContinueBtn.click();

        await driver.pause(5000);

        // Verify we're on home screen
        await driver.waitUntil(
            async () => (await driver.getCurrentActivity())?.includes('PeriodTrackerActivity'),
            { timeout: 15000, timeoutMsg: 'Expected PeriodTrackerActivity to be active' }
        );
        console.log('✅ Profile setup complete - Home screen displayed');
    }

    async loginWithEmailAndPassword(emailText, password = 'Pass@123') {
        // Navigate to Email Login screen
        const emailBtn = await $('android=new UiSelector().textContains("Login with Email")');
        await emailBtn.waitForDisplayed({ timeout: 5000 });
        await emailBtn.click();

        //fill email
        const emailInput = await $('id=emailEt');
        //enter mail used for sign-up
        await emailInput.setValue(emailText);

        //fill password
        const passwordInput = await $('id=passwordEt');
        await passwordInput.setValue(password);

        //click on login button
        const loginBtn = await $('id=loginBtn');
        await loginBtn.click();
        await driver.pause(2000);

        console.log('New activity is: ' + await driver.getCurrentActivity());

        // Verify Navigation to Success
        await driver.waitUntil(
            async () => {
                const currentActivity = await driver.getCurrentActivity();
                return !currentActivity.includes('LoginScreenRevamped') && !currentActivity.includes('OtpRevampActivity');
            },
            { timeout: 15000, timeoutMsg: 'Expected to navigate away from OTP Screen' }
        );

        const finalActivity = await driver.getCurrentActivity();
        expect(finalActivity).not.toContain('LoginScreenRevamped');
    }

    async signupWithGoogle() {
        // Navigate to Google Login screen
        const googleBtn = await $('android=new UiSelector().textContains("Continue with Google")');
        await googleBtn.waitForDisplayed({ timeout: 5000 });
        await googleBtn.click();
        await driver.pause(3000);

        //select google account
        const googleAccount = await $('android=new UiSelector().className("android.widget.LinearLayout").instance(7)');
        await googleAccount.waitForDisplayed({ timeout: 5000 });
        await googleAccount.click();
        await driver.pause(5000);

        // Verify Navigation to Success
        await driver.waitUntil(
            async () => {
                const currentActivity = await driver.getCurrentActivity();
                return !currentActivity.includes('LoginScreenRevamped') && !currentActivity.includes('OtpRevampActivity');
            },
            { timeout: 15000, timeoutMsg: 'Expected to navigate away from OTP Screen' }
        );

        const finalActivity = await driver.getCurrentActivity();
        expect(finalActivity).not.toContain('LoginScreenRevamped');
    }

    async logout() {
        //click on profile icon
        const profileIconNode = await $('id=profileIV');
        expect(profileIconNode).toBeDisplayed();
        await profileIconNode.click();
        await driver.pause(2000);

        //click on logout
        const logoutNode = await $('android=new UiSelector().text("Log Out")');
        expect(logoutNode).toBeDisplayed();
        await logoutNode.click();
        await driver.pause(2000);

        await $('id=btnOk').click();
        await driver.pause(4000);

        // Verify Navigation to Success

        const finalActivity = await driver.getCurrentActivity();
        expect(finalActivity).toContain('LoginScreenRevamped');
        console.log('User logged out successfully');
    }
}


