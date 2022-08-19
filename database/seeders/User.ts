import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // ADMIN USER
    const adminSearchKey = { email: 'admin@email.com' }
    const adminUser = await User.updateOrCreate(adminSearchKey, {
      name: 'Admin',
      cpf: '000.000.000-01',
      email: 'admin@email.com',
      password: 'secret',
    })
    const adminRole = await Role.findBy('type', 'admin')
    if (adminRole) {
      await adminUser.related('roles').attach([adminRole.id])
    }

    // EDITOR USER
    const editorSearchKey = { email: 'editor@email.com' }
    const editorUser = await User.updateOrCreate(editorSearchKey, {
      name: 'Editor',
      cpf: '000.000.000-02',
      email: 'editor@email.com',
      password: 'secret',
    })
    const editorRole = await Role.findBy('type', 'editor')
    if (editorRole) await editorUser.related('roles').attach([editorRole.id])

    // 'USER' USER
    const userSearchKey = { email: 'user@email.com' }
    const userUser = await User.updateOrCreate(userSearchKey, {
      name: 'User',
      cpf: '000.000.000-03',
      email: 'user@email.com',
      password: 'secret',
    })
    const userRole = await Role.findBy('type', 'user')
    if (userRole) await userUser.related('roles').attach([userRole.id])
  }
}
