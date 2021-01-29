import React, {useState, useEffect} from 'react';
import {Paper, Typography, TextField, Button, InputAdornment} from '@material-ui/core';
import { Info, Assignment, AspectRatio, Beenhere, Report } from '@material-ui/icons';

import api from '../../services/api';

function CreateData(props){
   
    const [DESCR, setDescr] = useState('');
    const [REF, setRef] = useState('');
    const [MARCA, setMarca] = useState('');
    const [MED, setMed] = useState('');
    const [error, setError] = useState([]);

    async function HandleEditar(){
        let errors = [false, false, false, false]
        if(!DESCR){
            errors[0] = true;
        } 

        if(!REF){
            errors[1] = true;
        } 

        if(!MARCA){
            errors[2] = true;
        } 

        if(!MED){
            errors[3] = true;
            
        } 
        setError(errors)
        
        if(DESCR && REF && MARCA && MED){
            setError(false);

            const data = {
                COD_PRODUTO: props.data.COD_PRODUTO,
                DESCR,
                REF,
                MARCA,
                IMG: 'A',
                MED
            }

            api.put('produto', data, {
                headers: {
                    COD_EMPRESA: sessionStorage.getItem('COD_EMPRESA')
                }

            });
            
            props.setModal(false);
            window.location.reload();
        }

    }

    useEffect(()=> {
        setDescr(props.data.DESCR);
        setRef(props.data.REF);
        setMarca(props.data.MARCA);
        setMed(props.data.MED);
    },[])

    return (
        <Paper className="ModalInputs">

            <Typography style={{display: 'flex' , justifyContent: 'center'}} variant="h5">EDITAR PRODUTO</Typography>
  
                <div className="IncreaseInputs">
                    <div className="InputGroup">
                        <div className="Input">
                            <TextField
                                error={error[0]}
                                fullWidth={true}
                                label="Descrição" 
                                value={DESCR} onChange={e => setDescr(e.target.value)}
                                helperText={error[0] ? "Insira uma descrição válida." : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            {error[0] ? <Report color="secondary" /> : <Info /> }
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <div className="Input">
                            <TextField 
                                error={error[1]}
                                fullWidth={true}
                                label="Referência" 
                                value={REF} onChange={e => setRef(e.target.value)}
                                helperText={error[1] ? "Insira uma referência válida." : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            {error[1] ? <Report color="secondary" /> : <Assignment />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div className="InputGroup">
                        <div className="Input">
                            <TextField 
                                error={error[2]}
                                fullWidth={true}
                                label="Marca" 
                                value={MARCA} onChange={e => setMarca(e.target.value)}
                                helperText={error[2] ? "Insira uma marca válida." : ""}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment>
                                            {error[2] ? <Report color="secondary" /> : <Beenhere />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <div className="Input">
                            <TextField 
                                error={error[3]}
                                fullWidth={true}
                                label="Medidas" 
                                value={MED} onChange={e => setMed(e.target.value)}
                                helperText={error[3] ? "Insira uma medida válida." : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            {error[3] ? <Report color="secondary" /> : <AspectRatio />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>     
                </div>

            <div className="RightButtons">
                <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={() => HandleEditar()}>Confirmar Alterações</Button>
            </div>              
            
        </Paper>
        
    )
}

export default CreateData;