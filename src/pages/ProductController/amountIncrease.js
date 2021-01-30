import React, {useEffect, useState} from 'react';

import { Paper, TextField, InputAdornment, Button} from '@material-ui/core';
import {Info, Assignment, Beenhere, AspectRatio, UnfoldMore, Report} from '@material-ui/icons';

import './styles.css';
import api from '../../services/api';

function ProdsModal(props) {
    
    const [DESCR, setDescr] = useState('');
    const [REF, setRef] = useState('');
    const [MARCA, setMarca] = useState('');
    const [MED, setMed] = useState('');
    const [qtde, setQtde] = useState();
    const [error, setError] = useState(false);

    async function HandleAumentarQtde(){
        if(!qtde){
            setError(true)
        } else {
            
            setError(false);
            const data = {
                QTD: qtde,
                COD_PRODUTO: props.data.COD_PRODUTO,
            }

            api.post('/produto/increase', data, {
                headers: {
                    COD_EMPRESA: sessionStorage.getItem('COD_EMPRESA'),
                }
            })
            
            props.setModal(false);     
        }
        

    }

    useEffect(()=> {
        setDescr(props.data.DESCR);
        setRef(props.data.REF);
        setMarca(props.data.MARCA);
        setMed(props.data.MED);
        setQtde(props.data.qtde);
    },[])

    return (
        <Paper className="ModalInputs">

            <h1 style={{display: 'flex' , justifyContent: 'center'}} >AUMENTAR QUANTIDADE</h1>
  
                <div className="IncreaseInputs">
                    <div className="InputGroup">
                        <div className="Input">
                            <TextField 
                                fullWidth={true}
                                disabled label="Descrição" 
                                value={DESCR} onChange={e => setDescr(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Info />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div className="Input">
                            <TextField 
                                fullWidth={true}
                                disabled label="Referência" 
                                value={REF} onChange={e => setRef(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Assignment />
                                    </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    <div className="InputGroup">
                        <div className="Input">
                            <TextField 
                            fullWidth={true}
                            disabled label="Marca" 
                            value={MARCA} onChange={e => setMarca(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Beenhere />
                                    </InputAdornment>
                                )
                            }}
                            />
                        </div>

                        <div className="Input">
                            <TextField 
                            fullWidth={true}
                            disabled label="Medidas" 
                            value={MED} onChange={e => setMed(e.target.value)}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <AspectRatio />
                                    </InputAdornment>
                                )
                            }}
                            />
                        </div>
                    </div>     

                    <div className="Input">
                        <TextField 
                            fullWidth={true}
                            error={error}
                            label="Quantidade" 
                            value={qtde} onChange={e => setQtde(e.target.value)}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment>
                                        {!error ? <UnfoldMore /> : <Report color="secondary" />}
                                    </InputAdornment>
                                )
                            }}
                            helperText={error ? "Insira uma quantidade válida." : ""}

                        />
                    </div>

                </div>

            <div className="RightButtons">
                <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={() => HandleAumentarQtde()}>Adicionar</Button>
            </div>       
            
        </Paper>       
        
    )
}

export default ProdsModal;