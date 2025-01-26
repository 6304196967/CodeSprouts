import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import "../styles/signup.css";
function Signup() {

    const navigate=useNavigate();
    
    const handleNavigate=()=>{
        navigate("/");}
    //we are declaring the state variables here
    
    const [formData,setFormData]=useState({
      username:"",
      email:"",
      password:"",
      confirmpassword:"",
    });
    //we are declaring the function to handle the input change
    const handleInputchange=(e)=>{
          setFormData({
            ...formData,
          [e.target.name]:e.target.value
    });}
    //we are declaring the function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword){
          alert("passwords do not match");
          return;
        }
        try{//fetch contains two attributes where first is the link of the file running in backend 
          const response= fetch("http://localhost:5000/signup",{
            //In that 2nd attribute, we are passing the object which contains the method,headers and body
            method:"POST",
            headers:{"Content-Type":"application/json"},
          
          body:JSON.stringify({username:formData.username,
                              email: formData.email,
                              password: formData.password}),
         } );
          if (response.ok){
            alert("signup successfull");
            navigate("/confirmationpage");

          }
          else{alert("signup failed.please try again");
            console.log(formData);
          }
        }
        catch(error){
          console.error("Error:",error);
        
        }}
  return (
    <div>
      <h1 >Sign Up form</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
      <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputchange} placeholder="Enter your name:" required/>
        

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputchange} placeholder="Enter your Email" required/>
        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputchange} placeholder="Enter your Password" required />
        
        <label>Confirm password:</label>
        <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputchange}placeholder="Confirm your Password" required />
        
        <button className="signup-button" type="submit" >Submit</button>
        
        
      </form>
      <button onClick={handleNavigate}>back to login</button>
    </div>
  );
}   

export default Signup;
