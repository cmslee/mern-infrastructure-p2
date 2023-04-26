import { useState } from "react";

import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LogInForm";

function AuthPage({ setUser }) {
    //initialize new state as 1st step in creating toggle displaying in login/signup forms
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main className="AuthPage">
            <h1>Auth Page</h1>

            {/**create button to set condition for text that displays */}
            {/**the onclick allows you to toggle */}
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "Sign up" : "Sign in"}
            </button>

            {/**call state in ternary function to set condition for form component that displays */}
            {showLogin ? (
                <LoginForm setUser={setUser} />
            ) : (
                <SignUpForm setUser={setUser} />
            )}
        </main>
    );
}

export default AuthPage;
