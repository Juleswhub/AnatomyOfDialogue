import filmsData from './src/filmsData'; // Fixed path - removed '/data'
import FilmVisualizer from './src/components/FilmVisualizer';
import './App.jsx';

function App() {
  return (
    <div className="App">
      <h1>Analyse de 10 scénarios de films</h1>
      <FilmVisualizer data={filmsData} />
    </div>
  );
}

export default App;