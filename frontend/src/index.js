import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './login_page/Login.js';
import Signup from './login_page/Signup';
import Hero from './landing_page/Hero.js';
import PostFeed from './feed_page/PostFeed.js';
import PostDetails from './feed_page/PostDetails.js';
import UserProfile from './feed_page/UserProfile.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:username" element={<Hero />} />
      <Route path="/user/:username/feed" element={<PostFeed />} />
      <Route path="/post/:postId" element={<PostDetails />} />
      <Route path="/user/:userId" component={<UserProfile />} />  
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
