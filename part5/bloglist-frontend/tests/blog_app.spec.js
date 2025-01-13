const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createBlogWithLikes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'testuser',
        username: 'testuser',
        password: 'password123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')

      await expect(page.getByText('testuser logged in logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpassword')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')
      await createBlog(page, 'Test Blog Title', 'Test Author', 'http://testblog.com')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('A new blog "Test Blog Title" by Test Autho')).toBeVisible()
      await expect(page.getByText('Test Blog Title by Test Author')).toBeVisible()
    })

    test('user can delete their own blog', async ({ page }) => {
      await createBlog(page, 'Test Delete', 'Test Author', 'http://testblog.com')
      await expect(page.getByText('Test Delete by Test Author')).toBeVisible()

      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })

      const blogToDelete = page.locator('div').filter({ hasText: 'Test Delete by Test Author' }).nth(2)
      await blogToDelete.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('Test Delete by Test Author')).not.toBeVisible()
    })

    test('blogs are ordered by number of likes in descending order', async ({ page }) => {
      await createBlogWithLikes(page, 'Blog 1', 'Author 1', 'http://blog1.com', 2)
      await createBlogWithLikes(page, 'Blog 2', 'Author 2', 'http://blog2.com', 3)
      await createBlogWithLikes(page, 'Blog 3', 'Author 3', 'http://blog3.com', 1)

      const blogs = page.locator('.blog')
      await expect(blogs).toHaveCount(3)

      const blogsTexts = await blogs.allTextContents()
      const likeCounts = blogsTexts.map((text) => {
        const match = text.match(/Likes: (\d+)/)
        return match ? parseInt(match[1], 10) : 0
      })

      for (let i = 1; i < likeCounts.length; i++) {
        expect(likeCounts[i - 1]).toBeGreaterThanOrEqual(likeCounts[i])
      }
    })
  })
})