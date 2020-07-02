import React, {useState} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createaCategory } from "./helper/adminapicall";


 
const Addcategory = () => {

    const[name, setName] = useState("")
    const[error, setError] = useState(false)
    const[success, setSuccess] = useState(false)

    const goBack = ()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-success md-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const {user, token} = isAuthenticated()

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        //Calling the backend!
        createaCategory(user._id, token, {name})
        .then(data => {
            if(data.err){
                setError(true)
            }
            else {
                setError("")
                setSuccess(true)
                setName("")
            }
        })
    }

    const successMessage = ()=> {
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const warningMessage = ()=> {
        if(error){
            return <h4 className="text-success">Falied to create Category</h4>
        }
    }



    const myCategoryForm = ()=>(
        <form>
            <div className="from-group">
                <p className="lead">Enter the Category</p>
                <input  type="text" className="form-control my-3" autoFocus required placeholder="for eg. Summer" 
                        onChange={handleChange}
                        value={name}
                />
                <button className="btn btn-outline-info" onClick={onSubmit}>Create category</button>
            </div>
        </form>
    )

    return(
        <Base title="Create a category here!" description="Add a new Category for new T-shirts" className="container bg-info p-4">
            <div className='row bg-white rounded'>
                <div className='col-md-6 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default Addcategory;