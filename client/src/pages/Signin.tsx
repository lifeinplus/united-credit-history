import { useNavigate } from "react-router-dom";

import type { SubmitCallback } from "../types/Auth";

import { Auth } from "../layouts";
import { useProfileUpdate } from "../contexts";

const Signin = () => {
    const navigate = useNavigate();
    const profileUpdate = useProfileUpdate();

    const submitCallback: SubmitCallback = ({ status }, { userName }) => {
        if (status === 200) {
            profileUpdate({ userName });
            navigate("/");
        }
    };

    return (
        <Auth
            buttonText={"Sign in"}
            question={{
                link: "/signup",
                linkText: "Sign up",
                text: "Don't have an account?",
            }}
            submit={{
                callback: submitCallback,
                url: "/users/signin",
            }}
            title={"Please sign in"}
        />
    );
};

export default Signin;
