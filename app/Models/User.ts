import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public registration: number

  @column()
  public birthday: Date

  @column()
  public email: string

  @column()
  public role: string

  @column()
  public password: string

  @hasMany(() => Class, {
    foreignKey: 'id_teacher',
  })
  public classes: HasMany<typeof Class>

  @manyToMany(() => Class, {
    localKey: 'id',
    pivotForeignKey: 'id_student',
    relatedKey: 'id_class',
    pivotRelatedForeignKey: 'id_class',
    pivotTable: 'class_students',
  })

  public class: ManyToMany<typeof Class>
}
