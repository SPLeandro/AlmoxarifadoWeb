import React, {useEffect, useState} from 'react';

import { Modal} from '@material-ui/core';

import './styles.css'

import IncreaseAmount from './amountIncrease.js';
import DecreaseAmount from './amountDecrease.js';
import EditData from './editData.js';
import CreateData from './createData.js';

function ProdsModal(props) {

    return (       
        <Modal className="FormModal"
            open={props.showModal}
            onClose={() => props.setModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
           {props.data.reason == 'INCREMENTAR' 
            ? <IncreaseAmount setModal={props.setModal} data={props.data}/>
            : props.data.reason == 'DECREMENTAR'
            ? <DecreaseAmount setModal={props.setModal} data={props.data}/>
            : props.data.reason == 'EDITAR'
            ? <EditData setModal={props.setModal} data={props.data}/>
            : <CreateData setModal={props.setModal} data={props.data}/>
           }
        </Modal>
    ) 
}

export default ProdsModal;