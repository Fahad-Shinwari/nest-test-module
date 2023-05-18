import { useState } from "react";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";
import { toast } from 'react-toastify';
import axios from "axios";
import { validateEmail } from "../utils/InputFormats";

export default function Login() {
  const [isLogin,setIsLogin] = useState(true);
  const [login,setLogin] = useState({loginEmail:'',loginPassword:''});
  const [signUp,setSignUp] = useState({signupName:'',signupEmail:'',signupRole:'',signupPass:''});

  const handleLogin = async(event) => {
    event.preventDefault();
    
    if (!login.loginEmail.trim() || !login.loginPassword.trim()) {
      return toast.error('Please fill the fields');
    }
    
    try {
      const { data: user, status } = await axios.post('auth/login', {
        email: login.loginEmail,
        password: login.loginPassword
      });
    
      if (status === 200 || status === 201) {
        const { token } = user;
        localStorage.setItem('role', user.role);
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', true);
        return toast.success('You have Logged In');
      }
    } catch (e) {
      if (e.response.status) {
        return toast.error('Wrong Credentials');
      }
    }
  };
 
  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    if(signUp.signupName.trim() === '' || signUp.signupEmail.trim() === '' || signUp.signupPass.trim() === '') {
      return toast.error("Please fill the fields")
    }
    if(!validateEmail(signUp.signupEmail)){
      return toast.error("The Email Address format is wrong")
    }
    try {
      const res = await axios.post(`user/signup`,{ 
        "username": signUp.signupName,
        "email": signUp.signupEmail,
        "password": signUp.signupPass,
        "role": "user",
    });
      if(res.status==201){
        return toast.success("You have Signed Up")
      }
    }
    catch(e) {
      const { message } = e.response.data; 
      return toast.success(message[0]);
    }
  };

  const handleChangeLogin =  e => {
    setLogin({...login,[e.target.name]:e.target.value})
  }
  const handleChangeSignup =  e => {
    setSignUp({...signUp,[e.target.name]:e.target.value})
  }
  const changeLoginStatus = () => {
    setIsLogin(!isLogin)
  }
  return (
      isLogin ? <LoginComponent setIsLogin={changeLoginStatus} handleLogin={handleLogin} handleChangeLogin={handleChangeLogin}/> 
      : <SignupComponent setIsLogin={changeLoginStatus} handleChangeSignup={handleChangeSignup} handleSignupSubmit={handleSignupSubmit} />
    )
  }