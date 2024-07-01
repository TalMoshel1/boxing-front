import React from 'react';
import { Provider } from 'react-redux';
import Calendar from './pages/Calendar'
import store from './redux/store';
import './App.css';

console.log('.')

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Scheduler</h1>
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
