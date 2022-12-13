const { nanoid } = require('nanoid')
const notes = require('./notes.js')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNotes = {
    title, tags, body, id, createdAt, updatedAt
  }
  notes.push(newNotes)
  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note addes',
      data: {
        noteid: id
      }
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'Note fail to added'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
})

const getNotebyidHandler = (request, h) => {
  const { id } = request.params
  const note = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found'
  })
  response.code(404)
  return response
}

const editNotebyidHandler = (request, h) => {
  const { id } = request.params
  const { title, body, tags } = request.payload
  const updatedAt = new Date().toISOString()
  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Note Updated'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'Failed to Update Note'
  })
  response.code(404)
  return response
}

const deleteNotebyidHandler = (request, h) => {
  const { id } = request.params
  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Note Deleted'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'Failed to Delete note'
  })
  response.code(404)
  return response
}

module.exports = { getAllNotesHandler, getNotebyidHandler, addNoteHandler, editNotebyidHandler, deleteNotebyidHandler }
