import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public idClass: number

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public available: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}
