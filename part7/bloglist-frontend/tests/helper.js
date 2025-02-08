const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByPlaceholder('Title').fill(title)
  await page.getByPlaceholder('Author').fill(author)
  await page.getByPlaceholder('Url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const createBlogWithLikes = async (page, title, author, url, likes) => {
  createBlog(page, title, author, url)

  const blog = page
    .locator('div')
    .filter({ hasText: `${title} by ${author} viewdelete` })
    .first()
  await blog.getByRole('button', { name: 'view' }).click()

  const blogDetails = page.getByText(`${title} by ${author} hideURL:`)

  for (let i = 0; i < likes; i++) {
    await blogDetails.getByRole('button', { name: 'like' }).click()
    await page.waitForTimeout(100)
  }
}

export { loginWith, createBlog, createBlogWithLikes }
