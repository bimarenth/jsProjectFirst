const { getAllNotesHandler, getNotebyidHandler, addNoteHandler, editNotebyidHandler, deleteNotebyidHandler } = require('./handler.js')

const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotebyidHandler
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotebyidHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotebyidHandler
  }
]

module.exports = routes
