import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

function SearchBar(props) {

    const [val, setVal] = useState('');

    function callback(value) {

        setVal(value);
        props.callParent(value);
    }


    return (

        <div className='d-flex'>
            <InputGroup>
                <InputGroup.Text className='bg-dark'>
                    <FontAwesomeIcon icon={faSearch} className='text-gray' ></FontAwesomeIcon>
                </InputGroup.Text>
                <FormControl placeholder='search...' type='text' onChange={e => callback(e.target.value)} />
            </InputGroup>

        </div>

    );

}

export default SearchBar;