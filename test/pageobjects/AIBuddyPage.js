export class AIBuddyPage {

    async askQuestion(questionText) {
        const aiBuddyNode = await $('id=btn_chat');
        await aiBuddyNode.waitForDisplayed({ timeout: 10000 });
        expect(aiBuddyNode).toBeDisplayed();
        console.log('AI Buddy Module is visible');

        await aiBuddyNode.click();
        await driver.pause(1000);

        const queryNode = await $('id=idEdtQuery');
        await queryNode.waitForDisplayed({ timeout: 10000 });

        await queryNode.setValue(questionText);
        await driver.pause(1000);

        const sendBtn = await $('id=btnSend');
        await sendBtn.click();
        await driver.pause(10000);

        const responseNode = await $('id=left_chat_text_view');
        expect(responseNode).toBeDisplayed();
        console.log('Response:', await responseNode.getText());

        await driver.pause(10000);

        //goback to home screen
        await driver.back();
        await driver.pause(1000);
    }
}


