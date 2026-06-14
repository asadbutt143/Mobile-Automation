/**
 * Signup Flow - Step 3: Profile Setup
 * Complete initial profile setup after signup
 * Note: This may be handled during signup flow automatically
 */

import { HomePage } from '../../pageobjects/HomePage.js';
import { ensureOnHomeScreen } from '../../helpers/authHelper.js';

describe('Phase 1: Signup Flow - Profile Verification', () => {

    it('should verify user is on home screen after signup', async () => {
        await ensureOnHomeScreen();
        console.log('✅ User successfully navigated to home screen');
    });

    it('should verify home screen modules are displayed', async () => {
        const homePage = new HomePage();
        await homePage.verifyHomeModules();
        console.log('✅ Home screen modules verified');
    });

});
