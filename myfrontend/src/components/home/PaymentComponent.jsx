import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux"

import "../../style/PaymentForm.scss"; 
const PaymentForm = () => {
  const getdata = useSelector((state) => state.cartReducer.carts);
  const [myCart,setMyCart] = useState(getdata)
  const displayCart = myCart.map((item, index) => (
    <div key={index} className="cart-item">
      <hr/>
      <label className="item-label">Title: {item.title}</label>
      <hr/>
      <label className="item-label">Price: {item.price}</label>
      <hr/>
      <div></div>
      <label className="item-label">Quantity: {item.qty}</label>
      <hr/>
    </div>
  ));
  console.log(myCart)
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresseCom: "",
    telCom: null,
    payCom: "",
    villeCom: "",
    codPostCom: null,
    typePay: "On Site",
    DateCom: '11/11/2002'
  });
  console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleTypePayChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      typePay: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3002/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("response",response)
      if (response.ok) {
        console.log('Form data submitted successfully.');
        // Reset the form fields or navigate to a different page upon successful submission
      } else {
        console.log('Failed to submit form data.');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error scenario
    }
  };
  

  return (
    <div className="payment-form">
      <br/>
      <h2>Payment Form</h2>
      {displayCart}
      <form onSubmit={handleSubmit}>
        <br/>
        <label>
          Nom:
          <input type="text" name="nom" value={formData.nom} required onChange={handleChange} />
        </label>
        <br />
        <label>
          Prénom:
          <input type="text" name="prenom" value={formData.prenom} required onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} required  onChange={handleChange} />
        </label>
        <br />
        <label>
        </label>
        <h2 className="pform">Adresse Info</h2>
        <br/>
        <br/>
        <label>
          Adresse:
          <input type="text" name="adresseCom" value={formData.adresseCom } required onChange={handleChange} />
        </label>
        <br />
        <label>
          Pays:
          <input type="text" name="payCom" value={formData.payCom} required onChange={handleChange} />
        </label>
        <br/>
        <label>
          Ville:
          <input type="text" name="villeCom" value={formData.villeCom} required onChange={handleChange} />
        </label>
        <br/>
        <label>
          Code Postale:
          <input type="number" name="codPostCom" value={formData.codPostCom} required onChange={handleChange} />
        </label>
        <br/>
        <label>
          Téléphone:
          <input type="number" name="telCom" value={formData.telCom} required onChange={handleChange} />
        </label>
        <br />
        <label>
          Payment Method:
          <select name="typePay" value={formData.typePay} onChange={handleTypePayChange}>
        <option value="Online">Online</option>
        <option value="On Site">On Site</option>
      </select>
        </label>
        <br />
        {/* Repeat similar code for other fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
