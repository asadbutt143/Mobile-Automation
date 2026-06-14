/**
 * Shared My Space Test Module
 * Reusable My Space tests that can be run in any auth state
 */

import { MySpacePage } from '../../pageobjects/MySpacePage.js';

/**
 * Run full My Space module tests
 */
export async function runMySpaceFullTests() {
    describe('My Space Modules - Full', () => {
        
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
}

/**
 * Run My Space sanity tests (quick verification)
 */
export async function runMySpaceSanityTests() {
    describe('My Space Modules - Sanity', () => {
        
        it('should track water intake', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.trackWaterIntake();
        });

        it('should verify sleep module', async () => {
            const mySpacePage = new MySpacePage();
            await mySpacePage.verifySleepModule();
        });
    });
}

/**
 * Run individual My Space tests
 */
export async function runWaterIntakeTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.trackWaterIntake();
}

export async function runSleepModuleTest() {
    const mySpacePage = new MySpacePage();
    return await mySpacePage.verifySleepModule();
}

export async function runSymptomsModuleTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.verifySymptomsModule();
}

export async function runDiaryModuleTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.verifyDiaryModule();
}

export async function runExploreMySpaceTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.verifyExploreMySpaceModule();
}

export async function runPhysicalActivityTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.verifyPhysicalActivityModule();
}

export async function runMoodModuleTest() {
    const mySpacePage = new MySpacePage();
    await mySpacePage.verifyMoodModule();
}

export default {
    runMySpaceFullTests,
    runMySpaceSanityTests,
    runWaterIntakeTest,
    runSleepModuleTest,
    runSymptomsModuleTest,
    runDiaryModuleTest,
    runExploreMySpaceTest,
    runPhysicalActivityTest,
    runMoodModuleTest
};
