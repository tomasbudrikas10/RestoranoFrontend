import {useEffect, useState} from "react";
import NavigationBar from "./NavigationBar.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [orderStates, setOrderStates] = useState([])
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [userPaymentMethods, setUserPaymentMethods] = useState([])
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
        <NavigationBar/>
        <p>Hello World!</p>
    </div>
  )
}

export default App
