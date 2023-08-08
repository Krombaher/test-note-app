import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from '../../pages/Home';
import { AddNote } from '../../pages/AddNote/AddNote';
import { FullNote } from '../../pages/FullNote';
import { PATH } from "../../common/constants/Path";
export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.home} />} />
      <Route path={PATH.home} element={<Home />} />
      <Route path={PATH.addNote} element={<AddNote />} />
      <Route path={PATH.viewNote} element={<FullNote />} />
      <Route path={PATH.editNote} element={<AddNote/>}/>
    </Routes>
  )
}

