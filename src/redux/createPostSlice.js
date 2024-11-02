import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Cookies from "js-cookie"
const token=Cookies.get("jwt_token")



export const createPostSlice = createSlice({
  name:"postslice",
  initialState:{
      postList:[],
      loading: false,
      error:null,
      searchData: []
  },
  reducers:{
    postLoading:(state)=>{
      state.loading=true
    },
    postData:(state,action)=>{
      state.loading=false
      state.postList=action.payload
    },
    postError:(state,action)=>{
      state.loading=false
      state.error=action.payload
    },
    searchUsers:(state,action)=>{
      state.searchData=action.payload
    }
}

 
});

export const {postLoading,postData,postError,searchUsers} = createPostSlice.actions;

// Add New Post 


export const createPost = createAsyncThunk(
    "createPost",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
      const url="https://social-media-app-backend-rxyp.onrender.com/api/posts"
        const options={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(data)
        }
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


  // Get All Posts 


  export const getPosts = createAsyncThunk(
    "getPosts",
    async (args, {dispatch}) => {
      dispatch(postLoading());
      const url="https://social-media-app-backend-rxyp.onrender.com/api/posts"
        const options={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
  
      try {
        const response = await fetch(url, options);
        const result =  await response.json();
        console.log(result);
        const updatedData=result.posts.map(post=>({
          id:post._id,
          content:post.content,
          imageUrl:post.imageUrl,
          likes:post.likes,
          createdAt:post.createdAt,
          commentsCount:post.comments.length,
          userId:post.userId._id,
          username:post.userId.username,
          likesCount:post.likesCount,
          isLiked:post.likes.map(eachItem=>(
             eachItem._id.includes(post.userId._id)
          ))
      }))
      
        console.log(updatedData)
        dispatch(postData(updatedData));
        
      } catch (error) {
        dispatch(postError(error));
      }
    }
  );
  

  // Post Liked By user 

  export const likePost = createAsyncThunk(
    "posts/likePost",
    async (data, {dispatch }) => {
      const {id} = data;
      const url = `https://social-media-app-backend-rxyp.onrender.com/api/posts/${id}/like`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.log(error);
      }
    }
  );

  // Search Users

  export const getUsers = createAsyncThunk(
    "getUsers",
    async (searchText, {dispatch}) => {
      dispatch(postLoading());
      const url=`https://social-media-app-backend-rxyp.onrender.com/api/users/search?search=${searchText}`
        const options={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
  
      try {
        const response = await fetch(url, options);
        const result =  await response.json();
        console.log(result);
        const updatedData=result.users.map(user=>({
            id:user._id,
            username:user.username,
            email:user.email,
            postsCount:user.posts.length,
            createdAt:user.createdAt,
            followers:user.followers,
            following:user.following,
           /* isFollowing:user.following.map(eachItem=>(
               eachItem._id.includes(userId)
            )) */
          }))

        console.log(updatedData)
        dispatch(searchUsers(updatedData));
        
      } catch (error) {
        //dispatch(postError(error));
        console.log(error);
      }
    }
  );
  





/*export const toggleLike = (postId,userId,like) => ({
    type: 'TOGGLE_LIKE',
    payload: {postId,userId,like}
  });


  */
  

export default createPostSlice;

 