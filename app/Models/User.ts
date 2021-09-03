import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
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
}
