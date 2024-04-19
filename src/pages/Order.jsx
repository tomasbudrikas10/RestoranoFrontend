import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function Order({orderItems, products, orderStates}) {
    const location = useLocation()
    console.log(location.state)
    const orderId = location.state.orderId
    const stateId = location.state.stateId
    const itemsOfCurrentOrder = orderItems.filter(item => item.orderId === orderId)
    let suma = 0;
    return <div>
        <h1 style={{textAlign: "center", margin: "20px 0px"}}>Užsakymas #{orderId}</h1>
        <h1 style={{textAlign: "center", margin: "20px 0px"}}>Užsakymo būsena: {orderStates.find(state => state.id === stateId).name}</h1>

        <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", width: "60%", margin: "auto"}}>
            <p style={{border: "2px solid black", padding: "5px", fontWeight: "bold"}}>Užsakymo prekės ID</p>
            <p style={{border: "2px solid black", padding: "5px", fontWeight: "bold"}}>Produkto pavadinimas</p>
            <p style={{border: "2px solid black", padding: "5px", fontWeight: "bold"}}>Kaina</p>
            <p style={{border: "2px solid black", padding: "5px", fontWeight: "bold"}}>Kiekis</p>
            <p style={{border: "2px solid black", padding: "5px", fontWeight: "bold"}}>Suma už produktą</p>
            {itemsOfCurrentOrder.map(((item, index) => {
                suma += products.find(product => product.id === item.productId).price * item.quantity
                return <>
                    <p style={{border: "2px solid black", padding: "5px"}}>{index + 1}</p>
                    <p style={{
                        border: "2px solid black",
                        padding: "5px"
                    }}>{products.find(product => product.id === item.productId).name}</p>
                    <p style={{
                        border: "2px solid black",
                        padding: "5px"
                    }}>{products.find(product => product.id === item.productId).price} &euro;</p>
                    <p style={{border: "2px solid black", padding: "5px"}}>{item.quantity}</p>
                    <p style={{
                        border: "2px solid black",
                        padding: "5px"
                    }}>{products.find(product => product.id === item.productId).price * item.quantity} &euro;</p>
                </>
            }))}</div>
        <p style={{textAlign: "center", marginTop: "20px", fontSize: "28px", fontWeight: "bold"}}>Bendra
            suma: {suma} &euro;</p>
    </div>
}

export default Order