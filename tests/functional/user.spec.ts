import { test } from '@japa/runner'

test.group('Storing users', () => {
  test('no request body', async ({ client }) => {
    const response = await client.post('/users')

    response.assertStatus(422)
  })

  test('name missing in request body', async ({ client }) => {
    const response = await client
      .post('/users')
      .json({ cpf: '111.222.333-00', email: 'email@email.com', password: '123456' })

    response.assertStatus(422)
  })

  test('cpf missing in request body', async ({ client }) => {
    const response = await client
      .post('/users')
      .json({ name: 'Test User', email: 'email@email.com', password: '123456' })

    response.assertStatus(422)
  })
  test('email missing in request body', async ({ client }) => {
    const response = await client
      .post('/users')
      .json({ name: 'Test User', cpf: '111.222.333-00', password: '123456' })

    response.assertStatus(422)
  })
  test('password missing in request body', async ({ client }) => {
    const response = await client
      .post('/users')
      .json({ name: 'Test User', email: 'email@email.com', cpf: '111.222.333-00' })

    response.assertStatus(422)
  })

  test('name should be valid', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Test User 123',
      email: 'email@email.com',
      cpf: '111.222.333-00',
      password: '123456',
    })

    response.assertStatus(422)
  })
  test('cpf should be valid', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Test User',
      email: 'email@email.com',
      cpf: '111a222b333c-dd',
      password: '123456',
    })

    response.assertStatus(422)
  })
  test('email should be valid', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Test User',
      email: 'email.email.com',
      cpf: '111.222.333-00',
      password: '123456',
    })

    response.assertStatus(422)
  })
  test('password should be valid', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Test User',
      email: 'email@email.com',
      cpf: '111.222.333-00',
      password: 'this password is too long to be accepted by the server',
    })

    response.assertStatus(422)
  })

  test('user should be created if all request info is valid', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Test User',
      cpf: '111.222.333-00',
      email: 'email@email.com',
      password: '123456',
    })

    response.assertStatus(201)
    response.assertBodyContains({ newUserFound: {} })
  })
})

test.group('Updating users', () => {})
test.group('Deleting users', () => {})
test.group('Showing a user', () => {})
test.group('All users', () => {})
