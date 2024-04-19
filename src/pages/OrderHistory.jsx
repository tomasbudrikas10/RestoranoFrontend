import {Link} from "react-router-dom";

function OrderHistory({orders, orderStates}) {
    return <>
        <h1 style={{textAlign: "center", margin: "20px 0px"}}>Užsakymai</h1>
        <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", width: "60%", margin: "20px auto"}}>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo ID</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo būsena</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Užsakymo data</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Paskutinis užsakymo būsenos keitimas</span>
            <span style={{border: "2px solid black", padding: "5px"}}>Link To Order</span>
            {orders.map(order => {
                return <>
                    <span style={{border: "2px solid black", padding: "5px"}}>{order.id}</span>
                    <span style={{border: "2px solid black", padding: "5px"}}>{orderStates.find(state => state.id === order.stateId).name}</span>
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

        export default OrderHistory