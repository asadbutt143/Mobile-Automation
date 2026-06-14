import assert from 'node:assert';

export const waitForActivity = async (activityName, timeout = 10000) => {
    await driver.waitUntil(
        async () => (await driver.getCurrentActivity())?.includes(activityName),
        {
            timeout,
            timeoutMsg: `Expected ${activityName} to be active`
        }
    );
};

export const parseDateFlexible = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
};

export const daysBetween = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const DEFAULT_PERIOD_LENGTH = 5;
export const DEFAULT_CYCLE_LENGTH = 28;

// Helper to scroll to value (Shared)
export const scrollToValue = async (identifier, value) => {
    // 1. Try UiScrollable first (Native Android Scroll)
    try {
        let uiSelector = 'new UiSelector().scrollable(true)';
        let isResourceId = false;

        if (typeof identifier === 'number') {
            uiSelector += `.instance(${identifier})`;
        } else if (typeof identifier === 'string' && identifier.startsWith('id=')) {
            isResourceId = true;
            const resourceId = identifier.replace('id=', '');
            // Try fully qualified ID to be specific
            uiSelector += `.resourceIdMatches(".*:id/${resourceId}")`;
        }

        // Reduced max swipes to avoid long hangs
        const uiScrollable = `new UiScrollable(${uiSelector}).setAsVerticalList().setMaxSearchSwipes(30)`;

        try {
            // Forward Search
            const selector = `android=${uiScrollable}.scrollIntoView(new UiSelector().textContains("${value}"))`;
            const element = await $(selector);
            // Verify existence before click to avoid stale element errors
            if (await element.isExisting()) {
                await element.click();
                await driver.pause(1000);
                return;
            }
        } catch (ignore) {
            // Continue to fallback
        }
    } catch (e) {
        console.warn('UiScrollable setup failed, proceeding to fallback');
    }

    // 2. Fallback: Manual W3C Swipe (Safety net for "Backward" or complex cases)
    // Only works if we have a valid ID to find the container location
    if (typeof identifier === 'string' && identifier.startsWith('id=')) {
        console.log(`UiScrollable failed or not found, attempting manual swipe for value: ${value}`);
        const el = await $(identifier);

        if (await el.isExisting()) {
            const loc = await el.getLocation();
            const size = await el.getSize();
            // Fetch window size to ensure safe bounds
            const { height: screenHeight } = await driver.getWindowRect();

            const centerX = Math.floor(loc.x + size.width / 2);
            const centerY = Math.floor(loc.y + size.height / 2);

            // Use a fixed swipe distance to ensure the wheel moves (e.g., 300-400px)
            // Small elements (like dividers) provide insufficient relative path for a scroll.
            const reach = 200; // Half of total swipe distance

            let bottomY = centerY + reach;
            let topY = centerY - reach;

            // Clamp to screen bounds (with padding)
            if (bottomY >= screenHeight) bottomY = screenHeight - 50;
            if (topY < 0) topY = 50;

            const startY = bottomY; // Lower point
            const endY = topY;      // Upper point

            console.log(`Manual swipe debug: x=${centerX}, y=${startY}->${endY} (El Height: ${size.height})`);

            // Helper for swipe action
            const performSwipe = async (fromY, toY) => {
                await driver.performActions([{
                    type: 'pointer', id: 'finger1', parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: centerX, y: fromY },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 100 },
                        { type: 'pointerMove', duration: 300, origin: 'viewport', x: centerX, y: toY }, // Faster swipe (300ms) for better momentum
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
                await driver.pause(500); // Allow UI to settle
            };

            const targetSel = `android=new UiSelector().textContains("${value}")`;

            // 1. Check if visible immediately
            if (await $(targetSel).isDisplayed()) {
                await $(targetSel).click();
                return;
            }

            // 2. Search Direction 1: Swipe UP (brings bottom items into view -> Scrolling Down)
            for (let i = 0; i < 5; i++) {
                await performSwipe(startY, endY);
                if (await $(targetSel).isDisplayed()) {
                    await $(targetSel).click();
                    return;
                }
            }

            // 3. Search Direction 2: Swipe DOWN (brings top items into view -> Scrolling Up)
            for (let i = 0; i < 10; i++) {
                await performSwipe(endY, startY);
                if (await $(targetSel).isDisplayed()) {
                    await $(targetSel).click();
                    return;
                }
            }
        } else {
            console.warn(`Fallback element not found: ${identifier}`);
        }
    }
    await driver.pause(1000);
};

export { assert };
