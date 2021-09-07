import UserRepository from 'App/Repositories/UserRepository'
import { Roles } from 'App/Helpers/role'

export default class UserService {
  private repository = new UserRepository()

  public async checkExists (email: string){
    return await this.repository.findByEmail(email)
  }
  public async getUsers () {
    try {
      const users = await this.repository.getAll()
      return users
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async addUser (data: any) {
    const {name, registration, birthday, email, password, role} = data
    try {
      const exists = await this.checkExists(email)

      if(exists){
        throw new Error('User already exists!')
      }

      const chosen_role = Roles[role]

      const user = { name, registration, birthday, email, role: chosen_role, password }

      const id = await this.repository.add(user)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async showUser (id: number) {
    try {
      const user = await this.repository.getUser(id)

      if(!user) {
        throw new Error('User not found!')
      }

      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async removeUser (id: number) {
    try {
      const exists = await this.repository.getUser(id)

      if(!exists){
        throw new Error('User not found!')
      }
      const user = await this.repository.delete(id)

      return user
    } catch (error) {
      return new Error(error.message)
    }
  }
}
