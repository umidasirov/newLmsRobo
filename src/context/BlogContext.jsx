import React, { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPost, setBlogPost] = useState(null);

  return (
    <BlogContext.Provider
      value={{
        blogPosts,
        setBlogPosts,
        blogPost,
        setBlogPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
