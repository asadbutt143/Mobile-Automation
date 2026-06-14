/**
 * Login Flow - Step 1: Login with Email
 * Login with credentials created during signup flow
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { TestData } from '../../config/testData.js';

describe('Phase 2: Login Flow - Email Login', () => {

    it('should login with email and password', async () => {
        const authenticationPage = new AuthenticationPage();
        
        // Get credentials from signup flow or use defaults
        const email = global.testCredentials?.email || TestData.getSignupEmail() || 'tapak@yopmail.com';
        const password = global.testCredentials?.password || TestData.getSignupPassword();
        
        console.log(`Logging in with email: ${email}`);
        
        await authenticationPage.loginWithEmailAndPassword(email, password);
        console.log('✅ Login completed successfully');
    });

});
