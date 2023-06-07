import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [country,setCountry] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [house,setHouse] = useState('');
    // const [address,setAddress] = useState('');
    function saveData(){
        let addresses=[{country,state,city,house}]
        let data=({name,age,addresses});
        fetch('http://localhost:5000/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
         }).then((result)=>{
            result.json().then((res)=>{
                console.log(res)
                toast.success('Register SuccessFully',{
                    position :'top-center'
                })
            })
        })
    }
    return (
        <>
           <div className='container'>
            <div className='row'>
                <div className='col-sm-6 bg-light p-5 pt-3'>
                    <div className='row pt-5 mt-5'>
                        <div className='col-sm-12 text-center pb-3'>
                            <h2>Registration <u className='text-danger fw-bold'>Form</u></h2>
                        </div>
                    </div>
                    <form  encType='multipart/form-data'>
                    <lable className='fs-6 fw-bold'> Name</lable>
                    <input type="text" className='form-control mb-3' placeholder='Enter the Name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <lable className='fs-6 fw-bold'>Age</lable>
                    <input type="text" className='form-control mb-3' placeholder='Enter the Age' value={age} onChange={(e)=>setAge(e.target.value)} />
                    <lable className='fs-6 fw-bold'>Address</lable><br/>
                    <input type="text" className='form-control mb-3' placeholder='Enter the Country' value={country} onChange={(e)=>setCountry(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the State'value={state} onChange={(e)=>setState(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the city' value={city} onChange={(e)=>setCity(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the house No'value={house}  onChange={(e)=>setHouse(e.target.value)} /> 

                   <Link to="/show"><button className='btn btn-success w-25 me-4' onClick={saveData}>Submit</button></Link>
                   
                    </form>
                </div>
               
                <div className='col-sm-6 pt-5 mt-5'>
                    <img src='https://st2.depositphotos.com/1029756/6496/i/950/depositphotos_64964951-stock-photo-register-now-text-write-on.jpg' alt='...' className='img-thumbnail' />
                </div>
            </div>
           </div>
           <ToastContainer/> 
        </>
    );
};

export default Register;
