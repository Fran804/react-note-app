import { useMemo, useState } from "react";
import { Row, Col, Stack, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { NoteListProps, Tag, EditTagsModalProps } from "../../types";
import ReactSwitch from "react-switch";
import { useThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa6";
import NoteCard from "../../components/NoteCard";

function NoteList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProps) {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const [checked, setChecked] = useState(
    contextTheme === "Light" ? false : true
  );

  const handleSwitch = (nextChecked: boolean) => {
    setContextTheme((state: string) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
    handleLocalStorage(contextTheme);
  };

  const handleLocalStorage = (theme: string) => {
    if (theme === "Light") {
      localStorage.setItem("Theme", "Dark");
      return;
    }
    localStorage.setItem("Theme", "Light");
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="aling-items-center mb-4">
        <Col>
          <h1> <span className="badge bg-primary text-wrap">MarkNotes</span> | Mis Notas</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            {contextTheme === "Light" ? (
              <FaMoon className="iconFav" />
            ) : (
              <FaSun className="iconFav" />
            )}
            <ReactSwitch
              checked={checked}
              onChange={handleSwitch}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            <Link to="/new">
              <Button variant="primary">Crear Nota</Button>
            </Link>
            <Button
              onClick={() => {
                setEditTagsModalIsOpen(true);
              }}
              variant="secondary"
            >
              Editar Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Buscar por título</Form.Label>
              <Form.Control
                className={
                  contextTheme === "Light" ? "inputLight" : "inputDark"
                }
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Buscar por etiquetas</Form.Label>
              <ReactSelect
                styles={{
                  option: (styles) => ({
                    ...styles,
                    color: "black",
                    cursor: "pointer",
                  }),
                  control: (styles) => ({
                    ...styles,
                    background: contextTheme === "Light" ? "white" : "#1D2135",
                    border: contextTheme === "Light" ? "" : "none",
                  }),
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
      </Form>

      {filteredNotes.length >= 1 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-3">
          {filteredNotes.map((note) => (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="badge bg-primary text-wrap mt-2">
          <h4>No tienes creada ninguna nota, crea una nueva para visualizarla</h4>
        </div>
      )}
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        availableTags={availableTags}
        handleClose={() => {
          setEditTagsModalIsOpen(false);
        }}
      />
    </>
  );
}

function EditTagsModal({
  onDeleteTag,
  onUpdateTag,
  availableTags,
  handleClose,
  show,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteList;
