/**
 * Shared Test Modules Index
 * Export all shared test modules for easy importing
 */

export * from './home.shared.js';
export * from './myspace.shared.js';
export * from './analytics.shared.js';
export * from './calendar.shared.js';
export * from './community.shared.js';
export * from './settings.shared.js';

// Re-export defaults as named exports for convenience
import homeShared from './home.shared.js';
import myspaceShared from './myspace.shared.js';
import analyticsShared from './analytics.shared.js';
import calendarShared from './calendar.shared.js';
import communityShared from './community.shared.js';
import settingsShared from './settings.shared.js';

export {
    homeShared,
    myspaceShared,
    analyticsShared,
    calendarShared,
    communityShared,
    settingsShared
};
