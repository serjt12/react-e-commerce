import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const {user} = await signInWithGooglePopup();

            createUserDocumentFromAuth(user);
        } catch (error) {
            console.error(error);
        }
    }; 

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    );
};

export default SignIn;