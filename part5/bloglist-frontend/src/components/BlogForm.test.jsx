import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BlogForm from './BlogForm';
import axios from 'axios';

vi.mock('axios');

describe('BlogForm', () => {
  test('calls addBlog with the correct details when the form is submitted', async () => {
    const user = userEvent.setup();
    const addBlogMock = vi.fn();

    const newBlog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test-url.com',
    };

    axios.post.mockResolvedValueOnce(newBlog);

    render(<BlogForm addBlog={addBlogMock} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const urlInput = screen.getByPlaceholderText('Url');

    await user.type(titleInput, 'Test Title');
    await user.type(authorInput, 'Test Author');
    await user.type(urlInput, 'https://test-url.com');

    await user.click(screen.getByText('create'));

    expect(addBlogMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test-url.com',
    });
  });
});
