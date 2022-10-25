import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './boardList';
import Write from './write';


function App() {
  return (
    <div className="App">
      <BoardList></BoardList>
      <Write></Write>
    </div>
  );
}

export default App;
