import {useEffect, useState} from "react";
import NavigationBar from "./NavigationBar.jsx";
import ProductMenu from "./ProductMenu.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [orderStates, setOrderStates] = useState([])
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [userPaymentMethods, setUserPaymentMethods] = useState([])
    const [cart, setCart] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
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
    <div>
        <NavigationBar isLoggedIn={isLoggedIn} cart={cart}/>
        <ProductMenu products={products} setCart={setCart} cart={cart}/>
    </div>
  )
}

export default App
