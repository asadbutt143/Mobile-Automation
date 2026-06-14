/**
 * Shared test data and credentials store
 * Used to pass data between different test suites/phases
 */
export const TestData = {
    // Signup credentials (set during signup flow)
    signupEmail: null,
    signupPassword: 'Pass@123',
    signupUsername: null,
    
    // Google SSO credentials (set during Google flow)
    googleEmail: null,
    
    // Guest user data (set during guest flow)
    guestName: null,
    
    // Profile data
    profileData: {
        dateOfBirth: '10 December 1998',
        gender: 'Female',
        cycleLength: 30,
        periodLength: 5
    },
    
    // Setters
    setSignupEmail(email) {
        this.signupEmail = email;
        console.log(`[TestData] Signup email set: ${email}`);
    },
    
    setSignupUsername(username) {
        this.signupUsername = username;
        console.log(`[TestData] Signup username set: ${username}`);
    },
    
    setGoogleEmail(email) {
        this.googleEmail = email;
        console.log(`[TestData] Google email set: ${email}`);
    },
    
    setGuestName(name) {
        this.guestName = name;
        console.log(`[TestData] Guest name set: ${name}`);
    },
    
    // Getters
    getSignupEmail() {
        return this.signupEmail;
    },
    
    getSignupPassword() {
        return this.signupPassword;
    },
    
    getSignupUsername() {
        return this.signupUsername;
    },
    
    getGoogleEmail() {
        return this.googleEmail;
    },
    
    getGuestName() {
        return this.guestName;
    },
    
    // Reset all data (useful for test cleanup)
    reset() {
        this.signupEmail = null;
        this.signupUsername = null;
        this.googleEmail = null;
        this.guestName = null;
        console.log('[TestData] All test data reset');
    },
    
    // Generate random test email
    generateTestEmail() {
        const randomStr = Math.random().toString(36).substring(7);
        return `test_${randomStr}@yopmail.com`;
    },
    
    // Generate random username (alphabets only)
    generateUsername() {
        let name = '';
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 8; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return name;
    }
};

// Default export for convenience
export default TestData;
