import { getText } from 'appium-uiautomator2-driver/build/lib/commands/element.js';
import { scrollToValue } from '../utils.js';


export class MySpacePage {


    async trackWaterIntake() {
        // Ensure we are in My Space view
        const my_space = await $('id=tv_myself');
        // Basic swipe to ensure content is loaded/refreshed
        await driver.swipeDown();

        // Verify Water Entry
        const waterNode = await $('id=tv_water');
        await waterNode.waitForDisplayed({ timeout: 10000 });
        expect(waterNode).toBeDisplayed();
        console.log('Water Module detected');

        // Click on water
        await waterNode.click();
        await driver.pause(1000);

        // Click water intake settings
        await $('id=iv_settings').click();
        await driver.pause(1000);

        // Set water intake goal
        await $('id=ll_water_goal_data').click();
        await driver.pause(1000);

        // Set goal 2.5 Litres by scrolling the values
        await scrollToValue('id=iv_divider', '2');
        await scrollToValue('id=iv_divider_2', '0');
        await driver.pause(1000);

        // Click save button
        await $('id=btn_save').click();
        await driver.pause(1000);

        // Select serving size
        await $('id=ll_water_serving_data').click();
        await driver.pause(1000);

        // Set serving size to 250ml by selecting a value
        await $('id=ll_point_25l').click();
        await driver.pause(1000);

        // Click save button
        await $('id=btn_save').click();
        await driver.pause(1000);
        /*
                // Click water reminder settings
                await $('id=ll_water_reminder_data').click();
                await driver.pause(1000);
        
                // Select reminder time by scrolling values
                await scrollToValue('id=iv_divider_2', '3');
                await driver.pause(1000);
        
                // Click save button
                await $('id=btn_save').click();
                await driver.pause(1000);
        
                // Enable reminder notification toggle button
                await $('id=sw_reminder').click();
                await driver.pause(1000);
        */
        // Click save button (Main Screen)
        await driver.swipeDown();
        await $('id=btnSave').click();
        await driver.pause(1000);

        const tvSelectedDateNode = await $('id=tvSelectedDate');
        expect(tvSelectedDateNode).toBeDisplayed();
        console.log('Adding water intake on:', await tvSelectedDateNode.getText());

        // Add water intake and verify progress
        await $('id=btn_plus').click();
        await driver.pause(1000);
        const progressBar = await $('id=progressbar');
        await progressBar.waitForDisplayed({ timeout: 1000 });
        console.log('Progress Bar:', await progressBar.getText());
        expect(progressBar).toBeDisplayed();

        // Add water until 100% goal is met
        let currentProgress = 0;
        let clicks = 0;
        const maxClicks = 25;

        console.log('--- Starting Water Intake Loop ---');
        let progressText = await progressBar.getText();
        currentProgress = parseFloat(progressText);
        console.log(`Initial Progress: ${currentProgress}%`);

        while (currentProgress < 100 && clicks < maxClicks) {
            await $('id=btn_plus').click();
            await driver.pause(1500);

            progressText = await progressBar.getText();
            currentProgress = parseFloat(progressText);
            console.log(`Click ${clicks + 1}: Progress is now ${currentProgress}%`);
            clicks++;
        }

        if (currentProgress >= 100) {
            console.log('✅ Daily water goal reached!');
        } else {
            console.warn('⚠️ Loop finished but goal might not be reached fully.');
        }

        await driver.swipeDown();
        await $('id=btnSave').click();
        await driver.pause(1000);
    }

    async verifySleepModule() {
        const sleepNode = await $('id=tv_sleep');
        await sleepNode.waitForDisplayed({ timeout: 10000 });
        console.log('Sleep Module:', await sleepNode.getText());
        expect(sleepNode).toBeDisplayed();

        await sleepNode.click();
        await driver.pause(1000);

        //click add sleep button
        await $('id=btnAddSleep').click();
        await driver.pause(1000);

        //click bed time
        await $('id=tvBedTime').click();
        await driver.pause(1000);

        //Select bed time on clock
        await $('//android.widget.TextView[@content-desc="12 o\'clock"]').click();
        await driver.pause(1000);

        await $('//android.widget.TextView[@content-desc="00 minutes"]').click();
        await driver.pause(1000);

        await $('id=material_clock_period_am_button').click();
        await driver.pause(1000);

        //click save button
        await $('id=material_timepicker_ok_button').click();
        await driver.pause(1000);

        //click wake up time
        await $('id=tvWakeUpTime').click();
        await driver.pause(1000);

        //Select wake up time on clock
        await $('//android.widget.TextView[@content-desc="6 o\'clock"]').click();
        await driver.pause(1000);

        await $('//android.widget.TextView[@content-desc="00 minutes"]').click();
        await driver.pause(1000);

        await $('id=material_clock_period_am_button').click();
        await driver.pause(1000);

        //click save button
        await $('id=material_timepicker_ok_button').click();
        await driver.pause(1000);

        //click save button 
        await $('id=btnSave').click();
        await driver.pause(1000);

        const sleepStatsText = await $('id=tvSleepStats').getText();

        const sleepStatsTextValue = sleepStatsText.split('of')[0].trim();

        //only select text before "of the cliff" and click on it
        console.log('Sleep Stats:', sleepStatsTextValue);
        //swipe down
        await driver.swipeDown();
        await driver.pause(1000);

        //click save button
        await $('id=btnSave').click();
        await driver.pause(1000);

        // Return the sleep stats value for use in analytics verification
        return sleepStatsTextValue;
    }

    async verifySymptomsModule() {
        const symptomsNode = await $('id=tv_symptoms');
        await symptomsNode.waitForDisplayed({ timeout: 10000 });
        console.log('Symptoms Module:', await symptomsNode.getText());
        expect(symptomsNode).toBeDisplayed();

        await symptomsNode.click();
        await driver.pause(1000);

        //select at least 3 symptoms from list "rvSymptoms" i-e Acne, Cramps, Fatigue etc
        await scrollToValue('id=rvSymptoms', 'Acne' || 'Bloating');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Cramps' || 'Dizzy');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Fatigue' || 'Headache');
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);
    }

    async verifyDiaryModule() {
        const diaryNode = await $('id=tv_diary');
        await diaryNode.waitForDisplayed({ timeout: 10000 });
        console.log('Diary Module:', await diaryNode.getText());
        expect(diaryNode).toBeDisplayed();

        await diaryNode.click();
        await driver.pause(1000);

        //click add image in diary button
        await $('id=btnAttachImageLayout').click();
        await driver.pause(1000);

        //click take photo button
        await $('id=btnTakeCameraPhoto').click();
        await driver.pause(1000);

        // Handle permission popup ONLY if it appears
        // Handle permission popup (Allow or While using the app)
        // Using regex to match both 'permission_allow_button' and 'permission_allow_foreground_only_button'
        const allowBtn = await $('android=new UiSelector().resourceIdMatches(".*permission_allow.*button")');
        try {
            // Wait briefly for popup to appear
            await allowBtn.waitForDisplayed({ timeout: 5000 });
            await allowBtn.click();
            await driver.pause(1000);
        } catch (e) {
            console.log('Permission popup did not appear or was already granted');
        }
        //camera opens and take photo
        await driver.pause(5000);
        await $('id=btnCapture').click();
        await driver.pause(2000);

        //select captured image
        await $('id=btnRight').click();
        await driver.pause(2000);

        await $('id=btnRight').click();
        await driver.pause(1000);

        //enter diary caption
        await $('id=etDiaryNotes').setValue('Test Diary');
        await driver.pause(1000);

        //swipe down
        await driver.swipeDown();
        await driver.pause(1000);


        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);
    }

    async verifyExploreMySpaceModule() {

        await driver.swipeUp();
        await driver.swipeUp();
        // Ensure we are in My Space view
        const my_spaceNode = await $('id=tv_myself');
        // Basic swipe to ensure content is loaded/refreshed


        //click explore icon
        const exploreNode = await $('id=iv_my_space_explore');
        await exploreNode.waitForDisplayed({ timeout: 10000 });
        console.log('Explore Module:', await exploreNode.getText());
        expect(exploreNode).toBeDisplayed();

        await exploreNode.click();
        await driver.pause(1000);

        //my space module opens
        const my_space = await $('id=main');
        await my_space.waitForDisplayed({ timeout: 10000 });
        console.log('My Space Module:', await my_space.getText());
        expect(my_space).toBeDisplayed();

        await driver.pause(1000);

        //uncheck physical activity and mood
        const physical_activity_heart = await $('id=iv_physical_heart');
        //  await physical_activity_heart.click();
        //  await driver.pause(1000);
        const mood_heart = await $('id=iv_mood_heart');
        //  await mood_heart.click();
        //  await driver.pause(1000);

        //select modules to show on home screen
        //water and sleep are selected always
        //only 2 more can be selected from Symptoms, diary, Physical activity, Mood that will be visible on home screen along with water and sleep
        const symptoms = await $('id=iv_symptoms_heart');
        //  await symptoms.click();
        //  await driver.pause(1000);

        //select diary
        const diary = await $('id=iv_diary_heart');
        //  await diary.click();
        //  await driver.pause(1000);

        const physical_activity = await $('id=tv_physical_activity');
        await physical_activity.click();
        await driver.pause(1000);
        //select at least 3 symptoms from list "rvSymptoms" i-e Acne, Cramps, Fatigue etc
        await scrollToValue('id=rvSymptoms', 'Walking' || 'Yoga');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Running' || 'Swimming');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'No Exercise' || 'Gym');
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);

        const mood = await $('id=tv_mood');
        await mood.click();
        await driver.pause(1000);

        //select mood
        await $('id=rvSymptoms', 'Happy').click();
        await driver.pause(1000);
        await $('id=rvSymptoms', 'Calm').click();
        await driver.pause(1000);
        await $('id=rvSymptoms', 'Angry').click();
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);

        //click save button
        await $('id=backBtn').click();
        await driver.pause(1000);

        //verify symptoms and diary are visible
        const symptomsNode = await $('id=tv_symptoms');
        expect(symptomsNode).toBeDisplayed();
        console.log('Symptoms Module is visible');

        const diaryNode = await $('id=tv_diary');
        expect(diaryNode).toBeDisplayed();
        console.log('Diary Module is visible');

        await driver.swipeDown();
        await driver.pause(1000);

        //Again click explore icon

        await exploreNode.click();
        await driver.pause(1000);

        //my space module opens
        expect(my_space).toBeDisplayed();

        await driver.pause(1000);

        //uncheck symptoms and diary

        await symptoms.click();
        await driver.pause(1000);

        await diary.click();
        await driver.pause(1000);


        await physical_activity_heart.click();
        await driver.pause(1000);

        await mood_heart.click();
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);

        //verify physical activity and mood are visible

        expect(diaryNode).toBeDisplayed()
        const text1 = await diaryNode.getText();
        expect(text1).toBe("Physical Activity");
        console.log('Physical Activity Module is visible');


        expect(symptomsNode).toBeDisplayed();

        const text = await symptomsNode.getText();
        expect(text).toBe("Mood");

        console.log("Mood Module is visible");
    }

    async verifyPhysicalActivityModule() {
        const physicalActivityNode = await $('id=tv_diary');
        await physicalActivityNode.waitForDisplayed({ timeout: 10000 });
        const text1 = await physicalActivityNode.getText();
        expect(text1).toBe("Physical Activity");
        console.log('Physical Activity Module:', await physicalActivityNode.getText());
        expect(physicalActivityNode).toBeDisplayed();

        await physicalActivityNode.click();
        await driver.pause(1000);

        //select at least 3 physical activity from list "rvSymptoms".
        await scrollToValue('id=rvSymptoms', 'Walking' || 'Yoga');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Running' || 'Swimming');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'No Exercise' || 'Gym');
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);


    }

    async verifyMoodModule() {
        const moodNode = await $('id=tv_symptoms');
        await moodNode.waitForDisplayed({ timeout: 10000 });
        const text1 = await moodNode.getText();
        expect(text1).toBe("Mood");
        console.log('Mood Module:', await moodNode.getText());
        expect(moodNode).toBeDisplayed();

        await moodNode.click();
        await driver.pause(1000);

        //select mood
        await scrollToValue('id=rvSymptoms', 'Happy');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Calm');
        await driver.pause(1000);
        await scrollToValue('id=rvSymptoms', 'Angry');
        await driver.pause(1000);

        //click save button
        await $('id=btn_save').click();
        await driver.pause(1000);
    }
}


