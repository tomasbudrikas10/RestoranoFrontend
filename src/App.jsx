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
import OrderHistory from "./pages/OrderHistory.jsx";
import Order from "./pages/Order.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";

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

    useEffect( () => {
        loadData();
    }, [])
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout cart={cart} isLoggedIn={currentUser !== null} setCurrentUser={setCurrentUser} />}>
                  <Route index element={<Home products={products} setCart={setCart} cart={cart} />}/>
                  <Route path="/register" element={<Register roles={roles} setCurrentUser={setCurrentUser} />}/>
                  <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>}/>
                  <Route path="/profile" element={<Profile currentUser={currentUser}/>}/>
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart} currentUser={currentUser} />}/>
                  <Route path="/OrderHistory" element={<OrderHistory orderStates={orderStates} orders={orders.filter((order) => order.userId === (currentUser?.id))}/>}/>
                  <Route path="/order" element={<Order orderItems={orderItems} products={products} orderStates={orderStates} />}/>
                  <Route path="/EmployeeDashboard" element={<EmployeeDashboard orders={orders} orderStates={orderStates}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
