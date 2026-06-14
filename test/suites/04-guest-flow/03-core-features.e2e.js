/**
 * Guest Flow - Step 3: Core Features Testing
 * Execute all guest-allowed feature tests
 */

import { CalendarPage } from '../../pageobjects/CalendarPage.js';
import { MySpacePage } from '../../pageobjects/MySpacePage.js';
import { AIBuddyPage } from '../../pageobjects/AIBuddyPage.js';
import { AnalyticsPage } from '../../pageobjects/AnalyticsPage.js';
import { SettingPage } from '../../pageobjects/SettingPage.js';

describe('Phase 4: Guest Flow - Core Features', () => {

    global.sleepStatsValue = null;

    describe('Home & Calendar', () => {
        
        it('should validate calendar dates', async () => {
            const calendarPage = new CalendarPage();
            await calendarPage.validateDates();
        });

        it('should edit period dates', async () => {
            const calendarPage = new CalendarPage();
            const periodInfo = await calendarPage.editPeriodDates();
            await calendarPage.validateDates(
                periodInfo.periodStartDate,
                periodInfo.periodLength,
                periodInfo.cycleLength
            );
        });

        it('should interact with AI Buddy', async () => {
            const aiBuddyPage = new AIBuddyPage();
            await aiBuddyPage.askQuestion('How to track my cycle?');
        });
    });

    describe('My Space Modules', () => {
        
        it('should track water intake', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.trackWaterIntake();
        });

        it('should verify sleep module', async () => {
            const mySpacePage = new MySpacePage();
            global.sleepStatsValue = await mySpacePage.verifySleepModule();
        });

        it('should verify symptoms module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifySymptomsModule();
        });

        it('should verify diary module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifyDiaryModule();
        });

        it('should verify explore my space module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifyExploreMySpaceModule();
        });

        it('should verify Physical Activity module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifyPhysicalActivityModule();
        });

        it('should verify Mood module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifyMoodModule();
        });
    });

    describe('Analytics', () => {
        
        let expectedPeriodStartDate;
        const analyticsPage = new AnalyticsPage();

        it('should get period start date from home screen', async () => {
            const calendarPage = new CalendarPage();
            const fullDateString = await calendarPage.validateDates();
            expectedPeriodStartDate = analyticsPage.formatDateToShort(fullDateString);
        });

        it('should navigate to Analytics screen', async () => {
            await analyticsPage.navigateToAnalytics();
        });

        it('should verify Period Analytics section', async () => {
            await analyticsPage.verifyPeriodAnalyticsSection();
        });

        it('should navigate to Cycle summary screen', async () => {
            await analyticsPage.navigateToCycleSummary();
        });

        it('should verify Period Analytics data', async () => {
            await analyticsPage.verifyPeriodAnalyticsData(expectedPeriodStartDate);
        });

        it('should navigate to Water Analytics screen', async () => {
            await analyticsPage.navigateToWaterAnalytics();
        });

        it('should navigate to Sleep Analytics screen', async () => {
            await analyticsPage.navigateToSleepAnalytics();
        });

        it('should navigate to Mood Analytics screen', async () => {
            await analyticsPage.navigateToMoodAnalytics();
        });

        it('should navigate to Symptoms Analytics screen', async () => {
            await analyticsPage.navigateToSymptomsAnalytics();
        });

        it('should navigate to Activity Analytics screen', async () => {
            await analyticsPage.navigateToActivityAnalytics();
        });

        it('should navigate to Menstruation Analytics screen', async () => {
            await analyticsPage.navigateToMenstruationAnalytics();
        });

        it('should navigate to Vaginal Discharge Analytics screen', async () => {
            await analyticsPage.navigateToVaginalDischargeAnalytics();
        });
    });

    describe('Settings', () => {
        
        const settingPage = new SettingPage();
        let randomPin;

        it('should navigate to settings screen', async () => {
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
            
            await settingPage.navigateToSettings();
        });

        it('should open Terms & Conditions', async () => {
            await driver.swipeDown();
            await driver.swipeDown();
            await settingPage.openTermsAndConditions();
        });

        it('should rate the app', async () => {
            await settingPage.rateApp();
        });

        it('should toggle notifications', async () => {
            await settingPage.toggleNotifications();
        });

        it('should apply PIN to app', async () => {
            await driver.swipeUp();
            await settingPage.openAccessCode();
            await settingPage.toggleAccessCodeSwitch();
            await settingPage.clickKeypad();

            randomPin = settingPage.generateRandomPin();
            await settingPage.enterPin(randomPin);
            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            await settingPage.verifyOnHomeScreen();
        });

        it('should verify PIN on app relaunch', async () => {
            await driver.closeApp();
            await driver.pause(6000);
            await driver.launchApp();
            await driver.pause(3000);

            await settingPage.verifyAccessCodeTitle('Enter Access Code');
            await driver.pause(2000);

            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            await settingPage.verifyOnHomeScreen();
        });

        it('should disable PIN', async () => {
            await settingPage.navigateToSettings();
            await settingPage.openAccessCode();
            await settingPage.toggleAccessCodeSwitch();
            await settingPage.clickKeypad();

            await settingPage.enterPin(randomPin);
            await driver.pause(2000);

            await settingPage.verifyAccessCodeTitle('Access Code');
        });
    });

});
