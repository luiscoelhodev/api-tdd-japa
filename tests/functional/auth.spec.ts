import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Login', (login) => {
  login.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('missing email in request body', async ({ client }) => {
    const response = await client.post('/login').json({ password: '123456' })

    response.assertStatus(422)
  })

  test('missing password in request body', async ({ client }) => {
    const response = await client.post('/login').json({ email: 'email@email.com' })

    response.assertStatus(422)
  })

  test('email is not valid', async ({ client }) => {
    const response = await client
      .post('/login')
      .json({ email: 'email.email.com', password: '123456' })

    response.assertStatus(422)
  })

  test('password is not valid', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'email@email.com',
      password: 'This password is going to be too long to be accepted by the server...',
    })

    response.assertStatus(422)
  })

  test('valid email and password, but user is not registered', async ({ client }) => {
    const response = await client
      .post('/login')
      .json({ email: 'notregistered@email.com', password: '123456' })

    response.assertStatus(401)
    response.assertBodyContains({ message: 'Invalid credentials' })
  })

  test('valid email and password, user is registered and should be able to login', async ({
    client,
  }) => {
    const response = await client
      .post('/login')
      .json({ email: 'admin@email.com', password: 'secret' })

    response.assertStatus(200)
    response.assertBodyContains({ token: {}, user: {} })
  })
})
