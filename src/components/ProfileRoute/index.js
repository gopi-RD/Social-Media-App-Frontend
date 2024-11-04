import {useEffect} from "react"

import { useSelector,useDispatch } from 'react-redux';
import { getProfile } from '../../redux/createPostSlice';
import "./index.css"
const ProfileRoute=()=>{
    const dispatch=useDispatch()
    const {profileData}=useSelector((store)=>{return store.postState })

    useEffect(()=>{
        dispatch(getProfile())
    },[dispatch])

    
    return(
        <div>
           <div className="profile-container">
                <h1 className="user-name">{profileData.username}</h1> 
                <div className="post-and-follower-container">
                    <div className="profile-logo">
                    </div>
                    <div className="col-container">
                        <p className="name">Posts</p>
                        <p className="value">{profileData.postsCount}</p>
                    </div>
                    <div className="col-container">
                         <p className="name">followers</p>
                         <p  className="value">{profileData.followers}</p>
                    </div>
                    <div className="col-container">
                        <p className="name">
                        following
                        </p>
                        <p className="value">{profileData.following}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ProfileRoute;
