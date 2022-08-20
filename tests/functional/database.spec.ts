import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Database', () => {
  test('DB Connection', async ({ client }) => {
    const adminUser = await User.findOrFail(1)
    const response = await client.get('/tests/db_connection').guard('api').loginAs(adminUser)

    response.assertStatus(200)
    response.assertBodyContains({ message: `Awesome! Connection is healthy (:` })
  })
})
