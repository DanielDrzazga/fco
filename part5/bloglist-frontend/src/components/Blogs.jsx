import { useState, useEffect, useRef } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ handleMessage, user }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url,
    };

    blogService.setToken(user.token);

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

    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const deleteBlog = (id) => {
    blogService.deleteBlog(id).then(() => {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      handleMessage('Blog removed successfully', false);
    });
  };

  const sortedBlogs = blogs.sort((current, next) => next.likes - current.likes);

  return (
    <>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </>
  );
};

export default Blogs;
