import { useState } from "react";
import { useDispatch } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
    googleSignInStart,
    emailSignInStart,
} from "../../store/user/user.action";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));

            resetFormFields();
        } catch (error) {
            console.log("error: ", error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    alert("Invalid email");
                    break;
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                default:
                    alert("Unknown error");
            }
            console.error(error);
        }
    };

    return (
        <div className="sign-in-form-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
