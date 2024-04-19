import {Link} from "react-router-dom";

function Profile({currentUser}) {
    return <div style={{display: "flex", flexDirection: "column", border: "5px solid darkorange", margin: "50px auto", width: "50%", padding: "50px", minHeight: "50vh", textAlign: "center", gap: "20px", justifyContent: "center", alignItems: "center"}}>
        <p style={{fontSize: "30px"}}>Sveiki, {currentUser.name}!</p>
        <Link to={"/OrderHistory"} style={{marginTop: "50px", padding: "10px 0", fontSize: "20px", width: "200px", textAlign: "center", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}}>Peržiūrėti užsakymų istoriją</Link>
        {(currentUser.role == 2 || currentUser.role == 3) ? <Link to={"/EmployeeDashboard"} style={{padding: "10px 0", fontSize: "20px", width: "200px", textAlign: "center", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}}>Užsakymų valdymas</Link> : ""}
    </div>
}

export default Profile