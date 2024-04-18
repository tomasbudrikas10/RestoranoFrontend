import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register({roles, setCurrentUser}) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [role, setRole] = useState("")
    const navigate = useNavigate()
    function submitForm(e) {
        e.preventDefault()
        let errs = []
        setErrors([])
        if (!name.trim()) {
            errs.push("No name provided.")
        }
        if (!password.trim()) {
            errs.push("No password provided.")
        }
        if (!role) {
            errs.push("No role provided.")
        }
        if (errs.length === 0) {
            fetch("http://localhost:3000/users", {method: "POST", body: JSON.stringify({
                    name: name,
                    password: password,
                    roleId: role
            }), headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(json => {
                    if ("errors" in json) {
                        json.errors.forEach(err => {errs.push(err)})
                    } else {
                        setCurrentUser({id: json.id, name: name, role: role})
                        localStorage.setItem("user", JSON.stringify({id: json.id, name: name, role: role}))
                        navigate("/")
                    }
                })
                .catch(err => {
                    console.error(err)
                }).finally(() => {
                    setErrors(errs)
            })
        } else {
            setErrors(errs)
        }
    }
    return <form onSubmit={submitForm} style={{display: "flex", gap: "10px", flexDirection: "column", alignItems: "center", border: "5px solid darkorange", width: "50%", margin: "50px auto", padding: "50px"}}>
        {errors.length > 0 ? <ul style={{marginBottom: "20px", color: "red"}}>
            {errors.map((err, index) => {
                   return <li key={index}>{err}</li>
                })}</ul> : ""
        }
        <label htmlFor={"name"}>Vartotojo Vardas</label>
        <input required id="name" type={"text"} onChange={(e) => setName(e.target.value)} value={name}/>
        <label htmlFor={"password"}>Slaptažodis</label>
        <input required id="password" type={"password"} onChange={(e) => setPassword(e.target.value)} value={password}/>
        <label htmlFor={"role"}>Paskyros Tipas</label>
        <select required value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" selected></option>
            {roles.map((role) => {
                return <option value={role.id}>{role.name}</option>
            })}
        </select>
        <input type="submit" value={"Prisiregistruoti"} style={{marginTop: "50px", padding: "10px 0", fontSize: "20px", width: "200px", textAlign: "center", border: "2px solid darkorange", textDecoration: "none", color: "black", background: "whitesmoke"}}/>
    </form>
}

export default Register