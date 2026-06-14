/**
 * Google SSO Flow - Step 5: Logout
 * Logout Google user to prepare for Guest flow
 */

import { AuthenticationPage } from '../../pageobjects/AuthenticationPage.js';
import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 3: Google SSO Flow - Logout', () => {

    it('should logout user', async () => {
        await navigateToHome();
        
        const authenticationPage = new AuthenticationPage();
        await authenticationPage.logout();
        console.log('✅ Google user logged out - Google SSO flow completed');
    });

});
