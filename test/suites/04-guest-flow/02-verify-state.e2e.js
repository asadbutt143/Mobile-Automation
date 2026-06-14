/**
 * Guest Flow - Step 2: Verify Home State
 * Verify guest user is on home screen
 */

import { HomePage } from '../../pageobjects/HomePage.js';
import { ensureOnHomeScreen } from '../../helpers/authHelper.js';

describe('Phase 4: Guest Flow - State Verification', () => {

    it('should verify guest user is on home screen', async () => {
        await ensureOnHomeScreen();
        console.log('✅ Guest user on home screen');
    });

    it('should verify home screen modules are displayed', async () => {
        const homePage = new HomePage();
        await homePage.verifyHomeModules();
        console.log('✅ Home screen modules verified for guest');
    });

});
