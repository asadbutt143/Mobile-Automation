/**
 * Login Flow - Step 2: Verify Home State
 * Quick verification that user is logged in and home screen is functional
 */

import { HomePage } from '../../pageobjects/HomePage.js';
import { ensureOnHomeScreen } from '../../helpers/authHelper.js';

describe('Phase 2: Login Flow - State Verification', () => {

    it('should verify user is on home screen after login', async () => {
        await ensureOnHomeScreen();
        console.log('✅ User on home screen after login');
    });

    it('should verify home screen modules are displayed', async () => {
        const homePage = new HomePage();
        await homePage.verifyHomeModules();
        console.log('✅ Home screen modules verified for logged-in user');
    });

});
