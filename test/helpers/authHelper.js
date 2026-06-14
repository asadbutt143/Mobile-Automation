/**
 * Authentication Helper Utilities
 * Provides functions for managing authentication state across test suites
 */

import { AuthenticationPage } from '../pageobjects/AuthenticationPage.js';

// Auth state constants
export const AuthState = {
    LOGGED_OUT: 'logged_out',
    LOGGED_IN: 'logged_in',
    GUEST: 'guest'
};

/**
 * Get current authentication state based on app activity
 * @returns {Promise<string>} Current auth state: logged_out | logged_in | guest
 */
export async function getCurrentAuthState() {
    try {
        const currentActivity = await driver.getCurrentActivity();
        
        // If on login screen, user is logged out
        if (currentActivity?.includes('LoginScreenRevamped') || 
            currentActivity?.includes('SplashScreen') ||
            currentActivity?.includes('OnBoardingScreen')) {
            return AuthState.LOGGED_OUT;
        }
        
        // If on home/main activity, check for guest indicators
        if (currentActivity?.includes('PeriodTrackerActivity') || 
            currentActivity?.includes('MainActivity')) {
            // Check if profile shows "Guest" indicator
            try {
                const profileIcon = await $('id=profileIV');
                if (await profileIcon.isDisplayed()) {
                    await profileIcon.click();
                    await driver.pause(1000);
                    
                    // Look for "Log Out" vs "Login" button to determine state
                    const logoutBtn = await $('android=new UiSelector().text("Log Out")');
                    const loginBtn = await $('android=new UiSelector().text("Login")');
                    
                    if (await logoutBtn.isExisting()) {
                        await driver.back();
                        return AuthState.LOGGED_IN;
                    } else if (await loginBtn.isExisting()) {
                        await driver.back();
                        return AuthState.GUEST;
                    }
                    
                    await driver.back();
                }
            } catch (e) {
                console.log('[AuthHelper] Could not determine auth state from profile');
            }
            
            return AuthState.LOGGED_IN; // Default assumption if on home
        }
        
        return AuthState.LOGGED_OUT;
    } catch (e) {
        console.error('[AuthHelper] Error getting auth state:', e.message);
        return AuthState.LOGGED_OUT;
    }
}

/**
 * Ensure user is logged out, performing logout if necessary
 */
export async function ensureLoggedOut() {
    const authState = await getCurrentAuthState();
    
    if (authState === AuthState.LOGGED_OUT) {
        console.log('[AuthHelper] Already logged out');
        return;
    }
    
    console.log('[AuthHelper] Logging out...');
    const authPage = new AuthenticationPage();
    await authPage.logout();
}

/**
 * Ensure we are on the login/welcome screen
 */
export async function ensureOnLoginScreen() {
    const currentActivity = await driver.getCurrentActivity();
    
    if (currentActivity?.includes('LoginScreenRevamped')) {
        console.log('[AuthHelper] Already on login screen');
        return;
    }
    
    // If not on login screen, ensure logged out first
    await ensureLoggedOut();
    
    // Verify we're now on login screen
    await driver.waitUntil(
        async () => (await driver.getCurrentActivity())?.includes('LoginScreenRevamped'),
        {
            timeout: 10000,
            timeoutMsg: 'Expected to be on LoginScreenRevamped'
        }
    );
    console.log('[AuthHelper] Now on login screen');
}

/**
 * Ensure we are on the home screen
 */
export async function ensureOnHomeScreen() {
    await driver.waitUntil(
        async () => {
            const activity = await driver.getCurrentActivity();
            return activity?.includes('PeriodTrackerActivity') || 
                   activity?.includes('MainActivity');
        },
        {
            timeout: 15000,
            timeoutMsg: 'Expected to be on Home screen (PeriodTrackerActivity)'
        }
    );
    console.log('[AuthHelper] On home screen');
}

/**
 * Wait for a specific Android activity to be active
 * @param {string} activityName - Partial activity name to match
 * @param {number} timeout - Timeout in milliseconds
 */
export async function waitForActivity(activityName, timeout = 10000) {
    await driver.waitUntil(
        async () => (await driver.getCurrentActivity())?.includes(activityName),
        {
            timeout,
            timeoutMsg: `Expected ${activityName} to be active`
        }
    );
}

/**
 * Check if user can access a feature (e.g., Community requires login)
 * @param {string} feature - Feature name
 * @returns {Promise<boolean>} Whether user can access the feature
 */
export async function canAccessFeature(feature) {
    const authState = await getCurrentAuthState();
    
    // Features that require login
    const loginRequiredFeatures = ['community', 'Community'];
    
    if (loginRequiredFeatures.includes(feature)) {
        return authState === AuthState.LOGGED_IN;
    }
    
    // All other features are accessible to all users
    return true;
}

/**
 * Navigate to home screen from any state
 */
export async function navigateToHome() {
    try {
        // Try clicking home button in bottom nav
        const homeBtn = await $('id=bubble1');
        if (await homeBtn.isDisplayed()) {
            await homeBtn.click();
            await driver.pause(1000);
            console.log('[AuthHelper] Navigated to home via bottom nav');
            return;
        }
    } catch (e) {
        // If bottom nav not available, try back navigation
        let attempts = 0;
        while (attempts < 5) {
            const activity = await driver.getCurrentActivity();
            if (activity?.includes('PeriodTrackerActivity')) {
                console.log('[AuthHelper] On home screen');
                return;
            }
            await driver.back();
            await driver.pause(500);
            attempts++;
        }
    }
}

/**
 * Reset app to initial state (for test isolation)
 */
export async function resetAppState() {
    try {
        // Close and relaunch app
        await driver.closeApp();
        await driver.pause(2000);
        await driver.launchApp();
        await driver.pause(3000);
        console.log('[AuthHelper] App state reset');
    } catch (e) {
        console.error('[AuthHelper] Error resetting app:', e.message);
    }
}

export default {
    AuthState,
    getCurrentAuthState,
    ensureLoggedOut,
    ensureOnLoginScreen,
    ensureOnHomeScreen,
    waitForActivity,
    canAccessFeature,
    navigateToHome,
    resetAppState
};
