import React, { useEffect, useState } from 'react'
import { getTransactions, addTransaction } from '../../redux/_actions/transactionAction';
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux';

const Transaction = () => {

  const {products} = useSelector(state => state.product)
  const {customers} = useSelector(state => state.customer)

  const {transactions} = useSelector(state => state.transaction)

  const dispatch = useDispatch();

  const [transaction, setTransaction] = useState({
    product: null,
    customer: null,
    _status: ''
  })

  useEffect(() => {
    dispatch(getTransactions());
  }, [transaction])

  const onChange = (e) => setTransaction({...transaction, [e.target.name]: e.target.value});

  const addTransactions = (e) => {
    e.preventDefault();
    setTransaction({...transaction})  
    dispatch(addTransaction(transaction));
  }

  return (
    <div className="grid-2 trans">
    <div>
    <h2>Transactions List</h2> 
    <Table striped bordered hover responsive>
    <thead >
        <tr>
          <th>Customer Name</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
       
          {transactions && transactions.map((trans, i) => ( <tr key={i}><td>{trans.customer.name}</td><td>{trans.status}</td><td>{trans.date}</td></tr>)
          )}
        
      </tbody>
    </Table>
    </div>
    <div className="form-container">
      <form onSubmit={addTransactions}>
          <h2>Add Transaction</h2> 
          <div className="form-group">
            <label htmlFor="customer">Customer Name</label>
            <select name="customer" onChange={onChange}>
            <option>--select--</option>
              {customers && customers.map(cust => (
                <option key = {cust._id} value={cust._id}>{cust.name}</option>
              ))}
          </select>
          </div>
          <div className="form-group">
            <label htmlFor="product">Product Name</label>
            <select name="product" onChange={onChange}>
              <option>--select--</option>
              {products && products.map(prod => (
                <option key = {prod._id} value={prod._id}>{prod.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="_status">Status</label>
            <input type="text" name="_status" onChange={onChange}/>
          </div>

          <input className="btn btn-primary" type='submit' value="Submit"/>
    </form>
    </div>
     </div>)
}

export default Transaction
