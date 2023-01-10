import React from 'react';
import { useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'
const Signup = () => {
  const intialValue = {username: "",email: "", password: "", rPassword: ""};
  const[formValue,setFormValue] = useState(intialValue)
  const[errors,setErrors] = useState({})
  const[onSubmit,OnSetSubmit] = useState(false)

 const handleChange = (e) =>{
    const{name,value} = e.target;
    setFormValue({...formValue,[name]: value});
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
  setErrors(validate(formValue))
  OnSetSubmit(true)
  // console.log("UserName :",intialValue.username)
  // sessionStorage.setItem("name", intialValue.username)
  };

  useEffect (() =>{
    if(Object.keys(errors).length === 0 && onSubmit){
      console.log(formValue)
      console.log("formValue :",formValue.username)
      sessionStorage.setItem("name", formValue.username)
      window.history.go(-1);
    }
  })
     
  const validate = (values) =>{
     const abc = {}
     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
     if(!values.username){
      abc.username = "Username is required!"
     } else if(values.username.length<4){
        abc.username = "Username must be more than 3 character"
     }
      else if(values.username.length>30){
        abc.username = "Username should notbe more than 30 character"
     }
     if(!values.email){
      abc.email = "Email is required!"
     } else if(!emailRegex.test(values.email)){
       abc.email = "This is not valid Email"
     }
     if(!values.password){
      abc.password = "Password is required!"
     }
     else if(values.password.length<6){
      abc.password = "Password length should more than 5"
     }
     else if(values.password.length>10){
      abc.password = "Password length should not more than 10"
     }
     else if(!/[^A-Za-z0-9]/.test(values.password)){
       abc.password = "Include atleast one special character"
     }
     if(!values.rPassword && !values.password){
      console.log(values.rPassword);
      abc.rPassword = "Please enter your password first!";
     }
     else if(!values.rPassword){
      abc.password = "Please confirm your password!"
     }
     else if(values.rPassword!==values.password){
      abc.rPassword = "Please enter the same password as above"
    }
    return abc;
     
  }
  return (
    <div className='Container'>
     
      <form onSubmit={handleSubmit}>
       
        <div className='element'>
            <h1>Create Your Account</h1>
            <div className='name'>
            <input className='username' type="text" name='username'  placeholder='Username' value={formValue.username} onChange={handleChange}/>
            </div>
            <p style={{color: 'red'}}>{errors.username} </p>
            <div className='email'>
            <input className='mail' type="email" name='email'  placeholder='Email' value={formValue.email} onChange={handleChange}/>
            </div>
            <p style={{color: 'red'}}>{errors.email}</p>
            <div className='password'>
            <input className='pass' type="password" name='password'  placeholder='Password' value={formValue.password} onChange={handleChange}/>
            </div>
            <p style={{color: 'red'}}>{errors.password}</p>
            <div className='rpassword'>
            <input className='rpass' type="password" name='rPassword' onChange={handleChange}  placeholder='Repeat Password' />
            </div>
            <p style={{color: 'red'}}>{errors.rPassword}</p>
              <div>
                {/* <Link to='/'> */}
                <button className='submit'>Submit</button>
                {/* </Link> */}
              </div>
              <Link to='/'>
              <button className='back'>Back to Home</button>
              </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
