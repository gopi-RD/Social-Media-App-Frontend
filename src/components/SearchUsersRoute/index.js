import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getUsers } from '../../redux/createPostSlice';
import "./index.css"
const SearchUsersRoute=()=>{
    const [isSearch,setIsSearch]=useState()
    const {searchData}=useSelector((store)=>{return store.postState })
        const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUsers(isSearch))
    },[isSearch, dispatch])

    const onSearchUser=(e)=>{
        setIsSearch(e.target.value)
    }

    return(
        <div className="search-page-container">
            <div className="top-serach-container">
                <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729253527/new%20icons/f9okm8er7kt6tdwzzeum.png" className="left-arrow" alt="arrow" />
                <div className="search-container">
                  <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729326192/new%20icons/wgpua0psjpf3gwitvdi2.png" className="search-icon" alt="search icon" />
                  <input type="search" placeholder="Search your friend" value={isSearch} className="custom-search" onChange={onSearchUser} />  
                </div>
            </div>
            <ul>
               {
                searchData.map(user=>(
                  <li className='profile-description' key={user.id}>
                    <span className="profile-logo">
                    </span>
                    <span className="profile-name">{user.username}</span>
                  </li>
                ))
                
 
               }
            </ul>
        </div>
    )




}

export default SearchUsersRoute;