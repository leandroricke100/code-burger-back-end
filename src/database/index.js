import Sequelize from 'sequelize'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
import configDatabase from '../config/database'
import User from '../app/models/User'
import mongoose from 'mongoose'

const models = [User, Product, Category]
class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:a1K0bt9T5cvjDqMyJ5cB@containers-us-west-187.railway.app:6424/railway'
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:91uG5Eqnfy9HqlZ7asTw@containers-us-west-167.railway.app:5587',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
