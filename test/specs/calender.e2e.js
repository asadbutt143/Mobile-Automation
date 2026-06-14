import { CalendarPage } from '../pageobjects/CalendarPage.js';

let expectedPeriodStartDate;

// Helper function to convert date string to short format (e.g., "Wed Jan 15 2026" -> "15 Jan")
function formatDateToShort(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
}

it('Get period start date from home screen', async () => {
    const calendarPage = new CalendarPage();
    // Call validateDates to navigate the calendar and get the period start date
    const fullDateString = await calendarPage.validateDates();
    expectedPeriodStartDate = formatDateToShort(fullDateString);
    console.log('Expected Period Start Date from Home (formatted):', expectedPeriodStartDate);
});

it('Navigate to Calender screen', async () => {
    const analytics = await $('id=bubble2');
    await expect(analytics).toBeDisplayed();
    await analytics.click();

    const cycleDayText = await $('id=settingsTitleTv').getText();
    expect(cycleDayText).toBe('Calender');
    await driver.pause(1000);
    console.log('Analytics screen opened');
});

it('Edit period dates', async () => {
    const calendarPage = new CalendarPage();
    await calendarPage.editPeriodDates();
    await driver.pause(1000);


    //call the edit periods function from calender page
    console.log('Edit period dates completed');


});

it('Add additional categories', async () => {
    await driver.swipeDown();
    await driver.pause(1000);
    const addbutton = await $('id=addLogBtn');
    await expect(addbutton).toBeDisplayed();
    await addbutton.click();

    const addLogTitle = await $('id=settingsTitleTv').getText();
    expect(addLogTitle).toBe('Log Activity');
    await driver.pause(1000);

    //find listed categories on Log Activity Screen
    const categoryElements = await $$(
        '//android.widget.ScrollView[@resource-id="com.techsacare.periodtracker:id/nestedScrollView"]//android.widget.TextView'
    );

    const excludedTexts = ['Categories', 'Today, 27 Jan'];
    const categories = [];

    for (const el of categoryElements) {
        const text = (await el.getText()).trim();

        if (text && text !== 'Categories' && !text.startsWith('Today')) { categories.push(text); }

    }

    console.log('Listed categories:', categories);


    //Go to edit categories
    const editCategories = await $('id=iVEditCategories');
    await expect(editCategories).toBeDisplayed();
    await editCategories.click();

    const editCategoriesTitle = await $('id=settingsTitleTv').getText();
    expect(editCategoriesTitle).toBe('Edit Categories');
    await driver.pause(1000);

    //select categories to display on log activity screen

    //select symptoms
    const symptoms = await $('id=IVSymptomsLayoutDisable');
    await expect(symptoms).toBeDisplayed();
    await symptoms.click();

    //select mood
    const mood = await $('id=IVMoodLayoutDisable');
    await expect(mood).toBeDisplayed();
    await mood.click();

    await driver.swipeDown();
    //select Menstrual
    const menstrual = await $('id=IVMenstrualLayoutDisable');
    await expect(menstrual).toBeDisplayed();
    await menstrual.click();

    //select VAGINAL
    const vaginal = await $('id=IVVaginalDischargeLayoutDisable');
    await expect(vaginal).toBeDisplayed();
    await vaginal.click();

    await driver.swipeDown();
    //select Activity
    const activity = await $('id=IVPhysicalActivityLayoutDisable');
    await expect(activity).toBeDisplayed();
    await activity.click();

    //select love
    const love = await $('id=IVLoveLayoutDisable');
    await expect(love).toBeDisplayed();
    await love.click();

    await driver.swipeDown();

    //select food
    const food = await $('id=IVCravingsLayoutDisable');
    await expect(food).toBeDisplayed();
    await food.click();

    //select water
    const water = await $('id=IVWaterLayoutDisable');
    await expect(water).toBeDisplayed();
    await water.click();

    await driver.swipeDown();

    //select sleep
    const sleep = await $('id=IVSleepsLayoutDisable');
    await expect(sleep).toBeDisplayed();
    await sleep.click();

    //select diary
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

    //find listed categories on Log Activity Screen
    const categoryElements1 = await $$(
        '//android.widget.ScrollView[@resource-id="com.techsacare.periodtracker:id/nestedScrollView"]//android.widget.TextView'
    );

    const excludedTexts1 = ['Categories', 'Today, 27 Jan'];
    const categories1 = [];

    for (const el of categoryElements1) {
        const text1 = (await el.getText()).trim();

        if (text1 && text1 !== 'Categories' && !text1.startsWith('Today')) { categories1.push(text1); }

    }

    console.log('Listed categories:', categories1);

    expect(categories1.length).toBeGreaterThan(categories.length);
    console.log('Length of categories1:', categories1.length);
    console.log('Length of categories:', categories.length);

    console.log('Additional categories added');

});

it('Add additional symptoms', async () => {
    await driver.pause(1000);
    const addbutton = await $('id=IVSymptomsDropDown');
    await addbutton.click();

    //click add symptoms
    const addSymptoms = await $('id=addSymptomsLayout');
    await addSymptoms.click();

    //fill symptom details
    const symptomName = await $('id=etSubCategoryName');

    //give random name
    const randomName = Math.random().toString(36).substring(2, 8);
    await symptomName.setValue(randomName);

    const symptomDescription = await $('id=etDes');
    await symptomDescription.setValue(randomName);

    //select icon
    const icon = await $('(//android.widget.ImageView[@resource-id="com.techsacare.periodtracker:id/iVSubCategory"])[4]');
    await icon.click();

    //click save
    const save = await $('id=BtnSave');
    await save.click();

    //verify symptoms added
    const symptomsElements = await $$(
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.techsacare.periodtracker:id/rvSymptoms"]//android.widget.TextView'
    );

    const excludedTexts1 = ['Add Symptom'];
    const symptoms1 = [];

    for (const el of symptomsElements) {
        const text1 = (await el.getText()).trim();

        if (text1 && text1 !== 'Add Symptom') { symptoms1.push(text1); }

    }

    console.log('Listed symptoms:', symptoms1);

    expect(symptoms1).toContain(randomName);
    console.log('Additional symptoms added');
    await addbutton.click();

});

it('Add additional mood', async () => {
    await driver.pause(1000);
    const addbutton = await $('id=IVMoodDropDown');
    await addbutton.click();

    //click add mood
    const addMood = await $('id=addSymptomsLayout');
    await addMood.click();

    //fill mood details
    const moodName = await $('id=etSubCategoryName');

    //give random name
    const randomName = Math.random().toString(36).substring(2, 8);
    await moodName.setValue(randomName);

    const moodDescription = await $('id=etDes');
    await moodDescription.setValue(randomName);

    //select icon
    const icon = await $('(//android.widget.ImageView[@resource-id="com.techsacare.periodtracker:id/iVSubCategory"])[3]');
    await icon.click();

    //click save
    const save = await $('id=BtnSave');
    await save.click();

    //verify mood added
    const moodElements = await $$(
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.techsacare.periodtracker:id/rvMood"]//android.widget.TextView'
    );

    const excludedTexts1 = ['Add Mood'];
    const mood1 = [];

    for (const el of moodElements) {
        const text1 = (await el.getText()).trim();

        if (text1 && text1 !== 'Add Mood') { mood1.push(text1); }

    }

    console.log('Listed moods:', mood1);

    expect(mood1).toContain(randomName);
    console.log('Additional moods added');
    await addbutton.click();

});

it('Add additional activity', async () => {
    await driver.pause(1000);
    const addbutton = await $('id=IVPhysicalActivityDropDown');
    await addbutton.click();

    await driver.swipeDown();
    //click add activity
    const addActivity = await $('id=addSymptomsLayout');
    await addActivity.click();

    //fill activity details
    const activityName = await $('id=etSubCategoryName');

    //give random name
    const randomName = Math.random().toString(36).substring(2, 8);
    await activityName.setValue(randomName);

    const activityDescription = await $('id=etDes');
    await activityDescription.setValue(randomName);

    //select icon
    const icon = await $('(//android.widget.ImageView[@resource-id="com.techsacare.periodtracker:id/iVSubCategory"])[1]');
    await icon.click();

    //click save
    const save = await $('id=BtnSave');
    await save.click();
    await driver.pause(1000);
    await driver.swipeDown();

    //verify activity added
    const activityElements = await $$(
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.techsacare.periodtracker:id/rvPhysicalActivity"]//android.widget.TextView'
    );

    const excludedTexts1 = ['Add Physical Activity'];
    const activity1 = [];

    for (const el of activityElements) {
        const text1 = (await el.getText()).trim();

        if (text1 && text1 !== 'Add Physical Activity') { activity1.push(text1); }

    }


    console.log('Listed activity:', activity1);

    expect(activity1).toContain(randomName);
    console.log('Additional activity added');
    await addbutton.click();

    const saveButton = await $('id=btn_save');
    await expect(saveButton).toBeDisplayed();
    await saveButton.click();
});



