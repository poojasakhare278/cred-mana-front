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

const API_BASE_URL = 'https://cred-mana-back.onrender.com/api/credentials';


export const fetchCredentials = createAsyncThunk<Credential[]>(
  'credentials/fetchCredentials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Credential[]>(API_BASE_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch credentials');
    }
  }
);

export const addCredential : any = createAsyncThunk<Credential, Credential> (
  'credentials/addCredential',
  async (newCredential, { rejectWithValue }) => {
    try {
      const response = await axios.post<Credential>(API_BASE_URL, newCredential);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to add credential');
    }
  }
);


export const deleteCredential = createAsyncThunk<string, string>(
  'credentials/deleteCredential',
  async (credentialId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${credentialId}`);
      return credentialId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete credential');
    }
  }
);


export const updateCredential = createAsyncThunk<Credential, Credential>(
  'credentials/updateCredential',
  async (updatedCredential, { rejectWithValue }) => {
    try {
      const response = await axios.put<Credential>(`${API_BASE_URL}/${updatedCredential.id}`, updatedCredential);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update credential');
    }
  }
);

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
      .addCase(fetchCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredentials.fulfilled, (state, action: PayloadAction<Credential[]>) => {
        state.credentials = action.payload;
        state.loading = false;
      })
      .addCase(fetchCredentials.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch credentials';
      })

      .addCase(addCredential.fulfilled, (state, action: PayloadAction<Credential>) => {
        state.credentials.push(action.payload);
      })
      .addCase(addCredential.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || 'Failed to add credential';
      })

      .addCase(deleteCredential.fulfilled, (state, action: PayloadAction<string>) => {
        state.credentials = state.credentials.filter(
          (credential) => credential.id !== action.payload
        );
      })
      .addCase(deleteCredential.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || 'Failed to delete credential';
      })

      .addCase(updateCredential.fulfilled, (state, action: PayloadAction<Credential>) => {
        const index = state.credentials.findIndex(
          (credential) => credential.id === action.payload.id
        );
        if (index !== -1) {
          state.credentials[index] = action.payload;
        }
      })
      .addCase(updateCredential.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || 'Failed to update credential';
      });
  },
});

export const selectCredentials = (state: RootState) => state.credentials.credentials;
export const selectLoading = (state: RootState) => state.credentials.loading;
export const selectError = (state: RootState) => state.credentials.error;

export default credentialsSlice.reducer;
