import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default abstract class Person extends BaseModel {

  @column()
  public name: string

  @column()
  public matricula: number

  @column()
  public birthday: Date
}
