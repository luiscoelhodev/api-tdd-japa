import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/User/StoreValidator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    await request.validate(StoreValidator)
    const userBody = request.only(['name', 'cpf', 'email', 'password'])

    const newUser = new User()
    const storeUserTrx = await Database.transaction()

    try {
      newUser.fill(userBody)
      newUser.useTransaction(storeUserTrx)
      await newUser.save()

      const userRole = await Role.findByOrFail('type', 'user')
      await newUser.related('roles').attach([userRole.id])
    } catch (error) {
      await storeUserTrx.rollback()
      return response.badRequest({ message: `Error in storing user.`, error: error.message })
    }

    await storeUserTrx.commit()
    let newUserFound
    try {
      newUserFound = await User.query().where('id', newUser.id).preload('roles').firstOrFail()
    } catch (error) {
      return response.notFound({
        message: `Error in finding this user created.`,
        error: error.message,
      })
    }
    return response.created({ newUserFound })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
