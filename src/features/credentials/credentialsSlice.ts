import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';

export interface Credential {
  id: string;
  loginUrl: string;
  username: string;
  passcode: string;
}

interface CredentialsState {
  credentials: Credential[];
  loading: boolean;
  error: string | null;
}

const initialState: CredentialsState = {
  credentials: [],
  loading: false,
  error: null,
};

// Async thunk for fetching credentials
export const fetchCredentials = createAsyncThunk(
  'credentials/fetchCredentials',
  async () => {
    const response = await axios.get<Credential[]>('https://cred-mana-back.onrender.com/api/credentials');
    return response.data;
  }
);

// Async thunk for adding a credential
export const addCredential: any = createAsyncThunk(
  'credentials/addCredential',
  async (newCredential: Credential) => {
    const response = await axios.post<Credential>('https://cred-mana-back.onrender.com/api/credentials', newCredential);
    return response.data;
  }
);

// Async thunk for deleting a credential
export const deleteCredential : any = createAsyncThunk(
  'credentials/deleteCredential',
  async (credentialId: string) => {
    await axios.delete(`https://cred-mana-back.onrender.com/api/credentials/${credentialId}`);
    return credentialId;
  }
);

// Async thunk for updating a credential
export const updateCredential: any = createAsyncThunk(
  'credentials/updateCredential',
  async (updatedCredential: Credential) => {
    const response = await axios.put<Credential>(`https://cred-mana-back.onrender.com/api/credentials/${updatedCredential.id}`, updatedCredential);
    return response.data;
  }
);

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch credentials
      .addCase(fetchCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredentials.fulfilled, (state, action: PayloadAction<Credential[]>) => {
        state.credentials = action.payload;
        state.loading = false;
      })
      .addCase(fetchCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch credentials';
      })
      // Add credential
      .addCase(addCredential.fulfilled, (state, action: PayloadAction<Credential>) => {
        state.credentials.push(action.payload);
      })
      // Delete credential
      .addCase(deleteCredential.fulfilled, (state, action: PayloadAction<string>) => {
        state.credentials = state.credentials.filter(
          (credential) => credential.id !== action.payload
        );
      })
      // Update credential
      .addCase(updateCredential.fulfilled, (state, action: PayloadAction<Credential>) => {
        const index = state.credentials.findIndex(
          (credential) => credential.id === action.payload.id
        );
        if (index !== -1) {
          state.credentials[index] = action.payload;
        }
      });
  },
});

export const selectCredentials = (state: RootState) => state.credentials.credentials;
export const selectLoading = (state: RootState) => state.credentials.loading;
export const selectError = (state: RootState) => state.credentials.error;

export default credentialsSlice.reducer;
