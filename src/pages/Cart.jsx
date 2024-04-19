import {useEffect, useState} from "react";
import product from "../Product.jsx";
import {useNavigate} from "react-router-dom";

function Cart({cart, setCart, currentUser, refreshData}) {
    const [adjustedCart, setAdjustedCart] = useState([])
    const [errors, setErrors] = useState([])
    function adjustCart() {
        const result = []
        cart.items.forEach((item) => {
            if (!result.some(obj => obj.id === item.id)) {
                result.push({...item, quantity: 1})
            } else {
                const index = result.findIndex(obj => obj.id === item.id)
                result[index].quantity += 1
            }
        })
        setAdjustedCart(result)
    }
    const navigate = useNavigate()
    useEffect(() => {
        adjustCart()
    }, [])
    useEffect(() => {
        adjustCart()
    }, [cart]);
    function clearCart() {
        setCart({items: []})
        localStorage.removeItem("cart")
    }
    function createOrder() {
        let id = 0
        fetch('http://localhost:3000/orders', {
            method: "POST",
            body: JSON.stringify({
                userId: currentUser.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                if ("errors" in json) {
                    console.log(json.errors);
                } else {
                    id = json.id
                    adjustedCart.forEach(item => {
                        fetch('http://localhost:3000/orderitems', {
                            method: "POST",
                            body: JSON.stringify({
                                orderId: json.id,
                                productId: item.id,
                                quantity: item.quantity,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(res2 => res2.json())
                            .then(json2 => {
                                if ("errors" in json2) {
                                    errors.push(json2.errors)
                                }
                            })
                    });
                }
            }).finally( () => {
                localStorage.removeItem("cart")
                setTimeout(() => {window.location = "/"}, 2000)
        });
    }
    return <div>
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            width: "50%",
            margin: "50px auto",
            padding: "20px",
            border: "5px solid darkorange",
            minHeight: "50vh",
        }}>
            <h1 style={{marginBottom: "50px"}}>Krėpšelis</h1>
            {adjustedCart.map((item => {
                return <div style={{fontSize: "20px"}}>{item.name} - {item.price} &euro; x {item.quantity}</div>
            }))}
            {!adjustedCart.length ? <p>Jūsų krėpšelis yra tuščias.</p> : ""}
            {adjustedCart.length ? <a href="#" style={{marginTop: "auto", padding: "10px 0", width: "200px", textAlign: "center", fontSize: "20px", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}} onClick={clearCart}>Ištrinti krėpšelį</a> : ""}
            {adjustedCart.length ?
                currentUser !== null ? <a href="#" style={{padding: "10px 0", fontSize: "20px", width: "200px", textAlign: "center", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}} onClick={createOrder}>Sukurti užsakymą</a> : <p>Norint baigt užsakymą, reikia prisijungti.</p>
                : ""}
        </div>
    </div>
}

export default Cart