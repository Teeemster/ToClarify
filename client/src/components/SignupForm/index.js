//Signup Component
import React from 'react';

const SignupForm = () => {
    return (
        <div>
            <form>
                <input
                    placeholder="Your First Name"
                    name="firstname"
                    type="firstname"
                    id="firstname"
                ></input>

                <input
                    placeholder="Your Last Name"
                    name="lastname"
                    type="lastname"
                    id="lastname"
                ></input>

                <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    id="email"
                ></input>

                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    id="password"
                >
                </input>
            </form>
        </div>
    );
};

export default SignupForm;