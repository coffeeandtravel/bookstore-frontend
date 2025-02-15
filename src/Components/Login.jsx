import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import googlelogo from '../assets/google-logo.svg';

const Login = () => {
    const { login, loginWithGoogle } = useContext(AuthContext);  // ✅ Correct function
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const userCredential = await login(email, password);  // ✅ Correct function
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-gray-200">
            <div className="flex flex-col justify-center h-screen items-center">
                <h1 className="font-bold text-5xl">Login</h1>  {/* ✅ Fixed heading */}
                <div className="flex w-60 items-center justify-center flex-col mt-5 gap-3 rounded-lg hover:bg-slate-100">
                    <button className="block h-full text-center" onClick={googleLogin}>
                        Login With Google <img src={googlelogo} className="h-11 w-11 inline-block" alt="Google logo" />
                    </button>
                </div>
                <form className="flex max-w-md flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput id="email" type="email" name="email" placeholder="name@flowbite.com" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput id="password" type="password" name="password" required shadow />
                    </div>
                    {error?<p className="text-red-600">Email or Password is incorrect</p>:''}
                    {/* {error && <p className="text-red-500">{error}</p>} */}
                    <p className="font-semibold pl-1">
                        {`Don't`} have an account?
                        <Link to="/sign-up" className="text-teal-600 px-2 font-bold">Sign Up</Link>  {/* ✅ Fixed text */}
                    </p>
                    <Button type="submit">Login</Button>  {/* ✅ Fixed button text */}
                </form>
            </div>
        </div>
    );
};

export default Login;
