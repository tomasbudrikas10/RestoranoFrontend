import {useEffect, useState} from "react";
import NavigationBar from "./NavigationBar.jsx";
import ProductMenu from "./ProductMenu.jsx";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [orderStates, setOrderStates] = useState([])
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [userPaymentMethods, setUserPaymentMethods] = useState([])
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        const parsedCart = JSON.parse(storedCart)
        return parsedCart || {items: []}
    })
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        const parsedUser = JSON.parse(storedUser)
        return parsedUser || null
    })
    const dataToLoad = [
        { endpoint: "products", stateSetter: setProducts },
        { endpoint: "orders", stateSetter: setOrders },
        { endpoint: "orderItems", stateSetter: setOrderItems },
        { endpoint: "orderStates", stateSetter: setOrderStates },
        { endpoint: "roles", stateSetter: setRoles },
        { endpoint: "users", stateSetter: setUsers },
        { endpoint: "userPaymentMethods", stateSetter: setUserPaymentMethods }
    ];
    useEffect( () => {
        const loadData = () => {
            dataToLoad.forEach(item => {
                fetch(`http://localhost:3000/${item.endpoint}`)
                    .then(res => res.json())
                    .then(json => {
                        if ('data' in json) {
                            item.stateSetter(json.data)
                            console.log(json.data)
                        } else {
                            console.log("No data property on response.")
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
        loadData();
    }, [])
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout cart={cart} isLoggedIn={currentUser !== null} setCurrentUser={setCurrentUser} />}>
                  <Route index element={<Home products={products} setCart={setCart} cart={cart} />}/>
                  <Route path="/register" element={<Register roles={roles} setCurrentUser={setCurrentUser} />}/>
                  <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>}/>
                  <Route path="/profile" element={<Profile currentUser={currentUser} roles={roles}/>}/>
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
