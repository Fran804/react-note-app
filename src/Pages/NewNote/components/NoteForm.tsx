import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

function NoteForm() {

  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiquetas</Form.Label>
              <CreatableReactSelect isMulti placeholder="Escribe..." />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Texto</Form.Label>
          <Form.Control required as="textarea" rows={15} />
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={4}>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancelar
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
