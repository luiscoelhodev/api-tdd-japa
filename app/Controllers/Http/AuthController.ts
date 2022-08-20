import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import LoginValidator from 'App/Validators/LoginValidator'
import Role from 'App/Models/Role'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    await request.validate(LoginValidator)

    const { email, password } = request.all()
    const user = await User.query().where('email', email).preload('roles').first()

    try {
      const token = await auth.use('api').attempt(email, password, {
        name: user?.name,
        expiresIn: Env.get('NODE_ENV') === 'development' ? '' : '30mins',
      })
      return { token, user }
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials', error })
    }
  }

  public async grantPermission({ request, response }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id, roles } = request.all()

    try {
      const userToGrantPermission = await User.findByOrFail('id', user_id)

      let roleIds: number[] = []
      await Promise.all(
        roles.map(async (roleType) => {
          const hasRole = await Role.findBy('type', roleType)
          if (hasRole) roleIds.push(hasRole.id)
        })
      )

      await userToGrantPermission.related('roles').sync(roleIds)
    } catch (error) {
      return response.badRequest({
        message: 'Error in granting permission.',
        originalError: error.message,
      })
    }

    try {
      return User.query().where('id', user_id).preload('roles').firstOrFail()
    } catch (error) {
      return response.badRequest({
        message: 'Error in finding user',
        originalError: error.message,
      })
    }
  }

  public async testAuthorization({ auth, route, response }: HttpContextContract) {
    const routeUrl = route?.pattern
    const userId = auth.user?.id
    let user
    if (userId) {
      user = await User.query().where('id', userId).preload('roles').firstOrFail()
    }
    user.roles.forEach((role) => {
      if (role.type === 'admin' && routeUrl === '/tests/admin_auth') {
        return response.ok({ message: 'Nice! You have ADMIN permission.' })
      } else if (role.type === 'editor' && routeUrl === '/tests/editor_auth') {
        return response.ok({ message: 'Nice! You have EDITOR permission.' })
      } else if (role.type === 'user' && routeUrl === '/tests/user_auth') {
        return response.ok({ message: 'Nice! You have USER permission.' })
      }
    })
  }
}
