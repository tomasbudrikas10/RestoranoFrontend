import NavigationBar from "../NavigationBar.jsx";
import Footer from "../Footer.jsx";
import {Outlet} from "react-router-dom";

function Layout({isLoggedIn, cart, setCurrentUser}) {
    return (<div style={{minHeight: "100vh", paddingBottom: "78px", position: "relative"}}>
            <NavigationBar isLoggedIn={isLoggedIn} cart={cart} setCurrentUser={setCurrentUser}/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout