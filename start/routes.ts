/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.post('/users', 'UsersController.create')
Route.get('/users', 'UsersController.index')
Route.get('/users/:id', 'UsersController.show')
Route.delete('/users/:id', 'UsersController.destroy')

Route.post('/classes', 'ClassesController.create')
Route.post('/classes/student', 'ClassesController.addStudent')
Route.get('/classes', 'ClassesController.index')
Route.get('/class/:id_class', 'ClassesController.show')
Route.get('/class/students/:id_class', 'ClassesController.getStudentsByClass')
Route.delete('/classes/:id', 'ClassesController.destroy')
Route.delete('/classes/student/:id_student', 'ClassesController.removeStudent')
Route.get('/classes/student/:id_student', 'ClassesController.getClassesbyStudent')

