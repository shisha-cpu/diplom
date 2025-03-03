import { useState } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../store/slices/userSlice"
import { Navigate } from "react-router-dom"
export default function Login(){
    const [username , setUserName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user)
    const [redirect , setRedirect] = useState(false)
    const [err , setErr ] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();

        
        const  userData ={
            email,
            password
        }
        axios.post('http://localhost:4444/login' , userData)
        .then(res =>{
            dispatch(fetchUser(res.data))
                console.log(res);
                
                setRedirect(true)
                localStorage.setItem('user' , JSON.stringify(res.data))
                     
        })  
        .catch(err => setErr(err.response.data.msg)
        )

    }
    if (redirect) {

        
        return <Navigate to='/' />
    }
    return(
        <section>
            <div className="auth-container">
                <h2 className="auth-logo">Вход</h2>
              <p className="err">  {err}</p>
                <form onSubmit={handleSubmit}>
                    <label >Email : </label>
                    <input type="text" onChange={e=>{setEmail(e.target.value)}} required/>
                    <label >Пароль : </label>
                    <input type="text"  onChange={e=>{setPassword(e.target.value)}} required/>
                    <input type="submit" value="Войти" />
                </form>
            </div>
        </section>
    )
}