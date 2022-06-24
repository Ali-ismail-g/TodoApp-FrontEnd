import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
function SearchTodo() {
  const [searchTasks, setSearchTasks] = useState([]);
  const [title, setTitle] = useState("");

  //search for a todo
  const searchForTodo = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/tasks/search`, {
        title,
      })
      .then(({ data }) => {
        setSearchTasks(data);
      })
      .then(() => {
        console.log(searchTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="searchOperations">
      <Form className="searchTask-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search by Title"
          name="search"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          className="submit-button"
          value="submit"
          type="submit"
          onClick={(e) => searchForTodo(e)}
        >
          Search
        </Button>
      </Form>
      <div className="rendered-search-data">
        {searchTasks.map((task) => {
          return (
            <>
              <li>ID: {task.id}</li>
              <li>Title: {task.title}</li>
              <li>Description: {task.description}</li>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SearchTodo;
