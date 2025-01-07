import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from '../components/Blog';
import BlogForm from './BlogForm';

const Blogs = ({ handleMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url,
    };

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .then(() => {
        handleMessage(
          `A new blog "${newBlog.title}" by ${newBlog.author} added`,
          false
        );
      })
      .catch((error) => {
        handleMessage('Error adding blog', true);
      });
  };

  return (
    <>
      <BlogForm addBlog={addBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
