/**
 * Google SSO Flow - Step 3: Core Features Testing
 * Execute full feature tests for Google SSO user
 */

import { CalendarPage } from '../../pageobjects/CalendarPage.js';
import { MySpacePage } from '../../pageobjects/MySpacePage.js';
import { AIBuddyPage } from '../../pageobjects/AIBuddyPage.js';
import { AnalyticsPage } from '../../pageobjects/AnalyticsPage.js';

describe('Phase 3: Google SSO Flow - Core Features', () => {

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
            await aiBuddyPage.askQuestion('What are common PMS symptoms?');
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

});
