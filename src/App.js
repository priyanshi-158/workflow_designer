
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import WorkflowList from './components/WorkflowList';
import WokflowDesigner from './components/WokflowDesigner';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<RootLayout/>}>
          <Route exact path='/' element={<WorkflowList/>}/>
          <Route exact path=':id' element={<WokflowDesigner/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
