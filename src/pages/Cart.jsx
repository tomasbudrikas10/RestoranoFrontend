import {useEffect, useState} from "react";
import product from "../Product.jsx";

function Cart({cart, setCart}) {
    const [adjustedCart, setAdjustedCart] = useState([])
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
            {adjustedCart.length ? <a href="#" style={{padding: "10px 0", fontSize: "20px", width: "200px", textAlign: "center", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}}>Sukurti užsakymą</a> : ""}
        </div>
    </div>
}

export default Cart