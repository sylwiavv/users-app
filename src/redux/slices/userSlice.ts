import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../app/types/users";
import { API_URL } from "../../server-actions/enums/enums";

interface UsersState {
  users: IUser[];
  filteredUsers: IUser[];
  usersAreLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  usersAreLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL.USER}`);
      console.log(response, "response") 
      if (!response.ok) throw new Error("Failed to fetch users");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilteredUsers(state, action: PayloadAction<IUser[]>) {
      state.filteredUsers = action.payload;
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersAreLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.usersAreLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersAreLoading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { setFilteredUsers } = usersSlice.actions;

export default usersSlice.reducer;
