import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import TodoDetails from "./TodoDetails";
import SearchTodo from "./SearchTodo";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, addTask, deleteTask } from "../redux/taskSlice";
export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [id, setID] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = "http://localhost:5000/api/tasks";

  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks);

  // get all todo
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  //add new todo
  const postData = () => {
    dispatch(addTask({ id, title, description }));
  };

  //delete todo
  const deleteTodo = (id) => {
    dispatch(deleteTask({ id: id }));
  };

  return (
    <div className="container">
      <div className="taskOperations">
        <Container>
          <Form className="w-25 mx-auto">
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="ID"
                  name="id"
                  onChange={(e) => setID(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="align-text-left">Title</Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="align-text-left">Description</Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" value="submit" onClick={() => postData()}>
                Submit
              </Button>
            </fieldset>
          </Form>
        </Container>
        <div className="result">
          <p>Results</p>
          {allTasks.map((task, i) => {
            return (
              <TodoDetails
                key={i}
                task={task}
                deleteTodo={deleteTodo}
                setTasks={setTasks}
              />
            );
          })}
        </div>
      </div>
      <SearchTodo />
    </div>
  );
}
