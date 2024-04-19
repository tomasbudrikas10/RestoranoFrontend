import {Link} from "react-router-dom";

function EmployeeDashboard({orders, orderStates}) {
    function updateOrderState(id, stateId) {
        fetch("http://localhost:3000/orders/" + id, {method: "PUT", body: JSON.stringify({
                stateId: stateId
            }), headers: {
                "Content-Type": "application/json"
            }})
        orders.find((order) => order.id === id).stateId = stateId
        setTimeout(() => {window.location = "/EmployeeDashboard"}, 1000)

    }
    return <>
        <h1 style={{textAlign: "center", margin: "20px 0px"}}>Užsakymų valdymas</h1>
        <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", width: "60%", margin: "20px auto"}}>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo ID</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo būsena</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo data</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Paskutinis užsakymo būsenos keitimas</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Link To Order</span>
            {orders.toSorted((a, b) => a.id < b.id).map(order => {
                return <>
                    <span style={{border: "2px solid black", padding: "5px"}}>{order.id}</span>
                    <span style={{border: "2px solid black", padding: "5px"}}>
                        <select onChange={(e) => updateOrderState(order.id, e.target.value)}>
                            {orderStates.map(state => {
                                return <option value={state.id} selected={state.id === order.stateId}>{state.name}</option>
                            })}
                        </select>
                    </span>
                    <span style={{border: "2px solid black", padding: "5px"}}>{order.orderDate}</span>
                    <span style={{border: "2px solid black", padding: "5px"}}>{order.updatedAt}</span>
                    <span style={{border: "2px solid black", padding: "5px"}}><Link to={"/order"} state={{
                        orderId: order.id,
                        stateId: order.stateId
                    }}>View Order</Link></span>
                </>
            })}
        </div></>
}

export default EmployeeDashboard