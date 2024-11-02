import {useState} from "react"
import {Link} from "react-router-dom"
import Header from "../Header"
import "./index.css"

const RegisterRoute = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isUserErr, setIsUserErr] = useState(false);
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [isErr, setIsErr] = useState(false);
    const [isErrorMsg, setIsErrorMsg] = useState('');
    
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setIsUserErr(false);
    }
    
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setIsEmailErr(false);
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setIsPasswordErr(false);
    }

    const onChangeCheckbox=(e)=>{
        setShowPassword(e.target.value)

    }


    const onSubmitSuccess=()=>{
        setIsErr(false);
        props.history.replace('/login');
    }

    const onSubmitFailure=(errorMsg)=>{
        setIsErr(true);
        setIsErrorMsg(errorMsg);
    }
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        if (username===""){
            setIsUserErr(true);
            return;
        }
        if (email===""){
            setIsUserErr(false);
            setIsEmailErr(true);
            return;
        }
        if (password===""){
            setIsUserErr(false);
            setIsEmailErr(false);
            setIsPasswordErr(true);
            return;
        }
        else{
            setIsUserErr(false);
            setIsEmailErr(false);
            setIsPasswordErr(false);
        }
        
        const userData = {
            username,
            email,
            password
        };

        const url="https://social-media-app-backend-rxyp.onrender.com/api/register"
        const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response= await fetch(url, options)
    const data=await response.json()
    console.log(data)
    if (data.status===200){
      onSubmitSuccess()
    }else{
      onSubmitFailure(data.err_msg)

    }


    }



  return (
    <>
    <Header />
                   <div className="home-page-container">
                    <form className="register-form-container" onSubmit={onSubmitForm}>
                        <h1 className="website-text">Sign-up Social Media App</h1> 
                        <div className="separator">
                        <label className="re-label-text" htmlFor="username">USERNAME</label>
                        <input className={`re-input-element ${isUserErr && "error-input-border"}`} type="text" id="username" value={username} onChange={onChangeUsername} placeholder="Enter the Username"/>
                        {isUserErr && <p className="error-text">*Required</p>}
                        </div>
                        <div className="separator">
                            <label  className="re-label-text" htmlFor="email">Email</label>
                            <input className={`re-input-element ${isEmailErr && "error-input-border"}`}  type="text" id="email" value={email} onChange={onChangeEmail} placeholder="Enter the Email"/>
                            {isEmailErr && <p className="error-text">*Required</p>}
                        </div>
                        <div className="separator">
                            <label  className="re-label-text" htmlFor="password">PASSWORD</label>
                            <input className={`re-input-element ${isPasswordErr && "error-input-border"}`} type={showPassword?"text":"password"} id="password" value={password} onChange={onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className="error-text">*Required</p>}
                        </div>
                        <div className="separator">
                        <div className="re-shown-password">
                            <input type="checkbox" id="shownPassword"  className="re-checkbox" onChange={onChangeCheckbox} />
                            <label className="re-label-text" htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className="re-submit-button" type="submit">
                            Submit
                        </button>
                        {isErr && <p className="error-text">{isErrorMsg}</p>} 
                        </div>
                        <div className="sign-in-container">
                        <Link className="sign-in" to="/login">Sign-in</Link>
                        </div>
                        
                       
                    </form>
                </div>
                </>
               
            
  )
}

export default RegisterRoute