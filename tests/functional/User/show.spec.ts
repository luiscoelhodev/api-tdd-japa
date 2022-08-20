import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Showing users', (showTest) => {
  showTest.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})
