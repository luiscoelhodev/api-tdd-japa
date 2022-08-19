import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'type'
    await Role.updateOrCreateMany(uniqueKey, [
      {
        type: 'admin',
        description: 'Can do anything.',
      },
      {
        type: 'editor',
        description: 'Can write, update, read and delete their own posts.',
      },
      {
        type: 'user',
        description: 'Can only read posts.',
      },
    ])
  }
}
