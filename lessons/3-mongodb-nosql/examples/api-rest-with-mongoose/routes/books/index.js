const router = require('express').Router()
const BooksModel = require('../../models/Book')

router.get('/', async (req, res, next) => {
  try {
    const result = await BooksModel.find({}, { _id: 0, __v: 0 }).lean()

    console.info('Libros encontrados: ', result)

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    const errorMessage = 'Error al buscar los libros'

    console.error(`${errorMessage}: `, error.message)

    next(new Error(errorMessage))
  }
})

router.post('/', async (req, res, next) => {
  const {
    title, author, isbn, editions, year, sales, publisher
  } = req.body

  try {
    const result = await BooksModel.create({
      title, author, creation: Date.now(), isbn, editions, year, sales, publisher
    })

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    const errorMessage = 'Error al intentar crear un libro'

    console.error(`${errorMessage}: `, error.message)

    next(new Error(errorMessage))
  }
})

router.put('/', async (req, res, next) => {
  const {
    title, author, isbn, editions, year, sales, publisher
  } = req.body

  try {
    const result = await BooksModel.findOneAndUpdate(
      { isbn }, // el campo por el que busca para encontrar el documento
      { title, author, isbn, editions, year, sales, publisher }, // los campos que actualiza
      { new: true } // para devolver el documento actualizado o el de antes de actualizar
    )

    console.info('Libros actualizados: ', result)

    return res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    const errorMessage = 'Error al intentar actualizar un libro'

    console.error(`${errorMessage}: `, error.message)

    next(new Error(errorMessage))
  }
})

router.delete('/', async (req, res, next) => {
  const { isbn } = req.body

  try {
    const result = await BooksModel.findOneAndDelete({ isbn })

    console.info('Libros borrados: ', result)

    res.status(200).json({
      success: true
    })
  } catch (error) {
    const errorMessage = 'Error al intentar borrar un libro'

    console.error(`${errorMessage}: `, error.message)

    next(new Error(errorMessage))
  }
})

module.exports = router