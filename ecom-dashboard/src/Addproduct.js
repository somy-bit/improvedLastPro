import React, { useState } from 'react';
import Header from './Header';
import {Form,Button,Card} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

function AddProduct(){

    const [title,setTitle] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');
    const [message,setMessage]=useState([]);

    async function addProduct(){

        let data = new FormData();
        data.append('title',title);
        data.append('image',image);
        data.append('price',price);
        data.append('quantity',quantity);
        data.append('description',description);

 ////////////////////////////////////////////

    const response = await fetch('http://127.0.0.1:8000/api/add',{
            method:'POST',
            body:data,
         
        }).then(response=>response.json().then(res=>{
            console.warn(res)
           
            if(Array.isArray(res) && response.status === 200)
            setMessage(res)
            else if(response.status ===200 && response.ok === true){
                window.location.reload(false)
            }
        })
  
        ).catch(err=>{
            console.warn(err)
        });

    }
//////////////////////////////////////////////////////////////////////////////////

    return(
        <div>
            <Header inpage='add' />
            <br/><br/>
            <Card className='col-md-8 offset-md-2 pb-4'>
                <Card.Header>
                   Add Product
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Label>
                            product title
                        </Form.Label>
                        <Form.Control type='text' placeholder='title..' value={title} onChange={e=>setTitle(e.target.value)}></Form.Control>
                      {message !== []?
                          message.map((mess,i)=>
                          mess.includes('title')?
                          <div className='warning-t d-flex justify-content-start p-3 ' key={i}>
                              {mess}
                              
                          </div>
                          :null
                          )   :null
                      }
                        <Form.Label>
                            product description
                        </Form.Label>
                        <Form.Control as='textarea' rows={3} placeholder='description..' value={description} onChange={e=>setDescription(e.target.value)}></Form.Control>
                        {message !== []?
                          message.map((mess,i)=>
                          mess.includes('description')?
                          <div className='warning-t d-flex justify-content-start p-3' key={i}>
                              {mess}
                              
                          </div>
                          :null
                          )   :null
                      }
                       
                        <Form.Label>
                            product image
                        </Form.Label>
                        <Form.Control type='file' placeholder='image..'  onChange={e=>setImage(e.target.files[0])}></Form.Control>
                      
                        {message !== []?
                          message.map((mess,i)=>
                          mess.includes('image')?
                          <div className='warning-t d-flex justify-content-start p-3' key={i}>
                              {mess}
                              
                          </div>
                          :null
                          )  :null 
                      }
                        <Form.Label>
                            product price
                        </Form.Label>
                        <Form.Control type='number' placeholder='price..' value={price} onChange={e=>setPrice(e.target.value)}></Form.Control>
                        {message !== []?
                          message.map((mess,i)=>
                          mess.includes('price')?
                          <div className='warning-t d-flex justify-content-start p-3' key={i}>
                              {mess}
                              
                          </div>
                          :null
                          )  :null 
                      }
                        <Form.Label>
                            quantity
                        </Form.Label>
                        <Form.Control type='number' placeholder='quantity..' value={quantity} onChange={e=>setQuantity(e.target.value)}></Form.Control>
                        
                        { message !== []?
                          message.map((mess,i)=>
                          mess.includes('quantity')?
                          <div className='warning-t d-flex justify-content-start p-3' key={i}>
                              {mess}
                              
                          </div>
                          :null
                          ) :null  
                      }
                        <br/><br/>
                        <Button onClick={addProduct}>ADD IT</Button>
                    </Form>
                </Card.Body>

            </Card>
           
        </div>
    )
}

export default AddProduct;