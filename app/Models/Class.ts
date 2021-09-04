import { BaseModel, belongsTo, BelongsTo, ManyToMany, manyToMany, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id_class: number

  @column()
  public id_teacher: number

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public available: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    localKey: 'id_class',
    pivotForeignKey: 'id_student',
    relatedKey: 'id_class',
    pivotRelatedForeignKey: 'id',
    pivotTable: 'class_students',
  })

  public student: ManyToMany<typeof User>
}
