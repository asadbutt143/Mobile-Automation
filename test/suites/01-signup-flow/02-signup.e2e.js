/**
 * Signup Flow - Step 2: Email Signup with OTP
 * Create new account using email and OTP verification
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { TestData } from '../../config/testData.js';

describe('Phase 1: Signup Flow - Email Signup', () => {

    it('should sign up with email and OTP', async () => {
        const authenticationPage = new AuthenticationPage();
        
        // Perform signup and get the email used
        const email = await authenticationPage.signUpWithYopmailOtp();
        
        // Store credentials for use in login flow
        TestData.setSignupEmail(email);
        global.testCredentials = global.testCredentials || {};
        global.testCredentials.email = email;
        global.testCredentials.password = TestData.getSignupPassword();
        
        console.log(`✅ Signup completed with email: ${email}`);
    });

});
