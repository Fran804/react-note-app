import NoteForm from "../../components/NoteForm";
import { EditNoteProps } from "../../types";
import { useNote } from "../NoteLayout/NoteLayout";

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote()

  return (
    <div>
      <h1 className="mb-4">Editar Nota</h1>
      <NoteForm
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
}

export default EditNote;
