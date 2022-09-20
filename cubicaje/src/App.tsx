import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { store } from './store/store';

function App() {
  return (
   <Provider store= {store}>
    <HashRouter>
      <AppRoutes/>
    </HashRouter>
   </Provider>
  );
}

export default App;
