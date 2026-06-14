import { CommunityPage } from '../pageobjects/CommunityPage.js';

describe('Community Module', () => {

    it('Go to community module', async () => {
        const communityPage = new CommunityPage();
        await communityPage.navigateToCommunity();
    });

    it('Create a Post', async () => {
        const communityPage = new CommunityPage();
        await communityPage.createPost('Test Post', 'This is a test post');
    });

    it('Edit a Post', async () => {
        const communityPage = new CommunityPage();
        await communityPage.editPost('Edited Post', 'Edited Post Detail');
    });

    it('Like, comment and share a post', async () => {
        const communityPage = new CommunityPage();
        await communityPage.likeCommentAndSharePost();
    });

    it('Delete a Post', async () => {
        const communityPage = new CommunityPage();
        await communityPage.deletePost('Edited Post');
    });

    it('Explore and filter different categories of posts', async () => {
        const communityPage = new CommunityPage();
        await communityPage.exploreAndFilterPosts();
    });

});

