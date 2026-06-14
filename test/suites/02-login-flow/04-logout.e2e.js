/**
 * Login Flow - Step 4: Logout
 * Logout user to prepare for next test phase (Google SSO)
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 2: Login Flow - Logout', () => {

    it('should logout user', async () => {
        await navigateToHome();
        
        const authenticationPage = new AuthenticationPage();
        await authenticationPage.logout();
        console.log('✅ User logged out - Login flow completed');
    });

});
