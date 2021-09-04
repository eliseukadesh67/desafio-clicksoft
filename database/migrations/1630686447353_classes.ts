import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_class')
      table.integer('id_teacher').
        references('id').
        inTable('users').
        onDelete('CASCADE').
        onUpdate('CASCADE')
      table.integer('number')
      table.integer('capacity')
      table.boolean('available')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
