import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/gameStore';
import MainApp from './components/MainApp';
import './styles/globals.css';

// 将store添加到window对象，供useGameData hook使用
window.store = store;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainApp />
      </div>
    </Provider>
  );
}

export default App;
