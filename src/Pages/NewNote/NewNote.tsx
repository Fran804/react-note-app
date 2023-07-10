import NoteForm from "./components/NoteForm"
import {NewNoteProps} from "../../types"

function NewNote({onSubmit, onAddTag, availableTags}: NewNoteProps) {
  return (
    <div>
      <h1 className="mb-4">Nueva Nota</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
}

export default NewNote