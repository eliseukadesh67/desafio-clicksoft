import { BaseModel, belongsTo, BelongsTo, ManyToMany, manyToMany, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id_class: number

  @column()
  public id_teacher: number

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'id_teacher',
  })
  public teacher: BelongsTo<typeof User>

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public available: boolean

  @manyToMany(() => User, {
    localKey: 'id_class',
    pivotForeignKey: 'id_class',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'id_student',
    pivotTable: 'class_students',
  })

  public student: ManyToMany<typeof User>
}
