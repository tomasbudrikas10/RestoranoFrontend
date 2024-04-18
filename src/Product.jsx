function Product({product}) {
    const productStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
        width: "300px",
        height: "300px",
        border: "2px solid darkorange"
    }
    const productAddButtonStyle = {
        border: "2px solid darkorange",
        padding: "10px",
        background: "whitesmoke",
        textDecoration: "none",
        color: "black"
    }
    return <div style={productStyle}>
        <p style={{fontSize: "25px", fontWeight: "bold"}}>{product.name}</p>
        <p style={{textAlign: "center"}}>{product.description}</p>
        <p style={{fontSize: "20px", fontWeight: "bold"}}>{product.price} &euro;</p>
        <a style={productAddButtonStyle} href="#">Pridėti į krėpšelį</a>
    </div>
}

export default Product