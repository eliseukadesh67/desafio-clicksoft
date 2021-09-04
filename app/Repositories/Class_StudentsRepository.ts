import Database from '@ioc:Adonis/Lucid/Database'

export default class ClassStudentsRepository {
  public async getAll () {
    console.log('To Aqui')
    const classes = await Database.query().from('class_students').select('*')
    return classes
  }
  public async getByStudent (idStudent: number) {
    return await Database.query().from('class_students').select('*').where('id_student', idStudent)
  }
  public async studentExists (idStudent: number, idClass: number) {
    return await Database.query()
      .from('class_students')
      .select('id_student')
      .where('id_student', idStudent)
      .where('id_class', idClass)
  }
  public async add (idClass: number, idStudent: number) {
    const clss = { id_class: idClass, id_student: idStudent }
    const id_student = await Database.table('class_students').insert(clss).returning('id_student')

    return id_student
  }
  public async delete (id_class: number, id_student: number) {
    const student = await Database.rawQuery(`delete from class_students where id_class = ${id_class} and id_student = ${id_student} returning id_student`)
      .catch((error) => {
        throw new Error(error.message)
      })

    return student.rows
  }
}
