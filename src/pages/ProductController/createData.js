import React, {useState, useEffect} from 'react';
import {Paper, TextField, Button, InputAdornment} from '@material-ui/core';
import {Info, Assignment, Beenhere, AspectRatio, Report} from '@material-ui/icons';

import api from '../../services/api';

function CreateData(props){
   
    const [DESCR, setDescr] = useState('');
    const [REF, setRef] = useState('');
    const [MARCA, setMarca] = useState('');
    const [MED, setMed] = useState('');
    const [error, setError] = useState([]);

    async function HandleCadastrar(){
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
            console.log(`Cadastrou`);
            setError(false);

            const data = {
                DESCR,
                REF,
                MARCA,
                MED
            }

            api.post('produto', data, {
                headers:{
                    COD_EMPRESA: sessionStorage.getItem('COD_EMPRESA'),
                }
            })

            props.setModal(false);
            window.location.reload();
        }

    }

    useEffect(()=> {
        setDescr();
        setRef();
        setMarca();
        setMed();
    },[])

    return (
        <Paper className="ModalInputs">

            <h1 style={{display: 'flex' , justifyContent: 'center'}} >CADASTRAR PRODUTO</h1>
  
                <div className="IncreaseInputs">
                        <div className="Input">
                            <TextField
                                error={error[0]}
                                fullWidth={true}
                                label="Descrição" 
                                value={DESCR} onChange={e => setDescr(e.target.value)}
                                helperText={error[0] ? "Insira uma descrição válida." : ""}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            {error[0] ?  <Report color="secondary" /> : <Info />}
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
                                        <InputAdornment position="start">
                                            {error[1] ? <Report color="secondary" /> : <Assignment />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>


                    <div className="Input">
                        <TextField 
                            error={error[2]}
                            fullWidth={true}
                            label="Marca" 
                            value={MARCA} onChange={e => setMarca(e.target.value)}
                            helperText={error[2] ? "Insira uma marca válida." : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
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
                                    <InputAdornment position="start">
                                        {error[3] ? <Report color="secondary" /> : <AspectRatio />}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
    
                </div>

            <div className="RightButtons">
                <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={() => HandleCadastrar()}>Cadastrar</Button>
            </div>              
            
        </Paper>
        
    )
}

export default CreateData;