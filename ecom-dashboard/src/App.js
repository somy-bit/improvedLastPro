
import './App.css';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Add from './Addproduct';
import Update from './UpdateProduct';
import Protected from './Protected';
import ProductList  from './ProductList';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
          <Routes>
            <Route path='/login' element={<Login />}>

            </Route>
            <Route path='/register' element={<Register />}>

            </Route>
            <Route path='/' element={<Protected component={ProductList} />}>

            </Route>
            <Route path='/add' element={<Protected component={Add} />}>

            </Route>
            <Route path='/update/:id' element={<Protected component={Update} />}>

            </Route>
          </Routes>
       
      </BrowserRouter>

    </div>
  );
}

export default App;
