import { column } from '@ioc:Adonis/Lucid/Orm';
import Person from 'App/Models/Person';

export default class Teacher extends Person {
  @column({ isPrimary: true })
  public idTeacher: number
}
