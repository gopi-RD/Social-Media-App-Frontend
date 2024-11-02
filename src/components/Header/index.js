
import {Link} from "react-router-dom"
import "./index.css"
const Header =()=>{

    


    return (
        <header className="header-top-container"> 
        <nav className="header-container">
            <h1 className="website-logo">Social Media App</h1>

            <div className="buttons-container">
                <button className="login-button">
                    <Link className="nav-link" to="/login">Login</Link>
                </button>
                <button className="sign-up-button">
                    <Link className="nav-link" to="/sign-up">Sign up</Link>
                </button>
            </div>
            
        </nav>
        </header>
       
    )
}


export default Header