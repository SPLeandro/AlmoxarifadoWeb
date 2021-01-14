import React, {useEffect, useState} from 'react';

import { Modal, Paper, TextField, Typography, Button } from '@material-ui/core';

import './styles.css'

function ProdsModal(props) {

    const [id, setId] = useState('');
    const [desc, setDesc] = useState('');
    const [ref, setRef] = useState('');
    const [marca, setMarca] = useState('');
    const [medidas, setMedidas] = useState('');
    const [qtde, setQtde] = useState('');
    const [disable, setDisable]= useState(false);

    useEffect(()=> {
        if(props.showModal == true){
            setId(props.data.id);
            setDesc(props.data.desc);
            setRef(props.data.ref);
            setMarca(props.data.marca); 
            setMedidas(props.data.medidas);
            setQtde(props.data.qtde);   
            
            props.data.id == '' ? setDisable(false) : setDisable(true);
            
        }
    }, [props.showModal])

    return (

        <Modal className="FormModal"
            open={props.showModal}
            onClose={() => props.setModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper className="ModalInputs">

                <Typography style={{display: 'flex' , justifyContent: 'center'}} variant="h5">Cadastrar Produto</Typography>


                <div className="TextInput">
                    <TextField disabled={disable} label="ID" value={id}/>
                    <TextField disabled={disable} label="Descrição" value={desc} />
                    <TextField disabled={disable} label="Referência" value={ref}/>
                    <TextField disabled={disable} label="Marca" value={marca}/>
                    <TextField disabled={disable} label="Medidas" value={medidas}/>
                    <TextField aria-disabled={disable} label="Quantidade" value={qtde}/>
                    
                </div>


                <div className="OptionsBar">
                    <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button> 

                    <Button variant="contained" color="primary">Cadastrar</Button>
                </div>

                
                
            </Paper>
            
        </Modal>
    )
}

export default ProdsModal;