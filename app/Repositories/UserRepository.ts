import User from 'App/Models/User'

export default class UserRepository {
  public async getAll () {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async add (data: object) {
    try {
      const id = await User.create(data)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async getUser (id: number) {
    try {
      const user = await User.find(id)

      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async findByEmail (email: string) {
    try {
      const user = await User.findBy('email', email)

      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async edit (id: number, data: any) {
    try {
      const user = await User.findOrFail(id)
      user.merge(data)
      await user.save()
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: user.registration,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async delete (id: number) {
    try {
      const user = await User.query().where('id', id).delete()
      return user
    } catch (error) {
      return new Error(error.message)
    }
  }
}
