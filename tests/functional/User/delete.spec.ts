import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Deleting users', (deleteTest) => {
  deleteTest.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})
