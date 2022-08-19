import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from './Role'
import Post from './Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public secureId: uuidv4

  @column()
  public name: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.secureId = uuidv4()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @manyToMany(() => Role, {
    pivotTable: 'users_roles',
  })
  public roles: ManyToMany<typeof Role>
}
