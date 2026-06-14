import { CalendarPage } from '../pageobjects/CalendarPage.js';
import { AnalyticsPage } from '../pageobjects/AnalyticsPage.js';


describe('Analytics Screen', () => {

    let expectedPeriodStartDate;
    const analyticsPage = new AnalyticsPage();

    it('Get period start date from home screen', async () => {
        const calendarPage = new CalendarPage();
        // Call validateDates to navigate the calendar and get the period start date
        const fullDateString = await calendarPage.validateDates();
        expectedPeriodStartDate = analyticsPage.formatDateToShort(fullDateString);
        console.log('Expected Period Start Date from Home (formatted):', expectedPeriodStartDate);
    });

    it('Navigate to Analytics screen', async () => {
        await analyticsPage.navigateToAnalytics();
    });

    it('Verify Period Analytics section', async () => {
        await analyticsPage.verifyPeriodAnalyticsSection();
    });

    it('Navigate to Cycle summary screen', async () => {
        await analyticsPage.navigateToCycleSummary();
    });

    it('Verify Period Analytics data', async () => {
        await analyticsPage.verifyPeriodAnalyticsData(expectedPeriodStartDate);
    });

    it('Navigate to Water Analytics screen', async () => {
        await analyticsPage.navigateToWaterAnalytics();
    });

    it('Navigate to Sleep Analytics screen', async () => {
        await analyticsPage.navigateToSleepAnalytics();
    });

    it('Navigate to Mood Analytics screen', async () => {
        await analyticsPage.navigateToMoodAnalytics();
    });

    it('Navigate to Symptoms Analytics screen', async () => {
        await analyticsPage.navigateToSymptomsAnalytics();
    });

    it('Navigate to Activity Analytics screen', async () => {
        await analyticsPage.navigateToActivityAnalytics();
    });

    it('Navigate to Menstruation Analytics screen', async () => {
        await analyticsPage.navigateToMenstruationAnalytics();
    });

    it('Navigate to Vaginal Discharge Analytics screen', async () => {
        await analyticsPage.navigateToVaginalDischargeAnalytics();
    });

});
