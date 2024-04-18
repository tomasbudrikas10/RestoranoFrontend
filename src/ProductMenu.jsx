import Product from "./Product.jsx";

function ProductMenu({products}) {
    const productMenuStyle = {
        display: "flex",
        background: "whitesmoke",
        border: "5px solid darkorange",
        padding: "50px",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "25px",
        minHeight: "70vh",
        minWidth: "500px",
    }
    return <div style={{margin: "50px auto", width: "60%"}}>
        <h1 style={{fontSize: "48px", textAlign: "center", marginBottom: "50px"}}>Tomo Skanusis Meniu</h1>
        <div style={productMenuStyle}>
            {products.map(product => {
                return product.isAvailable ? <Product key={product.id} product={product}/> : ""
            })}
        </div
    ></div>
}

export default ProductMenu