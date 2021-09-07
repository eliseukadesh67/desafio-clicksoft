import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UserController {
  private service = new UserService()

  public async index ({ response }: HttpContextContract) {
    try {
      const users = await this.service.getUsers()

      return response.status(200).json(users)
    } catch (error) {
      return response.status(500).json({ 'message': error.message})
    }
  }

  public async create ({ request, response }: HttpContextContract) {
    try {
      const {
        name,
        registration,
        birthday,
        email,
        role,
        password,
      } = request.only(['name', 'registration', 'birthday', 'email', 'role', 'password'])

      const data = {name, registration, birthday, email, role, password}
      const user = await this.service.addUser(data)

      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    const id = params.id
    try {
      const user = await this.service.showUser(id)

      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }

  public async destroy ({ params , response}: HttpContextContract) {
    const id = params.id

    try{
      const user = await this.service.removeUser(id)

      return response.status(204).json(user)
    } catch(error){
      return response.status(400).json({ 'message': error.message })
    }
  }
}

