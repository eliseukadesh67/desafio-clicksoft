import { BaseModel, column, hasMany, HasMany , ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class';
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public role: boolean

  @column()
  public password: string

  @hasMany(() => Class, {
    foreignKey: 'idTeacher',
  })
  public classes: HasMany<typeof Class>

  @manyToMany(() => Class, {
    localKey: 'id',
    pivotForeignKey: 'id_class',
    relatedKey: 'id_student',
    pivotRelatedForeignKey: 'id_class',
    pivotTable: 'class_students',
  })

  public class: ManyToMany<typeof Class>
}
