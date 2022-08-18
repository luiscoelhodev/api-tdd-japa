import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().unique().notNullable()
      table.uuid('secure_id').notNullable().unique()
      table.string('name', 60).notNullable()
      table.string('cpf', 14).unique().notNullable()
      table.string('email', 50).unique().notNullable()
      table.string('password', 250).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
