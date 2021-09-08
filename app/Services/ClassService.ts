import ClassRepository from 'App/Repositories/ClassRepository'
import UserService from './UserService'

const userService = new UserService()

export default class ClassService {
  private repository = new ClassRepository()

  private async checkExists (id_class: number) {
    return await this.repository.find(id_class)
  }
  private async checkStudentExists (id_student: number) {
    return await userService.showUser(id_student)
  }
  public async getClasses () {
    try {
      const classes = await this.repository.getAll()
      return classes
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async getClassesbyStudent (id_student: number) {
    try {
      const student = await this.checkStudentExists(id_student)

      if (!student) {
        throw new Error('Student not found')
      }
      const classes = await this.repository.getByStudent(student)
      return classes
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async addClass (data: object) {
    try {
      const clss = data
      const id = await this.repository.add(clss)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
  private async updateCapacity (clss: any) {
    try {
      const { count } = await this.repository.countStudent(clss.id_class)
      if (Number(count) >= clss.capacity) {
        await this.repository.updateCapacity(clss.id_class)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  private async studentExists (id_student: number, id_class: number) {
    try {
      const exists = await this.repository.studentExists(id_student, id_class)
      return exists
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async addStudent (id_class: number, id_student: number, id_teacher: number) {
    try {
      const student = await userService.showUser(id_student)
      if (!student) {
        throw new Error('Student not found')
      }

      const clss = await this.checkExists(id_class)

      if (!clss) {
        throw new Error('Class not found')
      }

      const teacher = id_teacher === clss.id_teacher

      if (!teacher) {
        throw new Error('Not permited!')
      }

      const full = !clss.available

      if (full) {
        throw new Error('Class is full!')
      }

      const exists = await this.studentExists(id_student, id_class)

      if (exists) {
        throw new Error('Student is already in this class!')
      }

      const id = await this.repository.addStudent(id_class, id_student)

      await this.updateCapacity(clss)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async getStudents (id_class: number) {
    try {
      const clss = await this.repository.find(id_class)

      if (!clss) {
        throw new Error('Class not found!')
      }
      const students = this.repository.getStudents(clss)
      return students
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async removeStudent (id_class: number, id_student: number) {
    try {
      const exists = await this.studentExists(id_student, id_class)
      console.log(exists)
      if (!exists) {
        throw new Error('Could not find this student in this class')
      }
      return await this.repository.deleteStudent(id_student, id_class)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async showClass (id_class: number) {
    try {
      const Class = await this.repository.getClass(id_class)

      if (!Class) {
        throw new Error('Class not found!')
      }

      return Class
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async editClass (id_class: number, data: object) {
    try {
      const exists = await this.checkExists(id_class)

      if (!exists) {
        throw new Error('Class not found')
      }
      const clss = await this.repository.edit(id_class, data)
      return clss
    } catch (error) {
      throw new Error(error.message)
    }
  }
  public async removeClass (id_class: number) {
    try {
      const exists = await this.checkExists(id_class)

      console.log(exists)

      if (!exists) {
        throw new Error('Class not found!')
      }
      const Class = await this.repository.delete(id_class)

      return Class
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
