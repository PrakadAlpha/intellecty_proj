import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table'
import {getProducts, addProducts, setCurrent, updateProducts, clearCurrent, deleteProduct} from '../../redux/_actions/productAction'

const Product = () => {

  const {products, current} = useSelector(state => state.product)
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    _id: '',
    name: ''
  })
  
  useEffect(() => {
    dispatch(getProducts());
  }, [product])

  useEffect(() => {
    
    if(current !== null){
      setProduct(current);
    }else{
      setProduct({
        _id: '',
        name: ''
      })
    }
  
  }, [current])

  const onChange = (e) => setProduct({...product, [e.target.name]: e.target.value});

  const addProduct = () => {
    if(current === null){
      dispatch(addProducts(product));
    }else{
      dispatch(updateProducts(product));
    }
    dispatch(clearCurrent());
  }

  const onDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(clearCurrent());
  }

  return (
    <>
      <h1>Product</h1>
      <div>
      Add Product <input type="text" name="name" value = {product.name} onChange={onChange}/>
      <button style={{marginTop: '10px'}} className="btn btn-primary"onClick={addProduct}>{current ? 'Update Product': 'Add Product'}</button>
      </div>
     <h2 style={{marginTop: '5px'}}>Product List</h2> 
      <Table striped bordered hover responsive>
      <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products !== null && products.map(prod => (<tr key = {prod._id}>
          <td>{prod.name}</td>
          <td><button className="btn btn-dark btn-sm" style={{margin: '5px'}} onClick={_ => dispatch(setCurrent(prod))}>Edit</button>
         <button className="btn btn-danger btn-sm m-2" onClick={_ => onDelete(prod._id)}>Delete</button></td>
             </tr>))}
        </tbody>
      </Table>
    </>
  )
}

export default Product
