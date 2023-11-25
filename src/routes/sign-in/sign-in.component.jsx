
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const { user } = await signInWithGooglePopup();

            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect
            </button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
