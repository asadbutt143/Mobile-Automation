/**
 * Shared Calendar/Logs Test Module
 * Reusable calendar tests that can be run in any auth state
 */

import { CalendarPage } from '../../pageobjects/CalendarPage.js';

/**
 * Run full calendar tests
 */
export async function runCalendarFullTests() {
    describe('Calendar Screen - Full', () => {
        
        let expectedPeriodStartDate;
        const calendarPage = new CalendarPage();

        // Helper function to convert date string to short format
        function formatDateToShort(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames[date.getMonth()];
            return `${day} ${month}`;
        }

        it('should get period start date from home screen', async () => {
            const fullDateString = await calendarPage.validateDates();
            expectedPeriodStartDate = formatDateToShort(fullDateString);
            console.log('Expected Period Start Date from Home (formatted):', expectedPeriodStartDate);
        });

        it('should navigate to Calendar screen', async () => {
            const calendarBtn = await $('id=bubble2');
            await expect(calendarBtn).toBeDisplayed();
            await calendarBtn.click();

            const calendarTitle = await $('id=settingsTitleTv').getText();
            expect(calendarTitle).toBe('Calender');
            await driver.pause(1000);
            console.log('Calendar screen opened');
        });

        it('should edit period dates', async () => {
            await calendarPage.editPeriodDates();
            await driver.pause(1000);
            console.log('Edit period dates completed');
        });

        it('should add additional categories', async () => {
            await driver.swipeDown();
            await driver.pause(1000);
            
            const addButton = await $('id=addLogBtn');
            await expect(addButton).toBeDisplayed();
            await addButton.click();

            const addLogTitle = await $('id=settingsTitleTv').getText();
            expect(addLogTitle).toBe('Log Activity');
            await driver.pause(1000);

            // Find listed categories on Log Activity Screen
            const categoryElements = await $$(
                '//android.widget.ScrollView[@resource-id="com.techsacare.periodtracker:id/nestedScrollView"]//android.widget.TextView'
            );

            const categories = [];
            for (const el of categoryElements) {
                const text = (await el.getText()).trim();
                if (text && text !== 'Categories' && !text.startsWith('Today')) {
                    categories.push(text);
                }
            }
            console.log('Listed categories:', categories);

            // Go to edit categories
            const editCategories = await $('id=iVEditCategories');
            await expect(editCategories).toBeDisplayed();
            await editCategories.click();

            const editCategoriesTitle = await $('id=settingsTitleTv').getText();
            expect(editCategoriesTitle).toBe('Edit Categories');
            await driver.pause(1000);

            // Select categories to display
            const symptoms = await $('id=IVSymptomsLayoutDisable');
            await expect(symptoms).toBeDisplayed();
            await symptoms.click();

            const mood = await $('id=IVMoodLayoutDisable');
            await expect(mood).toBeDisplayed();
            await mood.click();

            await driver.swipeDown();
            
            const menstrual = await $('id=IVMenstrualLayoutDisable');
            await expect(menstrual).toBeDisplayed();
            await menstrual.click();

            const vaginal = await $('id=IVVaginalDischargeLayoutDisable');
            await expect(vaginal).toBeDisplayed();
            await vaginal.click();

            await driver.swipeDown();
            
            const activity = await $('id=IVPhysicalActivityLayoutDisable');
            await expect(activity).toBeDisplayed();
            await activity.click();

            const love = await $('id=IVLoveLayoutDisable');
            await expect(love).toBeDisplayed();
            await love.click();

            await driver.swipeDown();

            const food = await $('id=IVCravingsLayoutDisable');
            await expect(food).toBeDisplayed();
            await food.click();

            const water = await $('id=IVWaterLayoutDisable');
            await expect(water).toBeDisplayed();
            await water.click();

            await driver.swipeDown();

            const sleep = await $('id=IVSleepsLayoutDisable');
            await expect(sleep).toBeDisplayed();
            await sleep.click();

            const diary = await $('id=IVDiaryLayoutDisable');
            await expect(diary).toBeDisplayed();
            await diary.click();

            await driver.swipeDown();

            const saveButton = await $('id=btn_save');
            await expect(saveButton).toBeDisplayed();
            await saveButton.click();

            const addLogTitle1 = await $('id=settingsTitleTv').getText();
            expect(addLogTitle1).toBe('Log Activity');
            await driver.pause(1000);

            // Verify categories increased
            const categoryElements1 = await $$(
                '//android.widget.ScrollView[@resource-id="com.techsacare.periodtracker:id/nestedScrollView"]//android.widget.TextView'
            );

            const categories1 = [];
            for (const el of categoryElements1) {
                const text1 = (await el.getText()).trim();
                if (text1 && text1 !== 'Categories' && !text1.startsWith('Today')) {
                    categories1.push(text1);
                }
            }
            console.log('Listed categories after edit:', categories1);
            expect(categories1.length).toBeGreaterThan(categories.length);
            console.log('Additional categories added');
        });
    });
}

/**
 * Run calendar sanity tests
 */
export async function runCalendarSanityTests() {
    describe('Calendar Screen - Sanity', () => {
        
        it('should navigate to Calendar screen', async () => {
            const calendarBtn = await $('id=bubble2');
            await expect(calendarBtn).toBeDisplayed();
            await calendarBtn.click();

            const calendarTitle = await $('id=settingsTitleTv').getText();
            expect(calendarTitle).toBe('Calender');
            await driver.pause(1000);
            console.log('Calendar screen opened');
        });

        it('should navigate back to home', async () => {
            const homeBtn = await $('id=bubble1');
            await homeBtn.click();
            await driver.pause(1000);
        });
    });
}

export default {
    runCalendarFullTests,
    runCalendarSanityTests
};
