import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import Database from '@ioc:Adonis/Lucid/Database'
import Class_StudentsRepository from 'App/Repositories/Class_StudentsRepository'
import User from 'App/Models/User'

const repository = new Class_StudentsRepository()

export default class ClassesController {
  public async index ({ response }: HttpContextContract) {
    const classes = await Database.query().from('classes').select('*')

    return response.status(200).json({ classes })
  }

  public async create ({ request, response }: HttpContextContract) {
    const id_teacher = Number(request.header('Authorization'))
    const { number, capacity, available } = request.only(['number', 'capacity', 'available'])
    const clss = await Class.create({id_teacher, number, capacity, available })

    return response.status(201).json(clss)
  }
  public async addStudent ({ request, response }: HttpContextContract) {
    let { id_class, id_student } = request.only(['id_class', 'id_student'])
    const find = await repository.studentExists(id_student, id_class)
    if (find.length > 0) {
      return response.status(400).json({ 'message': 'Student already exists.' })
    }

    const clss = await Class.find(id_class)
    const student_exists = await User.find(id_student)

    if(!student_exists){
      return response.status(404).json({'message': 'Student not found!'})
    }

    if(!clss) {
      return response.status(404).json({'message': 'Class not found!'})
    }

    const full = !clss.available

    if(full) {
      return response.status(404).json({'message': 'Class is full!'})
    }

    const student = await repository.add(id_class, id_student)

    const {count} = await repository.countStudent(id_class)

    if(Number(count) >= clss.capacity){
      await Class.query().update('available', false).where('id_class', id_class)
    }

    return response.status(201).json({ 'message': 'Aluno inserido!', 'id_student': student })
  }
  public async show ({ params, response }: HttpContextContract) {
    const clss = await Class.findOrFail(params.id_class)

    return response.status(200).json({ clss })
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const clss = await Class.findOrFail(params.id)

    await clss.delete()
      .catch((error) => {
        return response.status(400).json({ 'message': error.message })
      })
      .then(() => {
        return response.status(200).json({ 'Class deleted:': params.id })
      })
  }
  public async removeStudent ({ params, request, response }: HttpContextContract) {
    const { id_class } = request.only(['id_class'])
    const [id] = await repository.delete(Number(id_class), Number(params.id_student))
    if(!id){
      return response.status(400).json({ message:'Invalid student id!'})
    }
    return response.status(200).json({ message:'Student removed!', id: id.id_student})
  }
  public async getStudents ({ response }: HttpContextContract) {
    const clss = await repository.getAll().catch((error) => {
      throw new Error(error.message)
    })

    return response.status(200).json({ 'Relation Class-Student': clss })
  }
  public async getClassesbyStudent ({response, params}: HttpContextContract){
    try{
      const student = await User.findOrFail(params.id_student)
      if(!student){
        return response.status(404).json({'message': 'Student not found'})
      }
      const classes = await student.related('class').query().preload('teacher')
      return response.status(200).json({
        student: student.name,
        classes: classes.map((clss) => {
          return { number: clss.number, professor: clss.teacher.name }
        }),
      })
    }catch(error){
      return response.status(400).json({'message': error.stack})
    }
  }
  public async getStudentsByClass ({params, response} : HttpContextContract){
    const {id_class} = params

    try{
      const clss = await Class.find(id_class)

      if(!clss){
        return response.status(404).json({'message': 'Class not found!'})
      }
      const students = await clss.related('student').query()
      return response.status(200).json({
        class: clss.id_class,
        classes: students.map((student) => {
          return {
            id_student:  student.id,
            name: student.name,
            email: student.email,
            birthday: student.birthday,
            registration: student.registration,
          }
        }),
      })
    } catch(error){
      return response.status(400).json({'message':error.message})
    }
  }
}
