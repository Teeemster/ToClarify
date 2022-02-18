//Login Component
import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <form>
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

export default LoginForm;