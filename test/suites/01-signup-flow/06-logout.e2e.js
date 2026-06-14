/**
 * Signup Flow - Step 6: Logout
 * Logout user to prepare for next test phase
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 1: Signup Flow - Logout', () => {

    it('should logout user', async () => {
        // Navigate to home first
        await navigateToHome();
        
        const authenticationPage = new AuthenticationPage();
        await authenticationPage.logout();
        console.log('✅ User logged out - Signup flow completed');
    });

});
