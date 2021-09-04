import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable().unique()
      table.boolean('role').notNullable()
      table.string('password').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
