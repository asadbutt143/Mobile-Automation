/**
 * Signup Flow - Step 5: Community Testing
 * Test community features (requires logged-in user)
 */

import { CommunityPage } from '../../pageobjects/CommunityPage.js';
import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 1: Signup Flow - Community', () => {

    const communityPage = new CommunityPage();

    before(async () => {
        // Ensure we're on home screen before starting community tests
        await navigateToHome();
    });

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
