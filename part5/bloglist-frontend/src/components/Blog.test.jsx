import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event'
import axios from 'axios';

vi.mock('axios');

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
  };

  render(<Blog blog={blog} />);

  expect(screen.getByText('Test Blog by Test Author')).toBeInTheDocument();

  expect(screen.queryByText('https://example.com')).not.toBeInTheDocument();
  expect(screen.queryByText('Likes: 10')).not.toBeInTheDocument();
});

test('displays URL and likes after clicking view button', async () => {
  const user = userEvent.setup()
  const updateBlog = vi.fn();
  const deleteBlog = vi.fn();

  const loggedUser = {
    id: 'user1',
    username: 'testuser',
    name: 'tUser'
  }
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
    user: loggedUser,
  };


  render(
    <Blog
      user={loggedUser}
      blog={blog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
    />
  );

  expect(screen.queryByText('URL: https://example.com')).not.toBeInTheDocument();
  expect(screen.queryByText('Likes: 10')).not.toBeInTheDocument();

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const urlElement = await screen.findByText('URL: https://example.com');
  const likesElement = await screen.findByText('Likes: 10');

  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
});

test('calls event handler twice when like button is clicked twice', async () => {
  const user = userEvent.setup();
  const updateBlog = vi.fn();
  const deleteBlog = vi.fn();

  const loggedUser = {
    id: 'user1',
    username: 'testuser',
    name: 'tUser',
  };

  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
    user: loggedUser,
  };

  axios.put.mockResolvedValueOnce({ data: { likes: 11 } }); // First call mock
  axios.put.mockResolvedValueOnce({ data: { likes: 12 } }); // Second call mock

  render(
    <Blog
      user={loggedUser}
      blog={blog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
    />
  );

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = await screen.findByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(updateBlog).toHaveBeenCalledTimes(2);
});