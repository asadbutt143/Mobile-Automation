/**
 * Shared Home Screen Test Module
 * Reusable home screen tests that can be run in any auth state
 */

import { HomePage } from '../../pageobjects/HomePage.js';
import { CalendarPage } from '../../pageobjects/CalendarPage.js';
import { AIBuddyPage } from '../../pageobjects/AIBuddyPage.js';

/**
 * Run full home screen validation tests
 */
export async function runHomeValidationTests() {
    describe('Home Screen Validation', () => {
        
        it('should verify home screen modules are displayed', async () => {
            const homePage = new HomePage();
            await homePage.verifyHomeModules();
        });

        it('should validate calendar dates', async () => {
            const calendarPage = new CalendarPage();
            await calendarPage.validateDates();
        });
    });
}

/**
 * Run home screen sanity tests (quick verification)
 */
export async function runHomeSanityTests() {
    describe('Home Screen Sanity', () => {
        
        it('should verify home screen is displayed', async () => {
            const homePage = new HomePage();
            await homePage.verifyHomeModules();
        });
    });
}

/**
 * Run AI Buddy test
 */
export async function runAIBuddyTest() {
    describe('AI Buddy Module', () => {
        
        it('should interact with AI Buddy', async () => {
            const aiBuddyPage = new AIBuddyPage();
            await aiBuddyPage.askQuestion('How many fertile days in a month?');
        });
    });
}

/**
 * Run edit period dates test
 */
export async function runEditPeriodDatesTest() {
    describe('Edit Period Dates', () => {
        
        it('should edit period dates and validate', async () => {
            const calendarPage = new CalendarPage();
            
            // Edit period dates and get the period info
            const periodInfo = await calendarPage.editPeriodDates();
            
            // Validate the updated dates on home screen calendar
            await calendarPage.validateDates(
                periodInfo.periodStartDate,
                periodInfo.periodLength,
                periodInfo.cycleLength
            );
        });
    });
}

export default {
    runHomeValidationTests,
    runHomeSanityTests,
    runAIBuddyTest,
    runEditPeriodDatesTest
};
