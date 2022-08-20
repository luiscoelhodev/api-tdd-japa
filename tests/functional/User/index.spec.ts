import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Indexing users', (indexTest) => {
  indexTest.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})
