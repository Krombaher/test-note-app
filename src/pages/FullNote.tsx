import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../redux/store';
import { Note } from '../components/Note/Note';
import { getNote } from '../redux/slice';

export const FullNote = () => {
  const dataNote = useAppSelector((state: RootState) => state.notes.curretNote);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(getNote(id))
    }
  }, [dispatch, id])

  return (
    <>
      {
        dataNote &&
        <Note
          key={dataNote.id}
          id={dataNote.id}
          title={dataNote.title}
          body={dataNote.body}
          tags={dataNote.tags}
          isFullNote
        />
      }
    </>
  )
}

