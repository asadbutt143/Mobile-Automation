/**
 * Shared Analytics Test Module
 * Reusable analytics tests that can be run in any auth state
 */

import { CalendarPage } from '../../pageobjects/CalendarPage.js';
import { AnalyticsPage } from '../../pageobjects/AnalyticsPage.js';

/**
 * Run full analytics tests
 */
export async function runAnalyticsFullTests() {
    describe('Analytics Screen - Full', () => {
        
        let expectedPeriodStartDate;
        const analyticsPage = new AnalyticsPage();

        it('should get period start date from home screen', async () => {
            const calendarPage = new CalendarPage();
            const fullDateString = await calendarPage.validateDates();
            expectedPeriodStartDate = analyticsPage.formatDateToShort(fullDateString);
            console.log('Expected Period Start Date from Home (formatted):', expectedPeriodStartDate);
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
}

/**
 * Run analytics sanity tests (quick verification)
 */
export async function runAnalyticsSanityTests() {
    describe('Analytics Screen - Sanity', () => {
        
        const analyticsPage = new AnalyticsPage();

        it('should navigate to Analytics screen', async () => {
            await analyticsPage.navigateToAnalytics();
        });

        it('should verify Period Analytics section', async () => {
            await analyticsPage.verifyPeriodAnalyticsSection();
        });

        it('should navigate back to home', async () => {
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });
}

export default {
    runAnalyticsFullTests,
    runAnalyticsSanityTests
};
