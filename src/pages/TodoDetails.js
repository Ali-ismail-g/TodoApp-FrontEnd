import { Form, Button } from "react-bootstrap";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { editTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function TodoDetails(props) {
  const [updatedTasks, setUpdatedTasks] = useState(props.task);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);

  const dispatch = useDispatch();
  //update specific task
  const handleEdit = () => {
    dispatch(
      editTask({
        id: updatedTasks.id,
        title,
        description,
      })
    );
  };
  return (
    <div>
      <div>
        <li>ID: {props.task.id}</li>
        <li>Title: {props.task.title}</li>
        <li>Description: {props.task.description}</li>
        <Button
          className="del-button"
          value="submit"
          type="submit"
          variant="danger"
          onClick={() => {
            props.deleteTodo(props.task.id);
          }}
        >
          X
        </Button>
        <Button
          className="del-button"
          value="submit"
          type="submit"
          variant="info"
          onClick={toggle}
        >
          Update
        </Button>
      </div>
      <div className="Modal-form">
        <Modal isOpen={modal} toggle={toggle}>
          <form onSubmit={() => handleEdit()}>
            <ModalHeader>Update Todo</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="title"
                />
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="description"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" value="submit" type="submit">
                Update Todo
              </Button>
              <Button variant="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default TodoDetails;
