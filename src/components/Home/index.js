import {useEffect } from "react"
import Loader from "react-loader-spinner"
import NavBar from "../NavBar"
import PostItem from "../PostItem"
import { useSelector,useDispatch } from 'react-redux';
import { getPosts,likePost } from '../../redux/createPostSlice';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./index.css"
const Home=()=>{
    const dispatch = useDispatch();
    const {postList,loading,error}=useSelector((store)=>{return store.postState })

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch],[])


    const onUpdateLikeStatus=(id)=>{
       const data={
        id:id,
       }
        dispatch(likePost(data))
        dispatch(getPosts())
    }
    
    const renderLoadingView=()=>{
        return(
            <div className="loading-container">
                <Loader type="ThreeDots" color="#000000" height={100} width={100}/>
            </div>
        )

    }

    const renderPosts=()=>{

        return(
            <div className="home-container">
                <NavBar/>
                <div className="">
                    <div className="home-website-logo-container">
                        <span className="website-logo">
                            S
                        </span>
                    </div>
                    <div className="home-content-container">
                        <ul className="posts-container-list">
                           {
                            postList.map((post)=>(
                                <PostItem key={post.id} postDetails={post} onUpdateLikeStatus={onUpdateLikeStatus} />
                            ))
                           }
                        </ul>
                    </div>
                </div>
            </div>
              
        
            )

    }

    const renderHomePage=()=>{
        switch(true){
            case loading:
                return renderLoadingView()
            case error:
                return(
                    <div className="error-message-container">
                        <p className="error-message">Please try again</p>
                    </div>
                )
            default:
                return renderPosts()
        }
    }


    return (
        renderHomePage()
    )

    
}

export default Home;