import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Table, Image, Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {MAINURL} from './Constants';

let stopFetchMore = false;
let endofdata = false;
let searching =false;
let searchKey = '';

let scrolled =false;

function ProductList() {


    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');


    const handleClose = () => setShow(false);


    const [itemId, setItemid] = useState('');

    function handleShow(item) {
        setItemid(item);
        setShow(true);
    }
    /////////////////////////////////////////

    const handleScroll = () => {

        stopFetchMore = false;
      

        if(window.pageYOffset < window.innerHeight)
        {
            scrolled = false;
        }

       

        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

        if (bottom) {

            console.log('at the bottom');
            scrolled = true;
            getData(searchKey);

        }
    }

    //////////////////////////////////////////

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);

        }

    }, [data]);



    useEffect(() => {

        getData();

    }
        , []);

    /////////


    function getData(searchKey) {
      
        let path = searching ? MAINURL + 'search/'+searchKey+'/' : MAINURL + 'list/';

        let offset = scrolled ? data.length : 0;

        console.log(path+offset);

        if (!stopFetchMore && !endofdata)
            fetch(path + offset)
                .then(function (response) { return response.json(); })
                .then(function (dat) {

                    const items = dat;
                    console.log(items); 

                    if (dat === null) {

                        console.log('end of data');
                        stopFetchMore = true;
                        endofdata = true;
                    }

                    let datalist = scrolled ? [...data,...items]:[...items];
                    setData(datalist);
                    stopFetchMore = true;
                    console.log('data set');
                   
                })
    }

    ////////////////

    async function deleteItem(item) {

        console.log('item', item)
        let result = await fetch('http://127.0.0.1:8000/api/delete/' + item.id, {
            method: 'DELETE'
        });

        if (result.status !== 200) {

            let errors = await result.json();
            setError(errors.message);
            alert(error);
        }

        result = await result.json();


        if (result.result === 'success') {

            console.log('delete', result.result);
            setData(data.filter(function (pro) {
                return pro !== item;
            }));
            console.log('del', data);
        }
        handleClose();


    }
    ////////////////////////////////////

    async function searchItem(search){

        searching = true;
        searchKey = search;
        stopFetchMore = false;

        if(search === ''){

           console.log('search','ended');
           searching = false;
           getData();

         }else{

             getData(search);
         }

    
    }
    /////////////////////////////////////////


    return (



        <div onScroll={handleScroll}>
            <Header inpage='list' callback={searchItem}/>
            {data === [] ?
                <div>loading</div>
                :
                <div className='m-3'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th >id</th>
                                <th >title</th>
                                <th >price</th>
                                <th >description</th>
                                <th >image</th>
                                <th >quantity</th>
                                <th >operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, i) =>
                                    <tr key={i}>
                                        <td >{item.id}</td>
                                        <td >{item.title}</td>
                                        <td >{item.price}</td>
                                        <td >{item.description}</td>
                                        <td ><Image thumbnail={true} src={'http://127.0.0.1:8000/storage/' + item.image} /></td>
                                        <td >{item.quantity}</td>
                                        <td >
                                            <div className='d-flex flex-column justify-content-around '>
                                                <Button onClick={() => handleShow(item)} className='bg-danger m-4' >delete</Button>
                                                <Button onClick={() => navigate('update/' + item.id)} className='bg-info m-4' >update</Button>
                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Deletion</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>are you sure you want to delete this product?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            cancel
                                                        </Button>
                                                        <Button variant="primary" onClick={() => deleteItem(itemId)}>
                                                            delete
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </td>



                                    </tr>
                                )
                            }

                        </tbody>

                    </Table>



                </div>
            }
        </div>
    )

}

export default ProductList;