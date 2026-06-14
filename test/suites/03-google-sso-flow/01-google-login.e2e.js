/**
 * Google SSO Flow - Step 1: Login with Google
 * Continue with Google account
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { TestData } from '../../config/testData.js';

describe('Phase 3: Google SSO Flow - Login', () => {

    it('should continue with Google', async () => {
        const authenticationPage = new AuthenticationPage();
        await authenticationPage.signupWithGoogle();
        console.log('✅ Google SSO login completed');
    });

});
