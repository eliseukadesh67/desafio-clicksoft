import { column } from '@ioc:Adonis/Lucid/Orm'
import Person from 'App/Models/Person';

export default class Student extends Person {
  @column({ isPrimary: true })
  public idStudent: number
}
