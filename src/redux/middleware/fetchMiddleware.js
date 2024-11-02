import {useSelector} from "react-redux"
import createPostSlice from '../createPostSlice';
import Cookies from "js-cookie"
const actions = createPostSlice.actions;
const token=Cookies.get("jwt_token")


export const likeMiddleware = async (dispatch)=> {

    const {image,caption}=useSelector((store) => store.postState);
        console.log(image,caption,"okkkk")
        const url="https://social-media-app-backend-rxyp.onrender.com/api/posts"
        const options={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({image,caption})
        }

        const response=await fetch(url, options)
        const data= await response.json() 
        console.log(data) 
        
        // Reset form state
        dispatch(actions.setImage("")) 
        dispatch(actions.setIsPreview(false))
        dispatch(actions. setCaption(""))
        dispatch(actions.setIsImageErr(false))
        dispatch(actions.setIsCaptionErr(false) )

} 

