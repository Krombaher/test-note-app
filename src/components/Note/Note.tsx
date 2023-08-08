import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import styles from './Note.module.scss';
import { useIndexedDB } from 'react-indexed-db-hook';
import { useAppDispatch } from '../../hooks/hooks';
import { removeNote } from '../../redux/slice';

type NotePropsType = {
  id: string,
  title: string,
  body: string,
  tags: string[],
  isFullNote?: boolean,
}

export const Note: React.FC<NotePropsType> = ({ id, title, body, tags, isFullNote }) => {
  const dispatch = useAppDispatch();
  const { deleteRecord } = useIndexedDB("notes");
 
  const handleClick = () => {
    deleteRecord(id)
      .then((event) => {
        dispatch(removeNote(id))
      });
  };

  return (
    <div className={styles.note}>
      <div className={styles.editButtons}>
        <Link to={`/posts/${id}/edit`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={handleClick} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Link to={`/note/${id}`}>
            {title}
          </Link>
        </div>
        <div>
          {isFullNote ? body : ''}
        </div>
        <div className={styles.tags}>
          {
            tags?.map((tag, i) => {
              return (
                <span key={i}>{tag}</span>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
