import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './layouts/Main';
import Shopes from './components/Shopes/Shopes'
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import About from './components/About/About';
import { loadProductsAndStoreCard } from './loaders/loadProductsAndStoreCard';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main></Main>,
      children:[
        {
          path:'/',
          loader:()=> {
            return fetch('products.json')
          },
          element: <Shopes></Shopes>
        },
        {
          path:'/orders',
          loader:loadProductsAndStoreCard,
          element:<Orders></Orders>
        },
        {
          path:'/inventory',
          element:<Inventory></Inventory>
        },
        {
          path:'/about',
          element:<About></About>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
