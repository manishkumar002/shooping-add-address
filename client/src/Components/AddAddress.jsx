import React, { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function AddAddress() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.id;
    // console.log(userId)
  const [addresses, setAddresses] = useState([{ country: '', city: '', state: '' ,house:''}]);

  // Handle input changes for each address field
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  // Add a new address field
  const addAddressField = () => {
    setAddresses([...addresses, { country: '', city: '', state: '',house:'' }]);
  };

  // Remove an address field
  const removeAddressField = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  function AddAddresses(){
    fetch(`http://localhost:5000/address/${userId}`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(addresses[0])
    }).then((result)=>{
        result.json().then((resp)=>{
            console.log(resp)
           
        })
        
    })
    navigate("/show");
}

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the addresses
    AddAddresses();
    // console.log(addresses);
  };

  return (
    <form onSubmit={handleSubmit}>
      {addresses.map((address, index) => (
        <div key={index}>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={(event) => handleInputChange(index, event)}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={(event) => handleInputChange(index, event)}
          />

          <label>State:</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={(event) => handleInputChange(index, event)}
          />
           <label>House:</label>
          <input
            type="text"
            name="house"
            value={address.house}
            onChange={(event) => handleInputChange(index, event)}
          />

          <button type="button" onClick={() => removeAddressField(index)}>
            Remove Address
          </button>
        </div>
      ))}

      <button type="button" onClick={addAddressField}>
        Add Address
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddAddress;