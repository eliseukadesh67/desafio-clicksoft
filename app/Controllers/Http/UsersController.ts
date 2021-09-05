import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { Roles } from 'App/Helpers/role'

export default class UserController {
  public async index ({ response }: HttpContextContract) {
    try {
      const users = await User.all()

      if (!users) {
        return response.status(404).json({ 'message': 'No content' })
      }

      return response.status(201).json(users)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
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

      const exists = await User.findBy('email', email)

      if (exists) {
        return response.status(409).json({ 'message': 'Email already exists!' })
      }

      const chosen_role = Roles[role]

      const data = { name, registration, birthday, email, role: chosen_role, password }

      const user = await User.create(data)
      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)

      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ 'message': error.message })
    }
  }

  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

