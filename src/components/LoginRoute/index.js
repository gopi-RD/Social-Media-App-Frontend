import {useState} from "react"
import Cookies from "js-cookie"
import Header from "../Header"

import "./index.css"
const LoginRoute=(props)=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setShowPassword(e.target.checked);
  };


  const onSubmitSuccess=(jwtToken)=>{
    console.log(jwtToken);
    setIsErr(false);
    Cookies.set("jwt_token", jwtToken); 
    props.history.replace("/")
  }

  const onSubmitFailure=(data)=>{
    setIsErr(true);
    setIsErrorMsg(data.err_msg);

  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (email===""){
      setIsEmailErr(true);
      return;
    }
    if (password===""){
      setIsEmailErr(false);
      setIsPasswordErr(true);
      return;
    }
    else{
      setIsEmailErr(false);
      setIsPasswordErr(false);
    }
    const userData={
      email,
      password
    }

    const url="https://social-media-app-backend-rxyp.onrender.com/api/login"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response= await fetch(url, options)
    const data=await response.json()
    console.log(data)
    if (data.jwt_token!==undefined){
      onSubmitSuccess(data.jwt_token)
    }else{
      onSubmitFailure(data)

    }




   
  }
  return (
    <>
    <Header/>
                   <div className="lg-home-page-container"  >
                    <form className="lg-register-form-container" onSubmit={onSubmitForm}>
                        <h1 className="lg-website-text">Login Social Media App </h1> 
                        <div className="lg-separator">
                        <label className="lg-label-text" htmlFor="username">Email</label>
                        <input className={`lg-input-element ${isEmailErr && "error-input-border"}`}  type="text" id="username" value={email} onChange={onChangeEmail} placeholder="Enter the Email"/>
                        {isEmailErr && <p className="error-text">*Required</p>}
                        </div>
                        <div className="lg-separator">
                            <label  className="lg-label-text" htmlFor="password">PASSWORD</label>
                            <input className={`lg-input-element ${isPasswordErr && "error-input-border"}`} type={showPassword?"text":"password"} id="password" value={password} onChange={onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className="error-text">*Required</p>}
                        </div>
                        <div className="lg-separator">
                        <div className="lg-shown-password">
                            <input type="checkbox" id="shownPassword"  className="lg-checkbox"  onChange={onChangeCheckbox} />
                            <label className="lg-label-text" htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className="lg-submit-button"type="submit">
                            Submit
                        </button>
                        {isErr && <p className="error-text">{isErrorMsg}</p>} 
                        </div>
                        
                        
                       
                    </form>
                </div>
                </>
  )
}

export default LoginRoute;