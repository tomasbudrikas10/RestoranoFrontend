import {Link} from "react-router-dom";

function NavigationBar({isLoggedIn, cart}) {
    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 100px",
        backgroundColor: "orange",
    }
    const navigationButtonStyle = {
        padding: "20px 50px",
        backgroundColor: "white",
        border: "2px solid darkorange",
        textDecoration: "none",
        color: "black",
        fontSize: "20px",
    }
    const navigationButtonGroup = {
        display: "flex",
        gap: "20px",
    }
    const navigationLogoText = {
        color: "white",
        fontSize: "36px",
        fontWeight: "bold",
        fontFamily: "Arial",
        textDecoration: "none",
    }
    return <div style={containerStyle}>
        <Link to={"/"} style={navigationLogoText}>Tomo Restoranas</Link>
        <div style={navigationButtonGroup}>
            {!isLoggedIn ? <>
                <Link to={"/login"} style={navigationButtonStyle}>Prisijungti</Link>
                <Link to={"/register"} style={navigationButtonStyle}>Registruotis</Link>
            </> : <>
                <Link to={"/profile"} style={navigationButtonStyle}>Profilis</Link>
                <a style={navigationButtonStyle}>Atsijungti</a>
            </>}
            <Link to={"/cart"} style={navigationButtonStyle}>Krėpšelis ({cart.items.length})</Link>
        </div>
    </div>
}

export default NavigationBar