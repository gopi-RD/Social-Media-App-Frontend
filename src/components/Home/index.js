import {useState,useEffect} from "react"
import Loader from "react-loader-spinner"
import NavBar from "../NavBar"
import PostItem from "../PostItem"
import { useSelector,useDispatch } from 'react-redux';
import { getPosts,likePost } from '../../redux/createPostSlice';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Cookies from 'js-cookie'
import "./index.css"
import Comment from "../Comment";
const Home=(props)=>{
    const dispatch = useDispatch();
    const {postList,loading,error}=useSelector((store)=>{return store.postState })
    const [isOpen,setIsOpen]=useState(false)
    const [isOpenComment,setIsOpenComment]=useState(false)
    const [activePostId,setActivePostId]=useState()
    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch],[])
    
    
   


    const onUpdateLikeStatus=  (id)=>{
       const data={
        id:id,
       }
        dispatch(likePost(data)) 
    }

    
    
    const onOpenMenu=()=>{
        setIsOpen(!isOpen)
    }
    
    const renderLoadingView=()=>{
        return(
            <div className="loading-container">
                <Loader type="ThreeDots" color="#000000" height={100} width={100}/>
            </div>
        )

    }

    const onLogout=()=>{
        Cookies.remove("jwt_token")
        props.history.replace("/login")
        
    }

    const onRenderMenu=()=>{
        return (
            <ul className="menu-list-items">
                <li className="menu-item">Setting</li>
                <li className="menu-item" onClick={onLogout}>Logout</li>
            </ul>
        )
    }

    const onUpdateComments=(id)=>{
        setActivePostId(id)
        setIsOpenComment(!isOpenComment)
    } 

    const onUpdateCancelComment=(value)=>{
        setIsOpenComment(value)
    }


    const renderPosts=()=>{

        return(
            <div className="home-container">
                <NavBar/>
                <div className="home-card-container">
                    <div className="top-logo-container">
                        <div className="home-website-logo-container">
                            <span className="website-logo">
                                S
                            </span>
                        </div>
                        <img  src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1730632417/mdksko4mmkbhvtdxrrda.png" className="hamberger-icon" alt="hamberger" onClick={onOpenMenu} />
                    </div> 
                    <div className="home-content-container">
                        <ul className="posts-container-list">
                           {
                            postList.length>0 ? (
                            postList.map((post)=>(
                                <PostItem key={post.id} postDetails={post} onUpdateLikeStatus={onUpdateLikeStatus} onUpdateComments={onUpdateComments} />
                            ))) : (
                                <div className="no-post-message-container">
                                    <p className="no-post-message">No Post Found</p>
                                </div>
                            )
                           
                           }
                        </ul>
                        {isOpen && onRenderMenu()}
                        {  
                          isOpenComment && <Comment postId={activePostId} onUpdateCancelComment={onUpdateCancelComment}/>}
                       
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