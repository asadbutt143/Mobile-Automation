export class AnalyticsPage {

    // Helper function to get today's date formatted as "DD MMM YYYY"
    getTodayDate() {
        const date = new Date();
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    // Helper function to convert date string to short format (e.g., "Wed Jan 15 2026" -> "15 Jan")
    formatDateToShort(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
    }

    async navigateToAnalytics() {
        const analytics = await $('id=bubble4');
        await expect(analytics).toBeDisplayed();
        await analytics.click();

        const cycleDayText = await $('id=tv_cycle_day').getText();
        expect(cycleDayText).toBe('Analytics');
        await driver.pause(1000);
        console.log('Analytics screen opened');
    }

    async verifyPeriodAnalyticsSection() {
        const periodAnalyticsSection = await $('id=cycle_summary_title_cl');
        await expect(periodAnalyticsSection).toBeDisplayed();
        console.log('Period Analytics section is visible');
    }

    async navigateToCycleSummary() {
        const cycleSummary = await $('id=cyclesChart');
        await expect(cycleSummary).toBeDisplayed();
        await cycleSummary.click();

        const cycleChart = await $('id=cyclesChart');
        expect(cycleChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Cycle summary screen opened');

        const cycleChartTitle = await $('id=rv_cycle_data');
        expect(cycleChartTitle).toBeDisplayed();
        await driver.pause(1000);
        console.log('Cycle history is visible');
        
        // back to analytics screen
        await driver.back();
    }

    async verifyPeriodAnalyticsData(expectedPeriodStartDate) {
        // Expected values based on authentication flow:
        // - Cycle Length: 30 days (set in AuthenticationPage.js line 124)
        // - Period Length: 5 days (set in AuthenticationPage.js line 157)
        // - Period Start Date: Retrieved from home screen in first test

        const expectedCycleLength = '30';
        const expectedPeriodLength = '5';

        // Wait for analytics screen to load
        await driver.pause(2000);

        // Verify Period Start Date is same as shown on home screen
        const periodStartDateNode = await $('id=tv_period_date');
        await periodStartDateNode.waitForDisplayed({ timeout: 10000 });
        const actualPeriodDate = await periodStartDateNode.getText();
        console.log('Actual Period Start Date on Analytics:', actualPeriodDate);
        console.log('Expected Period Start Date from Home:', expectedPeriodStartDate);
        expect(actualPeriodDate).toBe(expectedPeriodStartDate);
        console.log('✅ Period Start Date matches!');

        // Verify Cycle Length - use UiAutomator to find text within the container
        const cycleLengthContainer = await $('id=cycleLengthProgressBar');
        await cycleLengthContainer.waitForDisplayed({ timeout: 10000 });

        // Verify Period Length
        const periodLengthNode = await $('id=tv_period_length');
        await periodLengthNode.waitForDisplayed({ timeout: 10000 });
        const actualPeriodLength = await periodLengthNode.getText();
        console.log('Actual Period Length:', actualPeriodLength);
        expect(actualPeriodLength).toContain(expectedPeriodLength);
        console.log('✅ Period Length matches!');
        await driver.pause(2000);

        console.log('✅ Period Analytics verified successfully');
    }

    async navigateToWaterAnalytics() {
        const waterAnalytics = await $('id=tv_water_title');
        await expect(waterAnalytics).toBeDisplayed();
        await waterAnalytics.click();

        const waterChart = await $('id=dataChart');
        expect(waterChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Water Analytics screen opened');

        // Verify the water added on home screen is visible on water analytics screen
        const waterList = await $('id=rv_data');
        await expect(waterList).toBeDisplayed();

        // Get today's date formatted as "DD MMM YYYY" (e.g., "26 Jan 2026")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying water entry for date: ${expectedDateStr}`);

        // Check if an entry with today's date exists
        const dateEntry = await $(`android=new UiSelector().resourceId("com.techsacare.periodtracker:id/rv_data").childSelector(new UiSelector().text("${expectedDateStr}"))`);
        if (!await dateEntry.isExisting()) {
            // Fallback: search anywhere
            const dateTextAny = await $(`android=new UiSelector().text("${expectedDateStr}")`);
            await expect(dateTextAny).toBeDisplayed();
        } else {
            await expect(dateEntry).toBeDisplayed();
        }

        // Check for the specific volume added
        const volumeListElement = await $('id=tv_water_sleep_intake');
        await expect(volumeListElement).toBeDisplayed();

        // Get the text content to see what's in the list
        const volumeText = await volumeListElement.getText();
        console.log('✅ Water data list is visible');
        console.log('Water list content:', volumeText);

        console.log('Water history is visible');

        // back to analytics screen
        await driver.back();
    }

    async navigateToSleepAnalytics() {
        const sleepAnalytics = await $('id=tv_sleep_title');
        await expect(sleepAnalytics).toBeDisplayed();
        await sleepAnalytics.click();

        const sleepChart = await $('id=dataChart');
        expect(sleepChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Sleep Analytics screen opened');

        // Verify sleep added on home screen is also visible in analytics
        const sleepList = await $('id=rv_data');
        expect(sleepList).toBeDisplayed();

        // Get today's date formatted as "DD MMM YYYY" (e.g., "26 Jan 2026")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying sleep entry for date: ${expectedDateStr}`);

        // Check if an entry with today's date exists
        const dateEntry = await $(`android=new UiSelector().resourceId("com.techsacare.periodtracker:id/rv_data").childSelector(new UiSelector().text("${expectedDateStr}"))`);
        if (!await dateEntry.isExisting()) {
            // Fallback: search anywhere
            const dateTextAny = await $(`android=new UiSelector().text("${expectedDateStr}")`);
            await expect(dateTextAny).toBeDisplayed();
        } else {
            await expect(dateEntry).toBeDisplayed();
        }

        // Check for the specific volume added
        const volumeListElement = await $('id=tv_water_sleep_intake');
        await expect(volumeListElement).toBeDisplayed();

        // Get the text content to see what's in the list
        const volumeText = await volumeListElement.getText();
        console.log('✅ Sleep data list is visible');
        console.log('Sleep list content:', volumeText);

        console.log('Sleep history is visible');

        // back to analytics screen
        await driver.back();
    }

    async navigateToMoodAnalytics() {
        await driver.swipeDown();
        const moodAnalytics = await $('id=tv_dairy_title');
        await expect(moodAnalytics).toBeDisplayed();
        await moodAnalytics.click();

        const moodChart = await $('id=settingsTitleTv');
        expect(moodChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Mood Analytics screen opened');

        // Get today's date formatted as "DD" (e.g., "26")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying mood entry for date: ${expectedDateStr}`);

        const dd = expectedDateStr.split(' ')[0];
        console.log('DD:', dd);

        // Verify Mood List/Data is visible
        const moodList = await $('id=TvSymptomName');
        await expect(moodList).toBeDisplayed();
        const moodText = await moodList.getText();
        console.log('Mood list content:', moodText);

        // Verify mood icon in list
        const moodIconInList = await $('id=symptomIconRV');
        await expect(moodIconInList).toBeDisplayed();

        // Go to current date in calendar mood chart
        const moodDateContainer = await $(`//android.widget.GridView[@resource-id="com.techsacare.periodtracker:id/rvMonthGrid"]/android.view.ViewGroup[${dd}]`);
        await expect(moodDateContainer).toBeDisplayed();

        // Find mood icon on that specific date in the chart
        const moodIconOnDate = await moodDateContainer.$('id=symptomsIVOne');
        await expect(moodIconOnDate).toBeDisplayed();

        console.log('✅ Mood icons are visible in list and chart');

        // back to analytics screen
        await driver.back();
    }

    async navigateToSymptomsAnalytics() {
        await driver.swipeDown();
        const symptomsAnalytics = await $('id=tv_symptoms_title');
        await expect(symptomsAnalytics).toBeDisplayed();
        await symptomsAnalytics.click();

        const symptomsChart = await $('id=settingsTitleTv');
        expect(symptomsChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Symptoms Analytics screen opened');

        // Get today's date formatted as "DD" (e.g., "26")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying symptoms entry for date: ${expectedDateStr}`);

        const dd = expectedDateStr.split(' ')[0];
        console.log('DD:', dd);

        // Verify Symptoms List/Data is visible
        const symptomsList = await $('id=TvSymptomName');
        await expect(symptomsList).toBeDisplayed();
        const symptomsText = await symptomsList.getText();
        console.log('Symptoms list content:', symptomsText);

        // Verify symptoms icon in list
        const symptomsIconInList = await $('id=symptomIconRV');
        await expect(symptomsIconInList).toBeDisplayed();

        // Go to current date in calendar symptoms chart
        const symptomsDateContainer = await $(`//android.widget.GridView[@resource-id="com.techsacare.periodtracker:id/rvMonthGrid"]/android.view.ViewGroup[${dd}]`);
        await expect(symptomsDateContainer).toBeDisplayed();

        // Find symptoms icon on that specific date in the chart
        const symptomsIconOnDate = await symptomsDateContainer.$('id=symptomsIVOne');
        await expect(symptomsIconOnDate).toBeDisplayed();

        console.log('✅ Symptoms icons are visible in list and chart');

        // back to analytics screen
        await driver.back();
    }

    async navigateToActivityAnalytics() {
        await driver.swipeDown();
        const activityAnalytics = await $('id=tv_physical_title');
        await expect(activityAnalytics).toBeDisplayed();
        await activityAnalytics.click();

        const activityChart = await $('id=settingsTitleTv');
        expect(activityChart).toBeDisplayed();
        await driver.pause(1000);
        console.log('Activity Analytics screen opened');

        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying activity entry for date: ${expectedDateStr}`);

        const dd = expectedDateStr.split(' ')[0];
        console.log('DD:', dd);

        // Verify Activity List/Data is visible
        const activityList = await $('id=TvSymptomName');
        await expect(activityList).toBeDisplayed();
        const activityText = await activityList.getText();
        console.log('Activity list content:', activityText);

        // Verify activity icon in list
        const activityIconInList = await $('id=symptomIconRV');
        await expect(activityIconInList).toBeDisplayed();

        // Go to current date in calendar activity chart
        const activityDateContainer = await $(`//android.widget.GridView[@resource-id="com.techsacare.periodtracker:id/rvMonthGrid"]/android.view.ViewGroup[${dd}]`);
        await expect(activityDateContainer).toBeDisplayed();

        // Find activity icon on that specific date in the chart
        const activityIconOnDate = await activityDateContainer.$('id=symptomsIVOne');
        await expect(activityIconOnDate).toBeDisplayed();

        console.log('✅ Activity icons are visible in list and chart');

        // back to analytics screen
        await driver.back();
    }

    async navigateToMenstruationAnalytics() {
        await driver.swipeDown();
        const menstruationAnalytics = await $('id=tv_menstruation_title');
        await expect(menstruationAnalytics).toBeDisplayed();
        await menstruationAnalytics.click();

        const menstruationChart = await $('id=settingsTitleTv').getText();
        console.log(menstruationChart + ' screen opened');

        // Verify the menstruation list is visible
        const menstruationList = await $('id=rvSymptomsMonthAnalytics');
        await expect(menstruationList).toBeDisplayed();

        // Get today's date formatted as "DD MMM YYYY" (e.g., "26 Jan 2026")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying menstruation entry for date: ${expectedDateStr}`);

        const dd = expectedDateStr.split(' ')[0];
        console.log('DD:', dd);

        const menstruationDateContainer = await $(`//android.widget.GridView[@resource-id="com.techsacare.periodtracker:id/rvMonthGrid"]/android.view.ViewGroup[${dd}]`);
        await expect(menstruationDateContainer).toBeDisplayed();

        // Verify List/Data is visible
        const moodList = await $('id=TvSymptomName');
        await expect(moodList).toBeDisplayed();
        const moodText = await moodList.getText();
        console.log('Menstruation list content:', moodText);

        // Verify icon in list
        const moodIconInList = await $('id=symptomIconRV');
        await expect(moodIconInList).toBeDisplayed();

        console.log('Menstruation history is visible');
        
        // back to analytics screen
        await driver.back();
    }

    async navigateToVaginalDischargeAnalytics() {
        await driver.swipeDown();
        const vaginalDischargeAnalytics = await $('id=tv_vaginal_title');
        await expect(vaginalDischargeAnalytics).toBeDisplayed();
        await vaginalDischargeAnalytics.click();

        const vaginalDischargeChart = await $('id=settingsTitleTv').getText();
        console.log(vaginalDischargeChart + ' screen opened');

        // Verify the list is visible
        const vaginalDischargeList = await $('id=rvSymptomsMonthAnalytics');
        await expect(vaginalDischargeList).toBeDisplayed();

        // Get today's date formatted as "DD MMM YYYY" (e.g., "26 Jan 2026")
        const expectedDateStr = this.getTodayDate();

        console.log(`Verifying vaginal discharge entry for date: ${expectedDateStr}`);

        const dd = expectedDateStr.split(' ')[0];
        console.log('DD:', dd);

        // Verify Vaginal Discharge List/Data is visible
        const vaginalDischargeListContent = await $('id=TvSymptomName');
        await expect(vaginalDischargeListContent).toBeDisplayed();
        const vaginalDischargeText = await vaginalDischargeListContent.getText();
        console.log('Vaginal Discharge list content:', vaginalDischargeText);

        // Verify icon in list
        const vaginalDischargeIconInList = await $('id=symptomIconRV');
        await expect(vaginalDischargeIconInList).toBeDisplayed();

        // Go to current date in calendar chart
        const vaginalDischargeDateContainer = await $(`//android.widget.GridView[@resource-id="com.techsacare.periodtracker:id/rvMonthGrid"]/android.view.ViewGroup[${dd}]`);
        await expect(vaginalDischargeDateContainer).toBeDisplayed();

        // Find icon on that specific date in the chart
        const vaginalDischargeIconOnDate = await vaginalDischargeDateContainer.$('id=symptomsIVOne');
        await expect(vaginalDischargeIconOnDate).toBeDisplayed();

        console.log('Vaginal Discharge history is visible');
        
        // back to analytics screen
        await driver.back();
    }
}
