import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Updating users', (updateTest) => {
  updateTest.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})
