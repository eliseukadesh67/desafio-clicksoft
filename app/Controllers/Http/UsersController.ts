import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Helpers/role'

export default class UserController {
  public async index ({ response }: HttpContextContract) {
    const users = await User.all()

    return response.status(200).json(users)
  }

  public async create ({ request, response }: HttpContextContract) {
    let data = request.only(['email', 'role', 'password'])

    const role = data.role

    if (role === Roles.Student) {
      data.role = false
    } else if (role === Roles.Teacher) {
      data.role = true
    } else {
      return response.status(400).json({ message: 'Invalid role!' })
    }

    const user = await User.create(data)

    return response.status(201).json({user})
  }

  public async show ({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

