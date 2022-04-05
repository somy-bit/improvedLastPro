import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Form, Card, Button, Image } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/fontawesome-free-solid';





function UpdateProduct() {


    const [message, setMessage] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const [item, setItem] = useState('');

    let params = useParams();

    const navigate = useNavigate();
    


    useEffect(async () => {
        getItemData(params.id);

    }, []);
    //////////////////////////////////////////////

    async function getItemData(id) {


        let result = await fetch("http://127.0.0.1:8000/api/product/" + id);
        let response = await result.json();
        console.log(response);
        setItem(response);

    }

    async function updateItem() {

        let sendItem = new FormData();
        sendItem.append('title',title);
        sendItem.append('description',description);
        sendItem.append('image',image);
        sendItem.append('price',price);
        sendItem.append('quantity',quantity);
        sendItem.append('_method','PUT');

        console.log([title,description,image,price,quantity]);

        let result = await fetch("http://127.0.0.1:8000/api/update/"+item.id,{
            method:"POST",
            body:sendItem,
           
        } );
        let response = await result.json();
        console.log(response);
        if(response.done && response.done === 'true'){

            navigate('/');
        }else if(Array.isArray(response)){
            setMessage(response);
        }
    }

    return (
        <div>
            <Header callback={null} inpage='update' />
            <br /><br />
            <Card className='col-md-8 offset-md-2 pb-4'>
                <Card.Header>
                    update
                   
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Label>
                            product title
                        </Form.Label>
                        <Form.Control type='text' defaultValue={item.title} onChange={e => setTitle(e.target.value)}></Form.Control>
                        {message !== [] ?
                            message.map((mess, i) =>
                                mess.includes('title') ?
                                    <div className='warning-t d-flex justify-content-start p-3 ' key={i}>
                                        {mess}

                                    </div>
                                    : null
                            ) : null
                        }
                        <Form.Label>
                            product description
                        </Form.Label>
                        <Form.Control as='textarea' rows={3} defaultValue={item.description} onChange={e => setDescription(e.target.value)}></Form.Control>
                        {message !== [] ?
                            message.map((mess, i) =>
                                mess.includes('description') ?
                                    <div className='warning-t d-flex justify-content-start p-3' key={i}>
                                        {mess}

                                    </div>
                                    : null
                            ) : null
                        }

                        <Form.Label>
                            product image
                        </Form.Label>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <div className='flex-grow-1'>
                                <Form.Control type='file' onChange={e => setImage(e.target.files[0])}></Form.Control>
                            </div>
                            <div className=' flex-grow-1'>
                                <Image className='thumb-img' src={'http://127.0.0.1:8000/storage/' + item.image} />
                            </div>


                        </div>

                        {message !== [] ?
                            message.map((mess, i) =>
                                mess.includes('image') ?
                                    <div className='warning-t d-flex justify-content-start p-3' key={i}>
                                        {mess}

                                    </div>
                                    : null
                            ) : null
                        }
                        <Form.Label>
                            product price
                        </Form.Label>
                        <Form.Control type='number' defaultValue={item.price} onChange={e => setPrice(e.target.value)}></Form.Control>
                        {message !== [] ?
                            message.map((mess, i) =>
                                mess.includes('price') ?
                                    <div className='warning-t d-flex justify-content-start p-3' key={i}>
                                        {mess}

                                    </div>
                                    : null
                            ) : null
                        }
                        <Form.Label>
                            quantity
                        </Form.Label>
                        <Form.Control type='number' defaultValue={item.quantity} onChange={e => setQuantity(e.target.value)}></Form.Control>

                        {message !== [] ?
                            message.map((mess, i) =>
                                mess.includes('quantity') ?
                                    <div className='warning-t d-flex justify-content-start p-3' key={i}>
                                        {mess}

                                    </div>
                                    : null
                            ) : null
                        }
                        <br /><br />
                        <Button onClick={updateItem}>Update</Button>
                    </Form>
                </Card.Body>

            </Card>
        </div>
    )
}

export default UpdateProduct;