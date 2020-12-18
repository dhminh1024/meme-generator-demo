import React, { useState } from "react";
import { Form, Nav, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { memeActions } from "../redux/actions/meme.actions";

const ALIGNMENT_X = [
  { value: "HORIZONTAL_ALIGN_LEFT", view: "Left" },
  { value: "HORIZONTAL_ALIGN_CENTER", view: "Center" },
  { value: "HORIZONTAL_ALIGN_RIGHT", view: "Right" },
];
const ALIGNMENT_Y = [
  { value: "VERTICAL_ALIGN_TOP", view: "Top" },
  { value: "VERTICAL_ALIGN_MIDDLE", view: "Middle" },
  { value: "VERTICAL_ALIGN_BOTTOM", view: "Bottom" },
];
const COLORS = ["BLACK", "WHITE"];
const FONT_SIZES = [8, 16, 32, 64, 128];

const SideMenu = () => {
  const [texts, setTexts] = useState([
    {
      id: "text_top",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_TOP",
    },
    {
      id: "text_bottom",
      content: "",
      color: "BLACK",
      size: 32,
      alignmentX: "HORIZONTAL_ALIGN_CENTER",
      alignmentY: "VERTICAL_ALIGN_BOTTOM",
    },
  ]);
  const selectedMeme = useSelector((state) => state.meme.selectedMeme);
  const loading = useSelector((state) => state.meme.loading);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMeme.id)
      dispatch(memeActions.updateMeme(texts, selectedMeme.id));
  };

  const handleEditInput = ({ textId, type, value }) => {
    let textsCopy = JSON.parse(JSON.stringify(texts));
    textsCopy = textsCopy.map((text) => {
      if (text.id === textId) {
        if (type in text) text[type] = value;
      }
      return text;
    });
    setTexts(textsCopy);
  };

  return (
    <Nav>
      <Form onSubmit={handleSubmit}>
        {texts.map(
          ({ id, content, color, size, alignmentX, alignmentY }, index) => (
            <div key={id}>
              <h6>TEXT {index + 1}</h6>
              <Form.Group as={Row} className="px-2 mb-1">
                <Col>
                  <Form.Control
                    type="text"
                    value={content}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "content",
                        value: e.target.value,
                      })
                    }
                    placeholder="Text content..."
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="px-2 mb-1">
                <Form.Label column sm={7}>
                  Color
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    value={color}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "color",
                        value: e.target.value,
                      })
                    }
                  >
                    {COLORS.map((color) => (
                      <option value={color} key={color}>
                        {color}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="px-2 mb-1">
                <Form.Label column sm={7}>
                  Font Size
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    value={size}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "size",
                        value: e.target.value,
                      })
                    }
                  >
                    {FONT_SIZES.map((size) => (
                      <option value={size} key={size}>
                        {size}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="px-2 mb-1">
                <Form.Label column sm={7}>
                  Vertical Align
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    value={alignmentX}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "alignmentX",
                        value: e.target.value,
                      })
                    }
                  >
                    {ALIGNMENT_X.map((alignment) => (
                      <option value={alignment.value} key={alignment.value}>
                        {alignment.view}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="px-2 mb-1">
                <Form.Label column sm={7}>
                  Horizontal Align
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    value={alignmentY}
                    onChange={(e) =>
                      handleEditInput({
                        textId: id,
                        type: "alignmentY",
                        value: e.target.value,
                      })
                    }
                  >
                    {ALIGNMENT_Y.map((alignment) => (
                      <option value={alignment.value} key={alignment.value}>
                        {alignment.view}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </div>
          )
        )}

        <Button type="submit">Submit</Button>
      </Form>
    </Nav>
  );
};

export default SideMenu;
