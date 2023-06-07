
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Update = () => {
  
  const [house,setHouse] = useState('');
  const [country,setCountry] = useState('');
  const [state,setState] = useState('');
  const [city,setCity] = useState('');
  const [userId,setUserId] = useState('');

    /** PreFill Records  */

    function findData(){
        
        let id = JSON.parse(window.localStorage.getItem('st'))
        console.log(id)
        fetch(`http://localhost:8080/data`).then((result)=>{
            result.json().then((resp)=>{

                // console.log(resp[id].addresses[0].house)
                
                setHouse(resp[id].addresses[0].house)
                setCountry(resp[id].addresses[0].country)
                setCity(resp[id].addresses[0].city)
                setState(resp[id].addresses[0].state)
                setUserId([resp[id]._id])
                
            })
        })
    }

    /** Stop reRendering */
    useEffect(()=>{
        findData();
    },[])

     /** Uddate Record */

    function UpdateRecord(){
        let addresses=[{country,state,city,house}]
        let data=({addresses,userId});
        fetch(`http://localhost:5000/data/${userId}`,{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)
               
            })
            
        })
        toast.success('Update Successfully',{
                    position : 'top-center'
                })
    }
    return (
        <>
           <div className='container'>
            <div className='row'>
            <div className='col-sm-6 pt-5 mt-5 pe-5'>
                    <img src='https://previews.123rf.com/images/dirkercken/dirkercken1410/dirkercken141000715/32408524-update-updating-software-now-and-here-to-the-latest-newest-version-or-new-edition.jpg' alt='...' className='img-thumbnail'/>
                </div>
                <div className='col-sm-6 bg-light p-5 pt-3'>
                    <div className='row pt-5 mt-5'>
                        <div className='col-sm-12 text-center pb-3'>
                            <h2>Update <u className='text-danger fw-bold'>Form</u></h2>
                        </div>
                    </div>
                    <form  encType='multipart/form-data'>
                    <lable className='fs-6 fw-bold'>Address</lable>
                    <input type="text" className='form-control mb-3' placeholder='Enter the Country' value={country} onChange={(e)=>setCountry(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the State'value={state} onChange={(e)=>setState(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the city' value={city} onChange={(e)=>setCity(e.target.value)} /> 
                    <input type="text" className='form-control mb-3' placeholder='Enter the house No'value={house}  onChange={(e)=>setHouse(e.target.value)} /> 
                   <Link to="/show"><button className='btn btn-success w-25 me-4' onClick={UpdateRecord}>Submit</button></Link>
                    </form>
                </div>
               
                
            </div>
           </div>
           <ToastContainer/> 
        </>
    );
};

export default Update;
