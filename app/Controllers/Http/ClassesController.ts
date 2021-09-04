import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import Database from '@ioc:Adonis/Lucid/Database'
import Class_StudentsRepository from 'App/Repositories/Class_StudentsRepository'

const repository = new Class_StudentsRepository()

export default class ClassesController {
  public async index ({ response }: HttpContextContract) {
    const classes = await Database.query().from('classes').select('*')

    return response.status(200).json({ classes })
  }

  public async getByStudent ({ params, response }: HttpContextContract) {
    const { id_student} = params.id_student
    const classes = await repository.getByStudent((id_student))
    return response.status(200).json({ classes })
  }

  public async create ({ request, response }: HttpContextContract) {
    const id_teacher = Number(request.header('Authorization'))
    const { number, capacity, available } = request.only(['number', 'capacity', 'available'])
    const clss = await Class.create({id_teacher, number, capacity, available })

    return response.status(201).json({ clss })
  }
  public async addStudent ({ request, response }: HttpContextContract) {
    let { id_class, id_student } = request.only(['id_class', 'id_student'])
    console.log(id_student)
    const find = await repository.studentExists(id_student, id_class)
    if (find.length > 0) {
      return response.status(400).json({ 'message': 'Student already exists.' })
    }

    const [clss] = await repository.add(id_class, id_student)

    return response.status(201).json({ 'message': 'Aluno inserido!', 'id_student': clss })
  }
  public async show ({ params, response }: HttpContextContract) {
    const clss = await Class.findOrFail(params.id)

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
}
