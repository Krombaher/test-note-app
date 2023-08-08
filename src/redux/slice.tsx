import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NoteType } from "../types/Types";

type initialStateType = {
  notes: NoteType[],
  curretNote: NoteType | undefined,
  searchTagValue: string
}

const initialState: initialStateType = {
  notes: [],
  curretNote: {} as NoteType,
  searchTagValue: ''
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getAllData: (state, action: PayloadAction<NoteType[]>) => {
      state.notes = action.payload
    },
    getNote: (state, action: PayloadAction<string>) => {
      state.curretNote = state.notes.find(note => note.id === action.payload)
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload)
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(el => el.id !== action.payload)
    },
    changeNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.map(el => {
        return (
          el.id === action.payload.id ? { title: action.payload.title, body: action.payload.body, tags: action.payload.tags } : el
        )
      })
    },
    searchNote: (state, action: PayloadAction<string>) => {
     state.searchTagValue = action.payload
    },
  },
});

export const { getAllData, getNote, addNote, removeNote , changeNote, searchNote} = notesSlice.actions
export const notesReducer = notesSlice.reducer;