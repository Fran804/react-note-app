import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../NoteLayout/NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { NoteProps } from "../../types";

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="aling-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Editar</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="danger"
            >
              Borrar
            </Button>
            <Link to="/">
              <Button variant="secondary">Atras</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}

export default Note;
