import Class from 'App/Models/Class'
import ClassStudent from '@ioc:Adonis/Lucid/Database'

export default class ClassesRepository {
  public async getAll () {
    try {
      const classes = await Class.all()
      return classes
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async add (data: object) {
    try {
      const clss = await Class.create(data)
      return clss
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async countStudent (id_class: number) {
    const count = await ClassStudent.query().from('class_students').count('*').where('id_class', id_class).first()

    return count
  }
  public async updateCapacity (id_class: number) {
    await Class.query().update('available', false).where('id_class', id_class)
  }
  public async getClass (id_class: number) {
    try {
      const clss = await Class.find(id_class)

      return clss
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async find (id_class: number) {
    try {
      const clss = await Class.find(id_class)

      return clss
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async delete (id_class: number) {
    try {
      const clss = await Class.query().where('id_class', id_class).delete().first()

      return clss
    } catch (error) {
      return new Error(error.message)
    }
  }
  public async getByStudent (student: any) {
    try {
      const classes = await student.related('class').query().preload('teacher')
      return {
        aluno: student.name,
        salas: classes.map((clss) => {
          return { class: clss.number, teacher: clss.teacher.name }
        }),
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async studentExists (id_student: number, id_class: number) {
    return await ClassStudent.query()
      .from('class_students')
      .select('*')
      .where('id_student', id_student)
      .where('id_class', id_class).first()
  }
  public async addStudent (idClass: number, idStudent: number) {
    const clss = { id_class: idClass, id_student: idStudent }
    const [id_student] = await ClassStudent.table('class_students').insert(clss).returning('id_student')

    return id_student
  }
  public async edit (id_class: number, data: any) {
    try {
      const clss = await Class.findOrFail(id_class)
      clss.merge(data)
      await clss.save()
      return clss
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async deleteStudent (id_student: number, id_class: number) {
    try {
      return await ClassStudent.rawQuery(`delete from class_students where id_class = ${id_class} and id_student = ${id_student} returning id_student`)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async getStudents (clss: any) {
    try {
      const students = await clss.related('student').query()
      return ({
        class: clss.id_class,
        students: students.map((student) => {
          return {
            id_student: student.id,
            name: student.name,
            email: student.email,
            birthday: student.birthday,
            registration: student.registration,
          }
        }),
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
