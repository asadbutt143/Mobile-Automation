/**
 * Guest Flow - Step 1: Continue as Guest
 * Enter the app as a guest user
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { TestData } from '../../config/testData.js';

describe('Phase 4: Guest Flow - Continue as Guest', () => {

    it('should continue as guest and complete profile', async () => {
        const authenticationPage = new AuthenticationPage();
        await authenticationPage.continueAsGuestAndCompleteProfile();
        console.log('✅ Guest flow started - Profile setup completed');
    });

});
