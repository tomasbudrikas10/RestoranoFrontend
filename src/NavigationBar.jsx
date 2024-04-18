function NavigationBar({isLoggedIn}) {
    const containerStyle = {
        backgroundColor: "orange",
    }
    return <div style={containerStyle}>
        <a>Tomo Restoranas</a>
        {isLoggedIn ? <div><a>Log In</a><a>Register</a></div> : <div><a>Profile</a><a>Log Out</a></div>}
    </div>
}

export default NavigationBar