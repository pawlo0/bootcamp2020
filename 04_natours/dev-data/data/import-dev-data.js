const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../../models/tourModel')

dotenv.config({ path: './config.env' })

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successuful!'))

// READ JS FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
)

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA IN DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] == '--import') {
  importData()
}

if (process.argv[2] == '--delete') {
  deleteData()
}

if (!process.argv[2]) {
  console.log('Need to use arguments, either --import or --delete')
  process.exit()
}
