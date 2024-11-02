import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/createPostSlice';
import "./index.css"

const CreatePostRoute=(props)=>{
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isCaptionErr, setIsCaptionErr] = useState(false);
    const [isImageErr, setIsImageErr] = useState(false);
    
    const dispatch=useDispatch()
    const onAddImagePost = (event) => {
        setIsImageErr(false)
        setIsPreview(true)
        const file=event.target.files[0]
            if (file.type.startsWith("image/")){
                const reader=new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend=()=>{
                    setImage(reader.result)
                }
            }
    };

    const onAddCaptionText=(event)=>{
        setIsCaptionErr(false)
       setCaption(event.target.value)
        
    }

    const onSubmitAddPost = async (event) => {
        event.preventDefault()
        // Add post to the database 
        if (image===""){
            setIsImageErr(true)
            return
        }
        if (caption===""){
          setIsImageErr(false)
           setIsCaptionErr(true)
            return
        }
        else{
            setIsImageErr(false)
            setIsCaptionErr(false)
        }
        // Send data to the server 
        const postData={
            imageUrl: image,
            content: caption
        }
        dispatch(createPost(postData))
        setImage('')
        setCaption('')
        setIsPreview(false)
        setIsCaptionErr(false)
        setIsImageErr(false)
        props.history.push('/')



    }

   

    return (
        <div className="create-post-container">
            <div className="new-post-container">
                <div className="cancal-container">
                    <img src="https://img.icons8.com/?size=100&id=79023&format=png&color=000000" className="cancel-img" alt="cancel"/> 
                    <h2 className="new-post-text">New Post</h2>
                </div>
            </div>
            <div className="create-post-description">
                <form className="form-post-container" onSubmit={onSubmitAddPost}>
                    <h1 className="add-post-text">
                        Add Post
                    </h1>
                    {isPreview && <img src={image} className="preview-image" alt="preview"/>}
                    <input type="file" accept="image/*" onChange={onAddImagePost} /> 
                    {isImageErr && <p className="error-text">*Required</p>}
                    <label className="caption-label">Caption</label>
                    <textarea className= {`textarea-input ${isCaptionErr && "error-input-border"}`} type="text" cols="20" rows="5" placeholder="Enter a Post Caption" onChange={onAddCaptionText}>
                    </textarea>
                    {isCaptionErr && <p className="error-text">*Required</p>}
                    <button className="add-post-btn" type="submit">
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    )

}

export default CreatePostRoute;