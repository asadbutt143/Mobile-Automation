import { waitForActivity, assert } from '../utils.js';

export class CalendarPage {

    async validateDates(startLmpDate, periodLen, cycleLen) {
        console.log('Starting calendar interaction test...');
        await waitForActivity('PeriodTracker', 15000);

        const phaseEl = await $('id=com.techsacare.periodtracker:id/tv_phase');

        // Inputs
        const PERIOD_LENGTH = periodLen || 5;
        const CYCLE_LENGTH = cycleLen || 30;

        const LMP_DATE = startLmpDate ? new Date(startLmpDate) : new Date();
        LMP_DATE.setHours(0, 0, 0, 0);

        console.log('=== inputs for Expected Date Calculation ===');
        console.log(`Period Start (LMP): ${LMP_DATE.toDateString()}`);
        console.log(`Period Length: ${PERIOD_LENGTH}`);
        console.log(`Cycle Length: ${CYCLE_LENGTH}`);

        // Adjust expectations
        const expectedPeriodEnd = new Date(LMP_DATE);
        expectedPeriodEnd.setDate(expectedPeriodEnd.getDate() + PERIOD_LENGTH - 1);
        console.log(`Expected Period End: ${expectedPeriodEnd.toDateString()}`);

        const expectedOvulation = new Date(LMP_DATE);
        expectedOvulation.setDate(expectedOvulation.getDate() + CYCLE_LENGTH - 14);
        console.log(`Expected Ovulation: ${expectedOvulation.toDateString()}`);

        const expectedFertileStartAppLogic = new Date(expectedOvulation);
        expectedFertileStartAppLogic.setDate(expectedFertileStartAppLogic.getDate() - 2);
        console.log(`Expected Fertile Start: ${expectedFertileStartAppLogic.toDateString()}`);

        const expectedFertileEndAppLogic = new Date(expectedOvulation);
        expectedFertileEndAppLogic.setDate(expectedFertileEndAppLogic.getDate() + 2);
        console.log(`Expected Fertile End: ${expectedFertileEndAppLogic.toDateString()}`);


        let detectedPeriodEnd = null;
        let detectedFertileStart = null;
        let detectedOvulation = null;
        let detectedFertileEnd = null;

        let previousPhase = '';
        const maxDaysToScan = 35; // Cover one full cycle

        console.log('=== Tracking phase transitions ===');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let startIndex = 0;
        // If LMP is in the past, start scanning from Today to avoid swiping issues for past dates
        if (LMP_DATE < today) {
            const diffTime = Math.abs(today - LMP_DATE);
            startIndex = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(`LMP is in past. Starting scan from index ${startIndex} (Today)`);
        }

        for (let i = startIndex; i < maxDaysToScan; i++) {
            const currentDate = new Date(LMP_DATE);
            currentDate.setDate(currentDate.getDate() + i);
            const dayNum = currentDate.getDate();

            const dateSelector = `android=new UiSelector().resourceId("com.techsacare.periodtracker:id/circleContainerInner").childSelector(new UiSelector().text("${dayNum}"))`;
            let dateEl = await $(dateSelector);

            // If not visible, swipe until found or reached limit
            let swipeCount = 0;
            const calendarSelector = 'android=new UiSelector().className("androidx.recyclerview.widget.RecyclerView")';

            while (!(await dateEl.isDisplayed()) && swipeCount < 10) {
                console.log(`Day ${dayNum} not visible, swiping left...`);
                await driver.swipeLeft(calendarSelector);
                dateEl = await $(dateSelector);
                swipeCount++;
            }

            if (await dateEl.isDisplayed()) {
                await dateEl.click();
            } else {
                console.warn(`Could not find day ${dayNum} after swiping.`);
            }

            await driver.pause(800); // Allow phase text to update


            const currentPhase = (await phaseEl.getText()).toUpperCase();
            console.log(`Day ${i + 1} (${currentDate.toDateString()}): ${currentPhase}`);

            // Transition Tracking Logic (Only capture the FIRST occurrence)
            if (previousPhase) {
                // 1. Period End: Menstruation -> Follicular
                if (!detectedPeriodEnd && previousPhase.includes('MENSTRUATION') && currentPhase.includes('FOLLICULAR')) {
                    detectedPeriodEnd = new Date(currentDate);
                    detectedPeriodEnd.setDate(detectedPeriodEnd.getDate() - 1);
                    console.log(`✅Detected Period End: ${detectedPeriodEnd.toDateString()}`);
                }
                // 2. Fertile Window Start: Follicular -> High chances
                if (!detectedFertileStart && previousPhase.includes('FOLLICULAR') && currentPhase.includes('HIGH CHANCES')) {
                    detectedFertileStart = new Date(currentDate);
                    console.log(`✅Detected Fertile Window Start: ${detectedFertileStart.toDateString()}`);
                }
                // 3. Ovulation: High chances -> Highest chances
                if (!detectedOvulation && previousPhase.includes('HIGH CHANCES') && currentPhase.includes('HIGHEST CHANCES')) {
                    detectedOvulation = new Date(currentDate);
                    console.log(`✅Detected Ovulation Date: ${detectedOvulation.toDateString()}`);
                }
                // 4. Fertile Window End: Highest/High chances -> Luteal
                if (!detectedFertileEnd && (previousPhase.includes('CHANCES')) && currentPhase.includes('LUTEAL')) {
                    detectedFertileEnd = new Date(currentDate);
                    detectedFertileEnd.setDate(detectedFertileEnd.getDate() - 1);
                    console.log(`✅Detected Fertile Window End: ${detectedFertileEnd.toDateString()}`);
                }
            }

            previousPhase = currentPhase;

            if (detectedPeriodEnd && detectedFertileStart && detectedOvulation && detectedFertileEnd) {
                console.log('--- All target dates detected! Ending scan early. ---');
                break;
            }
        }

        console.log('=== Final Phase Validation ===');

        const fmt = d => d ? d.toDateString() : 'NOT DETECTED';

        assert.strictEqual(fmt(detectedPeriodEnd), fmt(expectedPeriodEnd), 'Period End Date mismatch');
        assert.strictEqual(fmt(detectedFertileStart), fmt(expectedFertileStartAppLogic), 'Fertile Start Date mismatch');
        assert.strictEqual(fmt(detectedOvulation), fmt(expectedOvulation), 'Ovulation Date mismatch');
        assert.strictEqual(fmt(detectedFertileEnd), fmt(expectedFertileEndAppLogic), 'Fertile End Date mismatch');


        console.log('expected Period End Date:', fmt(expectedPeriodEnd));
        console.log('expected Fertile Start Date:', fmt(expectedFertileStartAppLogic));
        console.log('expected Ovulation Date:', fmt(expectedOvulation));
        console.log('expected Fertile End Date:', fmt(expectedFertileEndAppLogic));

        console.log('detected Period End Date:', fmt(detectedPeriodEnd));
        console.log('detected Fertile Start Date:', fmt(detectedFertileStart));
        console.log('detected Ovulation Date:', fmt(detectedOvulation));
        console.log('detected Fertile End Date:', fmt(detectedFertileEnd));

        console.log('✅ Calendar interaction and phase tracking successful');

        // Return the period start date for use in other tests
        //  return LMP_DATE.toDateString();
    }

    async editPeriodDates() {
        console.log('Starting edit period dates test...');

        // Ensure we are on home screen
        await waitForActivity('PeriodTracker', 15000);
        await driver.pause(2000);

        // Click edit button (pencil icon)
        const editButton = await $('id=com.techsacare.periodtracker:id/cl_edit');
        await editButton.waitForDisplayed({ timeout: 10000 });
        await editButton.click();
        console.log('Clicked Edit Period button');
        await driver.pause(2000);

        // Wait for Edit Period screen with calendar
        const calendarViewPager = await $('//androidx.viewpager.widget.ViewPager[@resource-id="com.techsacare.periodtracker:id/vp_month"]/android.view.View');
        await calendarViewPager.waitForDisplayed({ timeout: 10000 });
        console.log('Edit Period screen opened with calendar');
        await driver.pause(1000);

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentMonth = today.getMonth();

        // Calculate dates to select (today-1 to today-4)
        const targetDates = [];
        for (let i = 1; i <= 4; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            targetDates.push(d);
        }

        const currentMonthDates = targetDates.filter(d => d.getMonth() === currentMonth);
        const prevMonthDates = targetDates.filter(d => d.getMonth() !== currentMonth);

        console.log(`Dates to select in current month: ${currentMonthDates.map(d => d.getDate()).join(', ')}`);
        console.log(`Dates to select in previous month: ${prevMonthDates.map(d => d.getDate()).join(', ')}`);

        // Helper to click date
        const clickDate = async (dayNum) => {
            console.log(`Selecting day: ${dayNum}`);
            // Use circleContainerInner as it consistently works for date cells in this app
            let dayEl = await $(`android=new UiSelector().resourceId("com.techsacare.periodtracker:id/circleContainerInner").childSelector(new UiSelector().text("${dayNum}"))`);
            if (!await dayEl.isExisting()) {
                console.log(`Day ${dayNum} not found with specific ID, trying text only...`);
                dayEl = await $(`android=new UiSelector().text("${dayNum}")`);
            }
            // Wait for it to be displayed before clicking to avoid errors if it exists but is not ready
            if (await dayEl.isExisting()) {
                await dayEl.click();
            } else {
                console.warn(`Could not find day ${dayNum} to click!`);
            }
            await driver.pause(500);
        };


        // Select current month dates
        for (const date of currentMonthDates) {
            await clickDate(date.getDate());
        }

        // If we have prev month dates, swipe and select
        if (prevMonthDates.length > 0) {
            console.log('Swiping to previous month...');
            const loc = await calendarViewPager.getLocation();
            const size = await calendarViewPager.getSize();
            // Swipe Left to Right (Previous)
            const startX = Math.floor(loc.x + (size.width * 0.2));
            const endX = Math.floor(loc.x + (size.width * 0.8));
            const y = Math.floor(loc.y + (size.height / 2));

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 800, x: endX, y: y },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();
            await driver.pause(2000); // Wait for transition

            for (const date of prevMonthDates) {
                await clickDate(date.getDate());
            }
        }

        const selectedDayNums = targetDates.map(d => d.getDate());
        console.log(`✅ Successfully selected dates: ${selectedDayNums.join(', ')}`);

        // Save the changes
        const saveButton = await $('android=new UiSelector().textContains("SAVE")');
        await saveButton.waitForDisplayed({ timeout: 5000 });
        await saveButton.click();
        console.log('Clicked Save button');
        await driver.pause(2000);

        // Calculate period start date (oldest selected date = 4 days ago)
        const periodStartDate = new Date(today);
        periodStartDate.setDate(periodStartDate.getDate() - 4);

        return {
            periodStartDate: periodStartDate,
            periodLength: 5,
            cycleLength: 30
        };
    }

    async getPeriodStartDate() {
        const periodStartDateNode = await $('id=tv_period_start_date');
        const text = await periodStartDateNode.getText();
        console.log('Period Start Date:', text);
        return text;
    }

    async getPeriodLength() {
        const periodLengthNode = await $('id=tv_period_length');
        const text = await periodLengthNode.getText();
        console.log('Period Length:', text);
        return text;
    }

    async getCycleLength() {
        const cycleLengthNode = await $('id=cycleLengthProgressBar');
        const text = await cycleLengthNode.getText();
        console.log('Cycle Length:', text);
        return text;
    }
}



