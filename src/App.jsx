import './App.css';
import Comments from './components/Comments';
import Header from './components/Header';
import TextArea from './components/TextArea';
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Header />
          <div className="main">
            <div className="textarea">
              <TextArea />
            </div>
            <Comments />
          </div>
      </Provider>
    </div>
  );
}

export default App;
