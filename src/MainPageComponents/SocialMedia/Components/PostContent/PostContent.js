import React from "react";
import ReactQuill from "react-quill";
import "./PostContent.css";

const PostContent = ({ content }) => {
  return <ReactQuill value={content} readOnly theme="bubble" />;
};

export default PostContent;
