import React from 'react';
import { Button } from '@mui/material';
import {Link} from "react-router-dom";
import { TextField } from '@mui/material';
import styles from './Header.module.scss'
import { useAppDispatch } from '../../hooks/hooks';
import { searchNote } from '../../redux/slice';

const Header = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <header className={styles.header}>
        <h1>Note App</h1>
        <TextField onChange={(e) => dispatch(searchNote(e.target.value))} id="outlined-basic" label="Enter tags..." variant="outlined" />
        <Link to={'/add-note'}>
          <Button variant="contained">Create New Note</Button>
        </Link>
      </header>
    </>
  )
}

export default Header