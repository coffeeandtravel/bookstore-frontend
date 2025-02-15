import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {  useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import googlelogo from '../assets/google-logo.svg'



const SIgnUp = () => {
    const {createUser, loginWithGoogle} = useContext(AuthContext);

    const [color, setColor] = useState('')
    const [error, setError] = useState("")
    
    const location = useLocation();
    const navigate = useNavigate()
    
    const from = location.state?.pathname || "/";

    

    const handleSubmit = async(event) =>{
        event.preventDefault();
        setError("");

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confPassword = form.repeat.value;

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setColor("failure");
            return;
        }
        if (password !== confPassword) {  
            setError("Passwords do not match.");
            setColor("failure");
            return;
        }
        
        try {
            const userCredential = await createUser(email, password);
            const user = userCredential.user; // If needed, use this user data
            navigate(from, { replace: true });  // Only navigate after successful signup
        } catch (error) {
            setError(error.message);  // Directly set error message
        }
    }
    const googleLogin = () =>{
        loginWithGoogle()
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            alert("Sign up Successfull!")
            navigate(from, {replace:true})
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }
  return (
    <div className=" min-w-screen min-h-screen bg-gray-200">
      <div className="flex flex-col justify-center h-screen items-center">
        <h1 className="font-bold text-5xl">Sign Up</h1>
        <div className="flex w-60 items-center justify-center flex-col mt-5 gap-3 rounded-lg hover:bg-slate-100">
            <button className="block h-full text-center" onClick={googleLogin}>Login With Google. <img src={googlelogo} className="h-11 w-11 text-center inline-block" alt="" /></button>
        </div>
        <form className="flex max-w-md flex-col gap-4 mt-5 " onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@flowbite.com"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" name="password" color={color}  required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat" value="Repeat password" />
            </div>
            <TextInput id="repeat" type="password" name="repeat" color={color}  required shadow />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <p className="font-semibold pl-1">
            Already have an account.
            <Link to="/sign-in" className="text-teal-600 px-2  font-bold">
              Login
            </Link>{" "}
          </p>
          <Button type="submit">Register new account</Button>
          {}
        </form>
      </div>
    </div>
  );
};

export default SIgnUp;
