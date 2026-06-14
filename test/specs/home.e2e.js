import { CalendarPage } from '../pageobjects/CalendarPage.js';
import { MySpacePage } from '../pageobjects/MySpacePage.js';
import { AIBuddyPage } from '../pageobjects/AIBuddyPage.js';

describe('Home Screen Validation', () => {

    // Removed local scrollToValue function since it's imported now
    // Global variable to store sleep stats for analytics validation
    global.sleepStatsValue = null;

    it('dates validation', async () => {
        const calendarPage = new CalendarPage();
        await calendarPage.validateDates();
    });

    it('Edit period dates', async () => {
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


    it('AI Buddy Module', async () => {
        const aiBuddyPage = new AIBuddyPage();
        await aiBuddyPage.askQuestion('How many fertile days in a month?');

    })



    describe('My Space Modules', () => {

        it('should track water intake', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.trackWaterIntake();
        });

        it('should verify sleep module', async () => {
            const mySpacePage = new MySpacePage();
            global.sleepStatsValue = await mySpacePage.verifySleepModule();
            console.log('Stored sleep stats value for analytics:', global.sleepStatsValue);
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




});
