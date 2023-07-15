import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { NoteFormProps, Tag } from "../../../types";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const handleEvent = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..")
  };

  return (
    <Form onSubmit={handleEvent}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiquetas</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
                placeholder="Escribe..."
                options={availableTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Texto</Form.Label>
          <Form.Control ref={markdownRef} required as="textarea" rows={15} />
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={3}>
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
