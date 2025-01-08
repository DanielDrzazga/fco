import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      updateBlog(returnedBlog);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmDelete) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{' '}
        <button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>Added by: {blog.user.name}</p>
        </div>
      )}
      {user && user.name === blog.user.name && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
