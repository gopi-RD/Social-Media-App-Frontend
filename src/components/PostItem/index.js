
import "./index.css"
const PostItem=(props)=>{
    const {postDetails,onUpdateLikeStatus,onUpdateComments}=props 
    const {id,content,imageUrl,isLiked,username}=postDetails 
    const onChangeLike= async ()=>{
       onUpdateLikeStatus(id)
   }
    const onCommentButton=()=>{
       onUpdateComments(id)
    }

    return (
        <li className="post-item-container">
             <div className="post-card-container">
                <div className="post-top-container">
                    <div className="profile-details">
                        <span className="profile-logo">
                        </span>
                        <p className="username">
                        {username}
                        </p>
                    </div>
                    <img src="https://img.icons8.com/?size=100&id=21618&format=png&color=000000" className="post-details" alt="three dots"/>
                </div>
                <img src={imageUrl}className="post-img" alt="post"/>
            </div>
             <div className="post-content-container">
                <div className="post-like-share-details-container">
                        <img src={isLiked[0] ? "https://img.icons8.com/?size=100&id=118977&format=png&color=000000":"https://img.icons8.com/?size=100&id=87&format=png&color=000000"} className="icon-img"  alt="Like" onClick={onChangeLike} />
                        <img src="https://img.icons8.com/?size=100&id=143&format=png&color=000000" className="icon-img" alt="Comment" onClick={onCommentButton}/>
                        <img src="https://img.icons8.com/?size=100&id=11504&format=png&color=000000" className="icon-img" alt="Share"/>
                </div>
                <div className="description-container">
                    <p className="likes-text">Likes</p> 
                    <p className="post-description">
                        <span className="username-text" >
                            {username}
                        </span> 
                        {content}
                    </p>
                    <p className="post-description">View all Comments</p>
                </div>
            </div>

        </li>
    )
}

export default PostItem;