//Signup Component
import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers';

const SignupForm = () => {
    const [formState, setFormState] = useState({ firstname: '', lastname: '', email: '', password: '' });
    
    const [errorMessage, setErrorMessage] = useState('');
    const { firstname, lastname, email, password } = formState;

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
            <h1>Sign-Up!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Your First Name"
                    name="firstname"
                    type="firstname"
                    id="firstname"
                    defaultValue={firstname}
                    onBlur={handleChange}
                ></input>

                <input
                    placeholder="Your Last Name"
                    name="lastname"
                    type="lastname"
                    id="lastname"
                    defaultValue={lastname}
                    onBlur={handleChange}
                ></input>

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

                <button>Submit</button>
            </form>
        </section>
    );
};

export default SignupForm;