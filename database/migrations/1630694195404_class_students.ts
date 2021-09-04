import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassStudent extends BaseSchema {
  protected tableName = 'class_students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_class').
        references('id_class').
        inTable('classes').
        onUpdate('CASCADE').
        onDelete('CASCADE')
      table.integer('id_student').
        references('id').
        inTable('users').
        onUpdate('CASCADE').
        onDelete('CASCADE')
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
