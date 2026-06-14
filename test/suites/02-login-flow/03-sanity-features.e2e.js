/**
 * Login Flow - Step 3: Quick Feature Sanity
 * Run sanity tests to verify features work after login
 * (Skip full tests as they were done in signup flow)
 */

import { CalendarPage } from '../../pageobjects/CalendarPage.js';
import { AnalyticsPage } from '../../pageobjects/AnalyticsPage.js';

describe('Phase 2: Login Flow - Feature Sanity', () => {

    describe('Calendar Sanity', () => {
        
        it('should navigate to Calendar screen', async () => {
            const calendarBtn = await $('id=bubble2');
            await expect(calendarBtn).toBeDisplayed();
            await calendarBtn.click();

            const calendarTitle = await $('id=settingsTitleTv').getText();
            expect(calendarTitle).toBe('Calender');
            await driver.pause(1000);
            console.log('✅ Calendar screen accessible');
        });

        it('should navigate back to home', async () => {
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });

    describe('Analytics Sanity', () => {
        
        it('should navigate to Analytics screen', async () => {
            const analyticsPage = new AnalyticsPage();
            await analyticsPage.navigateToAnalytics();
            console.log('✅ Analytics screen accessible');
        });

        it('should verify Period Analytics section', async () => {
            const analyticsPage = new AnalyticsPage();
            await analyticsPage.verifyPeriodAnalyticsSection();
        });

        it('should navigate back to home', async () => {
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });

    describe('Data Persistence Check', () => {
        
        it('should verify calendar dates are persisted', async () => {
            const calendarPage = new CalendarPage();
            await calendarPage.validateDates();
            console.log('✅ Calendar data persisted after re-login');
        });
    });

});
