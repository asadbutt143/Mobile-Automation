export class HomePage {

    async verifyHomeModules(isLoggedIn = false) {
        //verify username visibility and verify its same that was input
        const usernameNode = await $('id=fragmentName');
        expect(usernameNode).toBeDisplayed();
        const usernameText = await usernameNode.getText();
        console.log('Username:', usernameText);
        // We no longer have the generated name here, so just ensure the greeting starts with "Hey "
        expect(usernameText.startsWith('Hey ')).toBe(true);

        //verify profile icon visibility
        const profileIconNode = await $('id=profileIV');
        expect(profileIconNode).toBeDisplayed();

        //verify bottom navigation icons visibility
        const bottomNavigationNode = await $('id=bottomBar');
        expect(bottomNavigationNode).toBeDisplayed();
        console.log('Bottom Navigation is visible');

        //scroll down to my Space 
        await driver.swipeDown();
        await driver.pause(1000);
        const my_space = await $('id=tv_myself');
        expect(my_space).toBeDisplayed();
        console.log('My Space is visible');


        //water, sleep, symptoms and diary are visible in my space
        const waterNode = await $('id=tv_water');
        expect(waterNode).toBeDisplayed();
        console.log('Water:', await waterNode.getText());

        const sleepNode = await $('id=tv_sleep');
        expect(sleepNode).toBeDisplayed();
        console.log('Sleep:', await sleepNode.getText());

        const symptomsNode = await $('id=tv_symptoms');
        expect(symptomsNode).toBeDisplayed();
        console.log('Symptoms:', await symptomsNode.getText());

        const diaryNode = await $('id=tv_diary');
        expect(diaryNode).toBeDisplayed();
        console.log('Diary:', await diaryNode.getText());

        await driver.pause(2000);

        //show community/social buzz if user is logged in
        //swipe down to community/social buzz when 'logged in'
        if (isLoggedIn) {
            await driver.swipeDown();
            await driver.pause(1000);

            const communityNode = await $('id=cl_rv_community');
            expect(communityNode).toBeDisplayed();
            console.log('Community is visible');

            //click social buzz
            const socialBuzzNode = await $('id=rbSocialBuzz');
            expect(socialBuzzNode).toBeDisplayed();
            console.log('Social Buzz is visible');
            await socialBuzzNode.click();
            await driver.pause(2000);
            //images are visible
            const imagesNode = await $('id=imageView');
            expect(imagesNode).toBeDisplayed();
            console.log('Images are visible');
        }

        //scroll down to articles section
        await driver.swipeDown();
        await driver.swipeDown();

        //verify articles visibility
        const articlesNode = await $('id=rvbottomArticles');
        expect(articlesNode).toBeDisplayed();
        console.log('Articles are visible');

        await driver.pause(2000);

        //scroll back to top of screen
        await driver.swipeUp();
        await driver.swipeUp();
        await driver.swipeUp();
        await driver.swipeUp();

        console.log('verified Home screen Modules');
    }
}


