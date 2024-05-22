import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import type { SubmitCallback } from "../types/Auth";

import { Auth } from "../layouts";

const Signup = () => {
    const navigate = useNavigate();

    const submitCallback: SubmitCallback = ({ data, status }) => {
        if (status === 200) {
            toast.success(data.message);
            navigate("/signin");
        }
    };

    return (
        <Auth
            buttonText={"Sign up"}
            question={{
                link: "/signin",
                linkText: "Sign in",
                text: "Already have an account?",
            }}
            submit={{
                callback: submitCallback,
                url: "/users/signup",
            }}
            title={"Please sign up"}
        />
    );
};

export default Signup;
