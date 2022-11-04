import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BoardList from './boardList';
import Write from './write';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<BoardList/>} />
      <Route path="/write" element = {<Write />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
