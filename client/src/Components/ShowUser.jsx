import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
const ShowUser = () => {
    const [data, setData] = useState([])
    function findData() {
        fetch('http://localhost:5000/data').then((result) => {
            result.json().then((resp) => {
                // console.log(resp)
                setData(resp)
            })
        })
    }
// let fa = data
    // console.log('-------------------------------------------------',fa)


    function handleDelete(id) {
        if (window.confirm('are you sure want to delete?')) {
            fetch(`http://localhost:5000/data/${id}`, {
                method: "DELETE"
            }).then((result) => {
                result.json((resp) => {
                    console.log(resp)
                })
                toast.success('Delete Record SuccessFully', {
                    position: "top-center"
                })
                findData();
            })
        }
        else {
            toast.error('Record Not Delete', {
                position: 'top-center'
            })
        }
    }

    function handleEdit(id) {
        window.localStorage.setItem('st', JSON.stringify(id))
    }

    useEffect(() => {
        findData();
    }, [])
    return (

        <>
            <div className='container-fluid'>
                <div className='row text-center pt-2'>
                    <div className='col-sm-12'>
                        <h2>Show <b className='text-danger'>Records</b></h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 p-0'>
                        <div style={{ "overflowX": "auto" }}>
                            <table className='table text-center table-striped table-hover'>
                                <thead className='bg-dark text-light '>
                                    <tr>
                                        <th>ID</th>
                                        <th> Name</th>
                                        <th>Age</th>
                                        <th>Address</th>

                                        {/* <th>Edit</th> */}
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item,index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.age}</td>
                                                <td>
                                                 {
                                                    <span>
                                                    {item.addresses.map((addr, id) =>
                                                    
                                                    <span>
                                                        
                                                    {addr.house}, {addr.city}, {addr.state},{addr.country}  
                                                    { (addr.house).length < 2 ?
                                                     <Link to='/update'><button className='btn btn-outline-danger' onClick={() => handleEdit(index)}>Invalid</button></Link>
                                                      :<Link to='/update'><button className='btn btn-outline-success' onClick={() => handleEdit(index)}>valid</button></Link>}
                                                    </span>
                                                    )}
                                                    <Link to="/add" state={{id:item._id}}><b className='text-danger fs-3'><IoIosAddCircle/></b></Link>
                                                    </span>
                                                    } 
                                                   
                                                  
                                                   </td>
                                                {/* <td>
                                                     <button className='btn btn-success' >Edit</button>
                                                </td> */}
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                                                </td>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    );
};

export default ShowUser;

