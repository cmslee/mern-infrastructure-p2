import { useState } from "react";
import { signUp } from '../utilities/users-service';

function SignUpForm({ setUser }) {
    //this is very cool 
    //?you can initialize different kinds of data using state object
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
    });

    //?the comparison stored in this variable prepares us to create a switch using a boolean
    const disable = formData.password !== formData.confirm;

    //*handles what happens when user clicks submit
    //?take in evt object;
    const handleSubmit = async (e) => {
        e.preventDefault();
        //?this log should give you input as object
        //console.log(formData)};
        try {
            console.log(formData)
            // data to be sent to the backend to create a new user
            //?variable userData stores NEW COPY of user data
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
            // returns a token with the user info
            const user = await signUp(userData); // user service
            setUser(user);

        } catch (error) {
            setFormData({ ...formData, error: "Sign Up Failed - Try Again" })
        }
    };

    //*handles user inputting values into form
    //prior to writing this function, React has control of the form via the State and won't let user input anything
    //?take in evt object; take the data; update from... to...;
    const handleChange = (evt) => {
        //!this spread operator is necessary to make sure all the state of ALL form data can update at same time
        setFormData({ ...formData, [evt.target.name]: evt.target.value, error: '' })
    };

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required />

                    <label>password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <label>Confirm</label>
                    <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />

                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            
            {/**this paragraph element is for displaying any form errors */}
            <p className="error-message">{formData.error}</p>
        </div>
    );
}

export default SignUpForm;
