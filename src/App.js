import './App.css';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Header from './components/header/header';
import MovieContainer from './components/movie-container/movie-container';

const App = () => {

  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <MovieContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
