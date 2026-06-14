/**
 * Google SSO Flow - Step 4: Community Testing
 * Test community features for Google SSO user
 */

import { CommunityPage } from '../../pageobjects/CommunityPage.js';
import { navigateToHome } from '../../helpers/authHelper.js';

describe('Phase 3: Google SSO Flow - Community', () => {

    const communityPage = new CommunityPage();

    before(async () => {
        await navigateToHome();
    });

    it('should navigate to community module', async () => {
        await communityPage.navigateToCommunity();
    });

    it('should create a post', async () => {
        await communityPage.createPost('Google User Post', 'This is a post from Google SSO user');
    });

    it('should edit a post', async () => {
        await communityPage.editPost('Edited Google Post', 'Edited by Google user');
    });

    it('should like, comment and share a post', async () => {
        await communityPage.likeCommentAndSharePost();
    });

    it('should delete a post', async () => {
        await communityPage.deletePost('Edited Google Post');
    });

    it('should explore and filter different categories of posts', async () => {
        await communityPage.exploreAndFilterPosts();
    });

});
