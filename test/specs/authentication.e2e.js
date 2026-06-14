import { AuthenticationPage } from '../pageobjects/AuthenticationPage.js';
import { HomePage } from '../pageobjects/HomePage.js';

describe('Authentication Flow', () => {
    /*
    
        it('Signup with google', async () => {
            const authenticationPage = new AuthenticationPage();
            await authenticationPage.signupWithGoogle();
            await authenticationPage.logout();
        });
    
    
    */

    it('Continue as Guest', async () => {

        const authenticationPage = new AuthenticationPage();
        await authenticationPage.continueAsGuestAndCompleteProfile();
    });

    it('Verify home screen Modules', async () => {

        const homePage = new HomePage();
        await homePage.verifyHomeModules();

    });


    /*
        //login with already registered email
        it('Login with email and password', async () => {
            const authenticationPage = new AuthenticationPage();
            await authenticationPage.loginWithEmailAndPassword("tapak@yopmail.com", "Saqi@1122");
        });
    
        it('Verify home screen Modules after login', async () => {
    
            const homePage = new HomePage();
            await homePage.verifyHomeModules(true);
    
        });
    
    */
    /*
    
        it('Verify Sign Up Flow with Yopmail OTP', async () => {
            const authenticationPage = new AuthenticationPage();
            await authenticationPage.signUpWithYopmailOtp();
        });
    
        it('Login with email and password', async () => {
            const authenticationPage = new AuthenticationPage();
            // Sign up first to get email, then login with the same email
            // If you want to test login independently, pass a known test email instead
            const emailText = await authenticationPage.signUpWithYopmailOtp();
            await authenticationPage.loginWithEmailAndPassword(emailText);
        });
    
    */



});
