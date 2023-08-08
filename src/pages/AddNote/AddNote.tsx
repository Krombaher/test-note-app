import React from 'react';
import { Button } from '@mui/material';
import styles from './AddNote.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addNote, changeNote, getNote } from '../../redux/slice';
import { useIndexedDB } from 'react-indexed-db-hook';
import { NoteType } from '../../types/Types';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export const AddNote = () => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const dataNote = useAppSelector((state: RootState) => state.notes.curretNote);
  const { add } = useIndexedDB("notes");

  const { id } = useParams();
  const { update } = useIndexedDB("notes");
  const isEdeting = Boolean(id)

  React.useEffect(() => {
    if (id) {
      dispatch(getNote(id))
    }
  }, [dispatch, id])

  React.useEffect(() => {
    if (dataNote) {
      setTitle(dataNote.title)
      setBody(dataNote.body)
    }
    if (!id) {
      setTitle('')
      setBody('')
    }
  }, [dataNote, id])


  let addTags = body?.split(' ').filter(el => (el['0'] === '#') ? el : '')
  let tagsSet = new Set<string>()
  addTags?.map(tag => tagsSet.add(tag))
  let allTags = Array.from(tagsSet)

  const createNote = () => {
    const note: NoteType = {
      id: nanoid(),
      title,
      body,
      tags: allTags,
    }

    add(note)
      .then((event) => {
        dispatch(addNote(note))
      },
        (error) => {
          console.log(error);
        },
      );
  }

  const ubdateNote = (id: string) => {
    update({ id, title, body, tags: allTags })
      .then(
        (event) => {
          dispatch(changeNote({ id, title, body, tags: allTags }))
        },
        (error) => {
          console.log(error);
        },
      );
  }

  const handleClick = () => {
    if (id) {
      ubdateNote(id)
    } else {
      createNote()
    }
  };

  const REGEX = /^#/g;

  const bodyRender = body?.split(' ')
    .map((word, i) => {
      if (word.match(REGEX) !== null) {
        return (
          <span key={i} className={styles.blue}>
            {word}
          </span>
        );
      } else {
        return <span key={i}>{word}</span>;
      }
    })

  return (
    <div className={styles.root}>
      <span>Enter title note...</span>
      <div className={styles.inputTitle}>
        <input
          className={styles.input}
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <span>Enter text...</span>
      <div className={styles.inputBody}>
        <input
          className={styles.input}
          value={body || ''}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className={styles.inputBodyRenderer}>
          {bodyRender}
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to={'/'}>
          <Button onClick={handleClick} size="large" variant="contained">
            {isEdeting ? 'Save' : 'Add'}
          </Button>
        </Link>
        <Link to={'/'}>
          <Button size="large">Cnacel</Button>
        </Link>
      </div>
    </div>
  );
}
