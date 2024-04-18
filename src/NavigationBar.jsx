function NavigationBar(isLoggedIn) {
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
        {isLoggedIn ? <div style={navigationButtonGroup}>
            <a style={navigationButtonStyle}>Log In</a>
            <a style={navigationButtonStyle}>Register</a>
        </div> : <div style={navigationButtonGroup}>
            <a style={navigationButtonStyle}>Profile</a>
            <a style={navigationButtonStyle}>Log Out</a>
        </div>}
    </div>
}

export default NavigationBar