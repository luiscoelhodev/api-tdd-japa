/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/db_connection', async ({ response }: HttpContextContract) => {
  await Database.report().then((health) => {
    if (health.health.healthy === true) {
      return response.ok({ message: `Awesome! Connection is healthy (:` })
    }
    return response.status(500).json({ message: `Connection is not healthy :(` })
  })
})

Route.get('/users', async () => {
  return { message: `Returns all users.` }
})
