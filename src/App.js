import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './components/Base/Base';
import Signup from './components/Signup/Signup';
import Adminbase from './components/Adminbase/Adminbase';
import AddMeal from './components/admin/AddMeal';
import ShowOrder from './components/admin/ShowOrder';
import UpdateMeal from './components/admin/UpdateMeal';
import AddCategory from './components/admin/AddCategory';
import AddSubCategory from './components/admin/AddSubCategory';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Base} />
        <Route path='/SignUp' Component={Signup} />
        <Route path='/Admin' Component={Adminbase} >
          <Route path='/Admin/AddMeal' Component={AddMeal} />
          <Route path='/Admin/ShowOrder' Component={ShowOrder} />
          <Route path='/Admin/UpdateMeal' Component={UpdateMeal} />
          <Route path='/Admin/AddCategory' Component={AddCategory} />
          <Route path='/Admin/AddSubCategory' Component={AddSubCategory} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
