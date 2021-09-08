import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClassService from 'App/Services/ClassService'

export default class ClassesController {
  private service = new ClassService()

  public async index ({ response }: HttpContextContract) {
    try {
      const classes = await this.service.getClasses()
      return response.status(200).json({ classes })
    } catch (error) {
      return response.status(500).json({ 'message': error.message })
    }
  }

  public async create ({ request, response }: HttpContextContract) {
    const id_teacher = Number(request.header('Authorization'))
    const { number, capacity, available } = request.only(['number', 'capacity', 'available'])

    try {
      const clss = { id_teacher, number, capacity, available }

      const id = await this.service.addClass(clss)

      return response.status(201).json(id)
    } catch (error) {
      return response.status(500).json({ 'message': error.message })
    };
  }
  public async addStudent ({ request, response }: HttpContextContract) {
    let { id_class, id_student } = request.only(['id_class', 'id_student'])
    const id_teacher = Number(request.header('Authorization'))

    try {
      const student = await this.service.addStudent(id_class, id_student, id_teacher)
      return response.status(201).json({ 'message': 'Student added!', 'id_student': student })
    } catch (error) {
      return response.status(401).json({ 'message': error.message })
    }
  }
  public async show ({ params, response }: HttpContextContract) {
    try {
      const clss = await this.service.showClass(params.id_class)
      return response.status(200).json({ clss })
    } catch (error) {
      return response.status(500).json({ 'message': error.message })
    }
  }
  public async edit ({ params, response, request }: HttpContextContract) {
    const { id_class } = params
    const data = request.only(['number', 'capacity', 'available'])

    try {
      const user = await this.service.editClass(id_class, data)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const clss = await this.service.removeClass(params.id)
      return response.status(200).json({ 'message': 'Class deleted!', 'id': clss })
    } catch (error) {
      return response.status(500).json({ 'message': error.message })
    }
  }
  public async removeStudent ({ params, request, response }: HttpContextContract) {
    const { id_class } = request.only(['id_class'])
    try {
      const id = await this.service.removeStudent(Number(id_class), Number(params.id_student))
      return response.status(200).json({ message: 'Student removed!', id: id.id_student })
    } catch (error) {
      return response.status(500).json({ 'message': error.message })
    }
  }
  public async getClassesbyStudent ({ response, params }: HttpContextContract) {
    const { id_student } = params
    try {
      const classes = await this.service.getClassesbyStudent(id_student)

      return response.status(200).json(classes)
    } catch (error) {
      return response.status(400).json({ 'message': error.stack })
    }
  }
  public async getStudentsByClass ({ params, response }: HttpContextContract) {
    const { id_class } = params

    try {
      const students = await this.service.getStudents(id_class)
      return response.status(200).json(students)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }
}
