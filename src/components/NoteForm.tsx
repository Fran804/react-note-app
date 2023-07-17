import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { NoteFormProps, Tag } from "../types";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();

  const handleEvent = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <Form onSubmit={handleEvent}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                className={
                  contextTheme === "Light" ? "inputLight" : "inputDark"
                }
                ref={titleRef}
                required
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiquetas</Form.Label>
              <CreatableReactSelect
                styles={{
                  option: (styles) => ({
                    ...styles,
                    color: "black",
                    cursor: "pointer",
                  }),
                  control: (styles) => ({
                    ...styles,
                    background: contextTheme === "Light" ? "white" : "#1D2135",
                    border: contextTheme === "Light" ? "" : "none"
                  }),
                }}
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
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
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
          <Form.Control
            className={contextTheme === "Light" ? "inputLight" : "inputDark"}
            ref={markdownRef}
            required
            as="textarea"
            rows={15}
            defaultValue={markdown}
          />
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={3}>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
          <Link to="..">
            <Button type="button" variant="danger">
              Cancelar
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
