import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table'
import {getCustomers, addCustomers, setCurrent, updateCustomers, clearCurrent, deleteCustomer} from '../../redux/_actions/customerAction';
const Customer = () => {

  const {customers, current} = useSelector(state => state.customer)
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({
    name: ''
  })
  
  useEffect(() => {
    dispatch(getCustomers());
  }, [customer])

  useEffect(() => {
    
    if(current !== null){
      setCustomer(current);
    }else{
      setCustomer({
        _id: '',
        name: ''
      })
    }
  }, [current])

  const onChange = (e) => setCustomer({...customer, [e.target.name]: e.target.value});

  const addCustomer = () => {
    if(current === null){
      dispatch(addCustomers(customer));
    }else{
      dispatch(updateCustomers(customer));
    }
    dispatch(clearCurrent());
  }

  const onDelete = (id) => {
    dispatch(deleteCustomer(id));
    dispatch(clearCurrent());
  }

  return (
    <>
      <h1>Customers</h1>
      <div>
      Add Customer <input type="text" name="name" value = {customer.name} onChange={onChange}/>
      <button style={{marginTop: '10px'}} className="btn btn-primary"onClick={addCustomer}>{current ? 'Update Customer': 'Add Customer'}</button>
      </div>
     <h2 style={{marginTop: '5px'}}>Customer List</h2> 
      <Table striped bordered hover responsive>
      <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers !== null && customers.map(cust => (<tr key = {cust._id}>
          <td>{cust.name}</td>
          <td><button className="btn btn-dark btn-sm" style={{margin: '5px'}} onClick={_ => dispatch(setCurrent(cust))}>Edit</button><button className="btn btn-danger btn-sm" onClick={_ => onDelete(cust._id)}>Delete</button></td>
             </tr>))}
        </tbody>
      </Table>
    </>
  )
}

export default Customer
