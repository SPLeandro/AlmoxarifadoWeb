import React, {useEffect, useState} from 'react';

import { Modal, Paper, TextField, Typography, Button } from '@material-ui/core';

import './styles.css'

import api from '../../services/api';

function ProdsModal(props) {
    
    const [COD_PRODUTO, setCodProduto] = useState('');
    const [DESCR, setDescr] = useState('');
    const [REF, setRef] = useState('');
    const [MARCA, setMarca] = useState('');
    const [MED, setMed] = useState('');
    const [qtde, setQtde] = useState('');
    const [disable, setDisable] = useState(false);
    const [buttons, setButtons] = useState('');
    const [title, setTitle] = useState('');
    const [inputs, setInputs] = useState('');

    async function AumentarQtde(){
        console.log(`AUMENTOU ${qtde}`);
        props.setModal(false)

    }

    async function SubtrairQtde(){
        console.log(`DIMINUIU ${qtde}`);
        props.setModal(false)

    }

    async function EditarProduto(){

        const COD_EMPRESA = sessionStorage.getItem('COD_EMPRESA');


        const data = {
        
            COD_PRODUTO,
            COD_EMPRESA,
            DESCR,
            REF,
            MARCA,
            "IMG":"https://www.seekpng.com/png/detail/423-4231463_png-caixa-transparent-background-open-box-png.png",
            MED,

        }

        console.log('DESENVOLVIMENTO DA FUNÇÃO EM PROGRESO...')

        /*
        api.put('produto', data)
        .then(resp => {
            if (resp) {
                console.log(resp.data);
            } else {
                console.log(resp);
            }
        })
        .catch(error => console.log(error));
        */

        props.setModal(false)

    }

    async function CadastrarProduto(){

        const data = {
        
            "COD_EMPRESA": "1", // DEFINIR ONDE VAI FICAR O CÓDIGO DA EMPRESA
            DESCR,
            REF,
            MARCA,
            "IMG":"MINHAURLIMG",
            MED,

        }
        const response = await api.post('produto', data);
        props.setModal(false)
        
    }

    useEffect(()=> {
        if(props.showModal == true){

            console.log(props.data);

            setCodProduto(props.data.COD_PRODUTO);
            setDescr(props.data.DESCR);
            setRef(props.data.REF);
            setMarca(props.data.MARCA); 
            setMed(props.data.MED);           
            setInputs('');
            
            let {reason} = props.data;   

            setTitle(reason.toUpperCase());

            switch (reason){
                case 'cadastrar':
                    setDisable(false);
                    setButtons((
                        <div className="RightButtons">
                            <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={() => CadastrarProduto()}>Inserir</Button>
                        </div>
                    ));
                break;

                case 'editar':
                    setDisable(false);
                    setButtons((
                        <div className="RightButtons">
                            <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={() => EditarProduto()}>Alterar</Button>
                        </div>
                    ));
                break;

                case 'adicionar':
                    setDisable(true);
                    setButtons((
                        <div className="RightButtons">
                            <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={() => AumentarQtde()}>Adicionar</Button>
                        </div>          
                    ));    
                    setInputs(
                        <TextField 
                            label="Quantidade" 
                            value={qtde} onChange={e => setQtde(e.target.value)}
                        />
                    )   
                    setQtde(props.data.QTD);          
                break;

                case 'subtrair':
                    setDisable(true);
                    setButtons((
                        <div className="RightButtons">
                            <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                            <Button variant="contained" color="secondary" onClick={() => SubtrairQtde()}>Subtrair</Button>
                        </div>          
                    ));

                    setInputs(
                        <input
                            label="Quantidade" 
                            value={qtde} onChange={e => setQtde(e.target.value)}
                        />
                    )
                    setQtde(props.data.QTD);

                break;
                    
            }
            
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

                <Typography style={{display: 'flex' , justifyContent: 'center'}} variant="h5">{title} PRODUTO</Typography>

                <div className="TextInput">


                    <input>
                    </input>

                    <TextField 
                        disabled={disable} label="Descrição" 
                        value={DESCR} onChange={e => setDescr(e.target.value)}
                    />

                    <TextField 
                        disabled={disable} label="Referência" 
                        value={REF} onChange={e => setRef(e.target.value)}
                    />

                    <TextField 
                        disabled={disable} label="Marca" 
                        value={MARCA} onChange={e => setMarca(e.target.value)}
                    />

                    <TextField 
                        disabled={disable} label="Medidas" 
                        value={MED} onChange={e => setMed(e.target.value)}
                    />

                    {inputs}

                </div>

                {buttons}                
                
            </Paper>
            
        </Modal>
    )
}

export default ProdsModal;