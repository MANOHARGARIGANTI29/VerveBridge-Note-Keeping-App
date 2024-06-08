import { useState } from "react";
import Navbar from "../components/Navbar";
import { ValidateEmail } from "../utils/validations";
import PasswordInput from "../components/inputfields/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosinstances';

const SignUp = ()=>{

    const[email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState(null);
    const navigate = useNavigate();

    const handleSignup=async(e)=>{
        e.preventDefault();
        if(!ValidateEmail(email)){
            setError("please enter the email address.");
            return;
        }
        if(!password){
            setError("please enter the password");
            return;
        }
        if(!username){
            setError("please enter your username")
        }
        setError("");
        //signup-API -call
        try{
            const response = await axiosInstance.post("/create-account",{
                fullName:username,
                email:email,
                password:password,
            });
            //handle successful registration response
            if(response.data && response.data.error){
                setError(response.data.message)
                return
            }
            if(response.data&&response.data.accessToken){
                localStorage.setItem("token",response.data.accessToken);
                navigate("/dashboard");
            }
           }catch(error){
            //handle registration error
            if(error.response && error.response.data&&error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError("An unexpected error occurred.Please try again.")
            }
           }


    }
    return(
        <>
        <Navbar/>
        <div className=" flex items-center justify-center mt-28 px-4 sm:px-6 lg:px-8 ">
           <div className="w-full max-w-md border rounded bg-white px-7 py-10">
               <form onSubmit={handleSignup}>
                   <h4 className="text-2xl mb-7">SignUp</h4>
                   <input type="text" placeholder="Username" className="input-box w-full mb-4 p-3 border rounded"
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}/>
                   <input type="text" placeholder="Email" className="input-box w-full mb-4 p-3 border rounded"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}/>
                    <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                    <button type="submit" className="btn-secondary w-full p-3 bg-primary text-white rounded mt-4">Create Account</button>
                    <p className="mt-4 text-center">Already have an account?{""}
                    <Link to="/login" className="font-medium text-primary underline">Login</Link></p>


                  </form> </div></div></>
 
    )
}
export default SignUp;