export class CommunityPage {

    async navigateToCommunity() {
        // Click community button at the bottom navigation bar
        const community = await $('id=bubble3');
        await expect(community).toBeDisplayed();
        await community.click

        await expect($('//android.widget.TextView[@text="Explore Community"]')).toBeDisplayed();
        await driver.pause(2000);
        console.log('Community is opened');
    }

    async createPost(title, detail) {
        const community = await $('android=new UiSelector().description("Posts")');
        await expect(community).toBeDisplayed();
        await community.click();

        // Swipe down and verify posts
        await driver.swipeDown();
        await driver.swipeDown();
        await driver.swipeDown();

        await expect($('id=create_post_btn')).toBeDisplayed();
        await $('id=create_post_btn').click();
        console.log('Post is opened');
        await driver.pause(2000);

        // Write a Post
        await $('id=post_title_tv').setValue(title);
        // Enter text
        await $('id=post_detail_tv').setValue(detail);

        // Select image
        const image = await $('id=attach_img');
        await expect(image).toBeDisplayed();
        await image.click();
        await driver.pause(2000);

        // Take Picture
        const takePicture = await $('id=btn_gallery');
        await expect(takePicture).toBeDisplayed();
        await takePicture.click();
        await driver.pause(2000);

        // Handle permission popup
        const allowBtn = await $('android=new UiSelector().resourceIdMatches(".*permission_allow.*button")');
        try {
            // Wait briefly for popup to appear
            await allowBtn.waitForDisplayed({ timeout: 5000 });
            await allowBtn.click();
            await driver.pause(1000);
        } catch (e) {
            console.log('Permission popup did not appear or was already granted');
        }

        // Camera opens and take photo
        await driver.pause(2000);

        const shutterButton = await $('android=new UiSelector().resourceId("com.google.android.gms.optional_photopicker:id/icon_thumbnail").instance(0)');
        await expect(shutterButton).toBeDisplayed();
        await shutterButton.click();
        await driver.pause(2000);

        const cropMenu = await $('id=menu_crop');
        await expect(cropMenu).toBeDisplayed();
        await cropMenu.click();
        await driver.pause(2000);

        // Click save button
        await $('id=post_btn').click();
        await driver.pause(10000);

        await driver.swipeUp();
        await driver.swipeUp();
        await driver.swipeUp();

        // Verify post is created
        await expect($(`//android.widget.TextView[@text="${title}"]`)).toBeDisplayed();
        console.log('Post is created');
    }

    async editPost(newTitle, newDetail) {
        const community = await $('android=new UiSelector().resourceId("com.techsacare.periodtracker:id/ic_more_info").instance(0)');
        await expect(community).toBeDisplayed();
        await community.click();
        await driver.pause(2000);

        const editPost = await $('id=edit_post_view');
        await expect(editPost).toBeDisplayed();
        await editPost.click();
        await driver.pause(2000);

        await $('id=post_title_tv').setValue(newTitle);
        await driver.pause(2000);

        await $('id=post_detail_tv').setValue(newDetail);
        await driver.pause(2000);

        await $('id=post_btn').click();
        await driver.pause(2000);

        // Verify post is edited
        await expect($(`//android.widget.TextView[@text="${newTitle}"]`)).toBeDisplayed();
        console.log('Post is edited');
    }

    async likeCommentAndSharePost() {
        // Like the post
        const likeCount = Number(await $('id=like_count_tv').getText());
        console.log('Like count: ' + likeCount);
        const like = await $('id=like_img_view');
        await expect(like).toBeDisplayed();
        await like.click();
        await driver.pause(2000);

        // Verify like count increased
        const likeCountAfterLike = Number(await $('id=like_count_tv').getText());
        console.log('Like count after like: ' + likeCountAfterLike);
        await expect(likeCountAfterLike).toBeGreaterThan(likeCount);
        await driver.pause(2000);

        // Comment on the post
        const commentCount = Number(await $('id=post_comments_count_tv').getText());
        console.log('Comment count: ' + commentCount);
        const comment = await $('android=new UiSelector().className("android.widget.ImageView").instance(7)');
        await expect(comment).toBeDisplayed();
        await comment.click();
        await driver.pause(2000);

        await $('id=post_comment_et').setValue('Test Comment');
        await driver.pause(2000);

        await $('id=post_comment_btn').click();
        await driver.pause(2000);

        // Verify comment count increased
        const commentCountAfterComment = Number(await $('id=post_comments_count_tv').getText());
        console.log('Comment count after comment: ' + commentCountAfterComment);
        await expect(commentCountAfterComment).toBeGreaterThan(commentCount);
        await driver.pause(2000);

        const back_img = await $('id=back_img');
        await expect(back_img).toBeDisplayed();
        await back_img.click();
        await driver.pause(4000);

        // Notifications received for like and comment
        const notificationCount = Number(await $('id=notificationCount').getText());
        await expect(notificationCount).toBeGreaterThan(0);
        const notification = await $('id=community_notification_img');
        await expect(notification).toBeDisplayed();
        await notification.click();
        await driver.pause(2000);

        const notificationText = await $('android=new UiSelector().text("${username} has commented on you post!").instance(0)');
        await expect(notificationText).toBeDisplayed();
        await driver.pause(2000);

        const notificationText2 = await $('android=new UiSelector().text("${username} has liked your post!").instance(0)');
        await expect(notificationText2).toBeDisplayed();
        await driver.pause(2000);

        const communityHealthImg = await $('id=community_health_img');
        await expect(communityHealthImg).toBeDisplayed();
        await communityHealthImg.click();
        await driver.pause(2000);

        // Share the post
        const communityHealthImg2 = await $('android=new UiSelector().resourceId("com.techsacare.periodtracker:id/ic_more_info").instance(0)');
        await expect(communityHealthImg2).toBeDisplayed();
        await communityHealthImg2.click();
        await driver.pause(2000);

        const sharePostView = await $('id=share_post_view');
        await expect(sharePostView).toBeDisplayed();
        await sharePostView.click();
        await driver.pause(2000);

        const sharePostView2 = await $('android=new UiSelector().text("WhatsApp")');
        await expect(sharePostView2).toBeDisplayed();
        await sharePostView2.click();
        await driver.pause(2000);

        const sharePostView3 = await $('android=new UiSelector().text("Asad Butt (You)")');
        await expect(sharePostView3).toBeDisplayed();
        await sharePostView3.click();
        await driver.pause(2000);

        await $('android=new UiSelector().resourceId("com.whatsapp:id/send")').click();
        await driver.pause(2000);

        await driver.back();
        await driver.pause(2000);

        // Go back to community
        await driver.back();
        await driver.pause(2000);
    }

    async deletePost(postTitle) {
        const community = await $('android=new UiSelector().resourceId("com.techsacare.periodtracker:id/ic_more_info").instance(0)');
        await expect(community).toBeDisplayed();
        await community.click();
        await driver.pause(2000);

        const deleteTv = await $('id=DeleteTv');
        await expect(deleteTv).toBeDisplayed();
        await deleteTv.click();
        await driver.pause(2000);

        const report_dialog_btn = await $('id=report_dialog_btn');
        await expect(report_dialog_btn).toBeDisplayed();
        await report_dialog_btn.click();
        await driver.pause(4000);

        // Verify post is deleted
        const post_text = await $(`android=new UiSelector().text("${postTitle}")`);
        await expect(post_text).not.toBeDisplayed();
        console.log('Post is deleted');
    }

    async exploreAndFilterPosts() {
        // Click filter button
        const filter_img = await $('id=filter_img');
        await expect(filter_img).toBeDisplayed();
        await filter_img.click();
        await driver.pause(1000);

        // Filter most liked posts
        const most_liked_posts = await $('id=radioMostLiked');
        await expect(most_liked_posts).toBeDisplayed();
        await most_liked_posts.click();
        await driver.pause(1000);

        // Apply filter
        const apply_filter = await $('id=btnApply');
        await expect(apply_filter).toBeDisplayed();
        await apply_filter.click();
        await driver.pause(1000);

        // Verify most liked posts are displayed by likes count
        const like_count_tv = Number(await $('id=like_count_tv').getText());
        await expect(like_count_tv).toBeGreaterThan(0);
        console.log('Like count of most liked posts: ' + like_count_tv);

        // Find category of most liked posts
        const category_tv = await $('id=main_category_tv').getText();
        console.log('Category of most liked posts: ' + category_tv);

        await driver.swipeDown();
        await driver.pause(1000);

        const like_count_tv2 = Number(await $('id=like_count_tv').getText());
        await expect(like_count_tv2).toBeLessThanOrEqual(like_count_tv);
        const category_tv2 = await $('id=main_category_tv').getText();
        console.log('Category of most liked posts: ' + category_tv2);

        await driver.swipeDown();
        await driver.pause(1000);

        const like_count_tv3 = Number(await $('id=like_count_tv').getText());
        await expect(like_count_tv3).toBeLessThanOrEqual(like_count_tv2);
        const category_tv3 = await $('id=main_category_tv').getText();
        console.log('Category of most liked posts: ' + category_tv3);

        await driver.swipeUp();
        await driver.swipeUp();

        // Explore different categories
        const period_category = await $('android=new UiSelector().text("Period Talk")');
        await expect(period_category).toBeDisplayed();
        await period_category.click();
        await driver.pause(1000);

        await driver.swipeDown();
        await driver.swipeDown();
        await driver.swipeUp();
        await driver.swipeUp();

        const memeify_category = await $('android=new UiSelector().text("Memeify")');
        await expect(memeify_category).toBeDisplayed();
        await memeify_category.click();
        await driver.pause(1000);

        await driver.swipeDown();
        await driver.swipeDown();
        await driver.swipeUp();
        await driver.swipeUp();

        console.log('Explored and filtered different categories of posts');
    }

    /**
     * Verify community access is blocked/restricted for guest users
     * @returns {Promise<{isRestricted: boolean, restrictionType: string}>}
     */
    async verifyCommunityBlocked() {
        // Click community button at the bottom navigation bar
        const community = await $('id=bubble3');
        await expect(community).toBeDisplayed();
        await community.click();
        await driver.pause(2000);

        let isRestricted = false;
        let restrictionType = 'none';

        // Check 1: Login prompt
        try {
            const loginPrompt = await $('android=new UiSelector().textContains("Login")');
            if (await loginPrompt.isDisplayed()) {
                console.log('✅ Login prompt displayed - Community requires login');
                isRestricted = true;
                restrictionType = 'login_prompt';
            }
        } catch (e) { /* Continue checking */ }

        // Check 2: Sign up prompt
        if (!isRestricted) {
            try {
                const signupPrompt = await $('android=new UiSelector().textContains("Sign up")');
                if (await signupPrompt.isDisplayed()) {
                    console.log('✅ Sign up prompt displayed - Community requires account');
                    isRestricted = true;
                    restrictionType = 'signup_prompt';
                }
            } catch (e) { /* Continue checking */ }
        }

        // Check 3: Guest restriction message
        if (!isRestricted) {
            try {
                const guestMsg = await $('android=new UiSelector().textContains("Guest")');
                if (await guestMsg.isDisplayed()) {
                    console.log('✅ Guest restriction message displayed');
                    isRestricted = true;
                    restrictionType = 'guest_message';
                }
            } catch (e) { /* Continue checking */ }
        }

        // Check 4: Redirected to login screen
        if (!isRestricted) {
            const currentActivity = await driver.getCurrentActivity();
            if (currentActivity?.includes('LoginScreenRevamped') || 
                currentActivity?.includes('Login')) {
                console.log('✅ Redirected to login screen - Community blocked for guest');
                isRestricted = true;
                restrictionType = 'redirect_to_login';
            }
        }

        // Check 5: Community opens (may be read-only for guests)
        if (!isRestricted) {
            try {
                const communityHeader = await $('//android.widget.TextView[@text="Explore Community"]');
                if (await communityHeader.isDisplayed()) {
                    console.log('⚠️ Community accessible to guest (may be read-only)');
                    restrictionType = 'accessible_readonly';
                    
                    // Check if post creation is blocked
                    try {
                        const createPostBtn = await $('id=create_post_btn');
                        if (await createPostBtn.isExisting()) {
                            await createPostBtn.click();
                            await driver.pause(2000);
                            
                            const loginRequired = await $('android=new UiSelector().textContains("Login")');
                            if (await loginRequired.isExisting()) {
                                console.log('✅ Post creation requires login');
                                isRestricted = true;
                                restrictionType = 'create_blocked';
                            }
                        }
                    } catch (e) {
                        console.log('Create post button not accessible');
                    }
                }
            } catch (e) { /* Community header not found */ }
        }

        // Navigate back
        try {
            await driver.back();
            await driver.pause(1000);
        } catch (e) { /* Already navigated */ }

        console.log(`Community restriction check: ${restrictionType}`);
        return { isRestricted, restrictionType };
    }

    /**
     * Handle login prompt when guest tries to access restricted community features
     * @returns {Promise<string>} Action taken: 'dismissed' | 'login_available' | 'no_prompt'
     */
    async handleCommunityLoginPrompt() {
        try {
            const cancelBtn = await $('android=new UiSelector().text("Cancel")');
            if (await cancelBtn.isExisting()) {
                await cancelBtn.click();
                console.log('Dismissed login prompt');
                return 'dismissed';
            }
            
            const loginBtn = await $('android=new UiSelector().text("Login")');
            if (await loginBtn.isExisting()) {
                console.log('Login prompt available');
                return 'login_available';
            }
            
            return 'no_prompt';
        } catch (e) {
            console.log('No login prompt detected');
            return 'no_prompt';
        }
    }
}

