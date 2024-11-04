import {useState,useEffect} from "react"
import { useSelector,useDispatch } from 'react-redux';
import { postComment,getComments } from '../../redux/createPostSlice';
import "./index.css"

const colorList=[
    {
        color: "#FF0000",
        name: "Red"
    },
    {
        color: "#FFA500",
        name: "Orange"
    },
    {
        color: "#FFFF00",
        name: "Yellow"
    },
    {
        color: "#008000",
        name: "Green"
    },
    {
        color: "#00FF00",
        name: "Lime"
    },
    {
        color: "#00FFFF",
        name: "Cyan"
    },
    {
        color: "#0000FF",
        name: "Blue"
    },
    {
        color: "#FF00FF",
        name: "Magenta"
    }
    
]

const Comment=(props)=>{
    const {postId,onUpdateCancelComment}=props
    const [commentText,setCommentText]=useState("")
    const {comments}=useSelector((store)=>{return store.postState })
    const dispatch = useDispatch();
    
    useEffect(()=>{
        // Fetch comments for the post
        dispatch(getComments())
    },[dispatch])

    const onChangeComment=(e)=>{
        setCommentText(e.target.value)
    }

    const onSubmitComment=(e)=>{
        e.preventDefault()
        const data={
            commentText,
            postId
        }
        dispatch(postComment(data))
        dispatch(getComments())
       setCommentText("")
    }

    const onCancelComment=()=>{
        onUpdateCancelComment(false)
    }


    return (
        
        <div className="comment-container">
            <div className="comment-list-container">
                <img src="https://img.icons8.com/?size=100&id=79023&format=png&color=000000" className="cross-img" alt="cross" onClick={onCancelComment} />
                <h1 className="comments-heading">
                    Comments
                </h1>
                <ul className="comment-list-items">
                        {
                            comments.length>0 ? (
                                    comments.map(arr=>(
                                        arr.comments.map(comment=>{
                                            return (
                                            <li className="comment-item-container" key={comment.id}>
                                            <div className="comment-profile">
                                                <p>{comment.username.slice(0,1).toUpperCase()}</p>
                                            </div>
                                            <div className="comment-description">
                                                <h2 className="comment-username">{comment.username}</h2>
                                                 <p className="comment-text">{comment.commentText}</p>
                                            </div>
                                            </li>
                                        )
                                            

                                        })
                                    ))
                            ) :(
                                <p>No comments yet</p>
                            )
                        }
                </ul>
            </div>
            <form className="form-comment-container" onSubmit={onSubmitComment}>
                <input type="text" className="comment-input" value={commentText} placeholder="Write a comment..." onChange={onChangeComment}  />
                <button className="comment-button" type="submit">Submit</button>
            </form>
        </div>

    )

}

export default Comment;