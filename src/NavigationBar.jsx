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
        fontFamily: "Arial"
    }
    return <div style={containerStyle}>
        <a style={navigationLogoText}>Tomo Restoranas</a>
        <div style={navigationButtonGroup}>
            {!isLoggedIn ? <>
                <a style={navigationButtonStyle}>Prisijungti</a>
                <a style={navigationButtonStyle}>Registruotis</a>
            </> : <>
                <a style={navigationButtonStyle}>Profilis</a>
                <a style={navigationButtonStyle}>Atsijungti</a>
            </>}
            <a style={navigationButtonStyle}>Krėpšelis ({cart.length})</a>
        </div>
    </div>
}

export default NavigationBar