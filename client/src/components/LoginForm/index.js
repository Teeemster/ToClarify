//Login Component
import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers';

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const [errorMessage, setErrorMessage] = useState('');
    const { email, password } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errorMessage) {
            console.log('Submit Form', formState);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setErrorMessage('This is not a valid email.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
            console.log('Handle Form', formState);
        }
    };


    return (
        <section>
            <h1>Sign-In!</h1>
            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    id="email"
                    defaultValue={email}
                    onBlur={handleChange}
                ></input>

                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    id="password"
                    defaultValue={password}
                    onBlur={handleChange}
                >
                </input>

                {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}

                <button>Login</button>
            </form>
        </section>
    );
};

export default LoginForm;