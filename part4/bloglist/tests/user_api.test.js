const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('User creation', () => {
  test('succeeds with a valid username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      password: 'password',
      name: 'name',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newUser.username)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('fails with status code 400 if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'admin123',
      name: 'name',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'name',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'us',
      password: 'securepassword',
      name: 'Short Username',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'validusername',
      password: 'pw',
      name: 'Short Password',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'admin123',
      name: 'name',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(response.body.error.includes('expected `username` to be unique'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
