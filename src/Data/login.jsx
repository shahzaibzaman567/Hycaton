import { useState } from "react"
import "./login.css"

export function Login() {
    let [localdata, setlocalData] = useState([])

        
    let [state, setstate] = useState({
        name: "",
        email: "",
        password: "",

    })
    function User(name,password,email) {

        let user = [...localdata]
user.push({
    name:name,
    email:email,
    password:password,
})

setlocalData(user)
      return  localStorage.setItem("users", JSON.stringify(localdata))
    }
    console.log(state)

    return (
        <>
            <div className="login-head">
                <div className="container  col-xl-4 col-md-7 col-sm-10 col-12 d-flex justify-content-center align-items-center flex-column ">

                    <form className="card w-100 p-4 d-flex flex-column gap-2 " onSubmit={(e) => {
                       e.preventDefault()
                       return User(state.namestate.email,state.password)
                    }}>
                        <h2 className="pb-3 text-center">Login</h2>
                        <div className="mb-1">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                name="name"
                                value={state.name.trim()}
                                onChange={(e) => {
                                    setstate({ ...state, name: e.target.value })
                                }}
                            />
                        </div>

                        <div className="mb-1">

                            <label htmlFor="email" className="label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="eamil"
                                aria-describedby="emailHelp"
                                value={state.email.trim()}
                                onChange={(e) => {
                                    setstate({ ...state, email: e.target.value })
                                }}
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="password" className="orm-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="da"
                                value={state.password.trim()}
                                onChange={(e) => {
                                    setstate({ ...state, password: e.target.value })
                                }}
                            />
                        </div>

                        <a href=""><button type="submit" className="btn btn-primary    w-100">Login</button></a>
                        <a href=""><button type="submit" className="btn btn-primary   mt-2 w-100">register</button></a>

                    </form>
                </div>

            </div>
        </>
    )

}