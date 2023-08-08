import React from 'react';
import { Note } from '../components/Note/Note';
import Header from '../components/Header/Header';
import { useIndexedDB } from 'react-indexed-db-hook';
import { NoteType } from '../types/Types';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../redux/store';
import { getAllData } from '../redux/slice';

export const Home = () => {
  const notes = useAppSelector((state: RootState) => state.notes.notes);
  const search = useAppSelector((state: RootState) => state.notes.searchTagValue);
  const dispatch = useAppDispatch();
  const { getAll } = useIndexedDB("notes");

  React.useEffect(() => {
    getAll()
      .then((notesFromDB: NoteType[]) => {
        dispatch(getAllData(notesFromDB));
      });
  }, [getAll, dispatch]);

  return (
    <div className="app">
      <Header/>
      <section className='notes'>
        {
          notes.filter(item => {
            return search === ''
            ? item
            : item.tags.find(tag => tag === search)
          })
          .map(obj => {
            return (
              <Note
                key={obj.id}
                id={obj.id}
                title={obj.title}
                body={obj.body}
                tags={obj.tags}
              />
            )
          })
        }
      </section>
    </div>
  )
}
