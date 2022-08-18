import { test } from '@japa/runner'

test.group('Database', () => {
  test('DB Connection', async ({ client }) => {
    const response = await client.get('/db_connection')

    response.assertStatus(200)
    response.assertBodyContains({ message: `Awesome! Connection is healthy (:` })
  })
})
