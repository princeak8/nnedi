import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";
import FullBlogPost from "./components/FullPost";
import client from "./api/client";
import { settingsActions } from "./store/settingsSlice";
import { postActions } from "./store/postsSlice";
import post from "./api/post";
import { UserStore } from './store/UserStore';
import RelatedPost from "./components/RelatedPost";

import Index from "./screens/Index";
import Register from "./screens/Register";
import Login from "./screens/Login";
import About from "./screens/About";
import ConfirmEmailLink from "./screens/ConfirmEmail";

function App() {

  const [title, setTitle] = useState("Default Title");
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const domain = process.env.REACT_APP_DOMAIN;
  const {token, token_expires} = UserStore();

  //console.log('token: ',token);

  let now = parseInt(Date.now()/1000);
  if(token_expires != null && now > token_expires)   {
      localStorage.removeItem("user"); 
      localStorage.removeItem("token"); 
      localStorage.removeItem("token_expires"); 
  }

    useEffect(() => {
      // This will run when the page first loads and whenever the title changes
      document.title = title;
      getSettings();
      getLatestPosts();
    }, [title]);

    const getSettings = async () => {
        const domain = process.env.REACT_APP_DOMAIN;
        const response = await client.apiPostClient.get(domain + '/settings', {});
        if (response.ok) {
            //console.log('settings: ',response.data);
            setTitle(response.data.data.blog_name);
            dispatch(settingsActions.set(response.data.data));
            
        }else{
            console.log('settings error: ',response.data);
        }
    }

    const getLatestPosts = async () => {
      const response = await post.getLatestPosts(domain);
      console.log('latest post response: ', response);
      if (!response.ok) return console.error(response.data);
  
      dispatch(postActions.updateLatestPosts(response.data.data));
    };
    
  return (
    <Routes>
        <Route path="/RelatedPost" element={<RelatedPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<FullBlogPost />} />
        <Route path="/confirm_email/:signature" element={<ConfirmEmailLink />} />
        <Route path="/page/:page" element={<Index />} />
        <Route path="/page" element={<Index />} />
        <Route path="/" element={<Index />} />
    </Routes>
  );
}

export default App;
