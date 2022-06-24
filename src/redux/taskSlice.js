import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const ApiUrl = process.env.REACT_APP_BACKEND_URl;
export const getTasks = createAsyncThunk("getAllTasks", async () => {
  const response = await fetch(ApiUrl);
  if (response.ok) {
    const tasks = await response.json();
    return { tasks };
  }
});

export const addTask = createAsyncThunk("addTask", async (payload) => {
  const response = await fetch(`${ApiUrl}/add`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: payload.id,
      title: payload.title,
      description: payload.description,
    }),
  });
  if (response.ok) {
    const tasks = await response.json();
    return { tasks };
  }
});

export const editTask = createAsyncThunk("editTask", async (payload) => {
  console.log("payload", payload);
  debugger;
  const response = await fetch(`${ApiUrl}/edit/${payload.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
    }),
  });
  if (response.ok) {
    const tasks = await response.json();
    console.log("tasks from slice", tasks);
    return { id: tasks.id, title: tasks.title, description: tasks.description };
  }
});

export const deleteTask = createAsyncThunk("deleteTask", async (payload) => {
  const response = await fetch(`${ApiUrl}/delete/${payload.id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    const tasks = await response.json();
    return { tasks };
  }
});
const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  extraReducers: {
    [getTasks.fulfilled]: (state, action) => {
      return action.payload.tasks;
    },
    [addTask.fulfilled]: (state, action) => {
      state.push(action.payload.tasks);
    },
    [editTask.pending]: (state, action) => {
      console.log("editing is pending...");
    },
    [editTask.fulfilled]: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].id = action.payload.id;
      state[index].title = action.payload.title;
      state[index].description = action.payload.description;
    },
    [deleteTask.fulfilled]: (state, action) => {
      console.log("Successfully deleted...");
      state.map((task) => task.id !== action.payload.tasks.id);
      return action.payload.tasks;
    },
  },
});

export default taskSlice.reducer;
