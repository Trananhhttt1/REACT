import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk("user/getList", async () => {
  const response = await fetch("http://localhost:7000/users");
  const data = await response.json();
  return data;
});

export const getUserByIdDetail = createAsyncThunk(
  "user/userByIdDetail",
  async (id) => {
    const response = await fetch(`http://localhost:7000/users/${id}`);
    const data = await response.json();
    return data;
  }
);
export const getUserByIdEdit = createAsyncThunk(
  "user/userByIdEdit",
  async (id) => {
    const response = await fetch(`http://localhost:7000/users/${id}`);
    const data = await response.json();
    return data;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    await fetch("http://localhost:7000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }
);

export const editUser = createAsyncThunk("user/editUser", async (user) => {
  await fetch(`http://localhost:7000/users/${user?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
});

export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  await fetch(`http://localhost:7000/users/${id}`, {
    method: "DELETE",
  });
});

export const createUserClient = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    await fetch("http://localhost:7000/userClients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }
);

const initialState = {
  status: "idie",
  userList: [],
  userClient: [],
  userByIdDetails: [],
  userByIdEdit: [],
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserByIdDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByIdDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.userByIdDetails = action.payload;
      })
      .addCase(getUserByIdDetail.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserByIdEdit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByIdEdit.fulfilled, (state, action) => {
        state.status = "success";
        state.userByIdEdit = action.payload;
      })
      .addCase(getUserByIdEdit.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createUserClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserClient.fulfilled, (state, action) => {
        state.status = "success";
        state.userClient = action.payload;
      })
      .addCase(createUserClient.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
