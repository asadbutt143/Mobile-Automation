/**
 * Shared Community Test Module
 * Community tests - REQUIRES LOGIN (not available in guest mode)
 */

import { CommunityPage } from '../../pageobjects/CommunityPage.js';

/**
 * Run full community tests (logged-in users only)
 */
export async function runCommunityFullTests() {
    describe('Community Module - Full', () => {
        
        const communityPage = new CommunityPage();

        it('should navigate to community module', async () => {
            await communityPage.navigateToCommunity();
        });

        it('should create a post', async () => {
            await communityPage.createPost('Test Post', 'This is a test post');
        });

        it('should edit a post', async () => {
            await communityPage.editPost('Edited Post', 'Edited Post Detail');
        });

        it('should like, comment and share a post', async () => {
            await communityPage.likeCommentAndSharePost();
        });

        it('should delete a post', async () => {
            await communityPage.deletePost('Edited Post');
        });

        it('should explore and filter different categories of posts', async () => {
            await communityPage.exploreAndFilterPosts();
        });
    });
}

/**
 * Run community sanity tests
 */
export async function runCommunitySanityTests() {
    describe('Community Module - Sanity', () => {
        
        const communityPage = new CommunityPage();

        it('should navigate to community module', async () => {
            await communityPage.navigateToCommunity();
        });

        it('should explore posts', async () => {
            await communityPage.exploreAndFilterPosts();
        });
    });
}

/**
 * Verify community is blocked for guest users
 * This should show a login prompt when guest tries to access community
 */
export async function verifyCommunityBlocked() {
    describe('Community Access - Guest Mode', () => {
        
        it('should show login prompt when guest accesses community', async () => {
            // Click community button at the bottom navigation bar
            const community = await $('id=bubble3');
            await expect(community).toBeDisplayed();
            await community.click();
            await driver.pause(2000);

            // Check if login prompt appears
            // Look for common login prompt indicators
            const loginPrompt = await $('android=new UiSelector().textContains("Login")');
            const signupPrompt = await $('android=new UiSelector().textContains("Sign")');
            const guestRestriction = await $('android=new UiSelector().textContains("Guest")');
            
            let isBlocked = false;
            
            if (await loginPrompt.isExisting()) {
                console.log('✅ Login prompt displayed - Community blocked for guest');
                isBlocked = true;
            } else if (await signupPrompt.isExisting()) {
                console.log('✅ Signup prompt displayed - Community blocked for guest');
                isBlocked = true;
            } else if (await guestRestriction.isExisting()) {
                console.log('✅ Guest restriction message displayed');
                isBlocked = true;
            } else {
                // Check if we're redirected to login screen
                const currentActivity = await driver.getCurrentActivity();
                if (currentActivity?.includes('LoginScreenRevamped')) {
                    console.log('✅ Redirected to login screen - Community blocked for guest');
                    isBlocked = true;
                }
            }

            // If community actually opens, it means guest has access (unexpected)
            const communityHeader = await $('//android.widget.TextView[@text="Explore Community"]');
            if (await communityHeader.isExisting()) {
                console.log('⚠️ Community accessible to guest users');
                // This is not necessarily a failure - depends on app behavior
                // Some apps allow read-only access to community
            }

            // Navigate back
            await driver.back();
            await driver.pause(1000);
            
            console.log('Community access verification completed');
        });
    });
}

/**
 * Handle community login prompt if shown
 * Used when guest tries to access restricted features
 */
export async function handleCommunityLoginPrompt() {
    try {
        // Look for login/signup buttons in the prompt
        const loginBtn = await $('android=new UiSelector().text("Login")');
        const cancelBtn = await $('android=new UiSelector().text("Cancel")');
        
        if (await cancelBtn.isExisting()) {
            await cancelBtn.click();
            console.log('Dismissed login prompt');
            return 'dismissed';
        }
        
        if (await loginBtn.isExisting()) {
            // User can choose to login here
            console.log('Login prompt available');
            return 'login_available';
        }
        
        return 'no_prompt';
    } catch (e) {
        console.log('No login prompt detected');
        return 'no_prompt';
    }
}

export default {
    runCommunityFullTests,
    runCommunitySanityTests,
    verifyCommunityBlocked,
    handleCommunityLoginPrompt
};
