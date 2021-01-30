import React, {useEffect, useState} from 'react';

import { Paper, TextField, InputAdornment, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import {Info, Assignment, Person, Business, Beenhere, AspectRatio, UnfoldMore, Report} from '@material-ui/icons';

import api from '../../services/api';

import './styles.css'

function ProdsModal(props) {
    
    const [DESCR, setDescr] = useState('');
    const [REF, setRef] = useState('');
    const [MARCA, setMarca] = useState('');
    const [MED, setMed] = useState('');
    const [qtde, setQtde] = useState();
    const [NOME_REC, setNomeRec] = useState('');
    const [EMPRESA_REC, setEmpresaRec] = useState('');
    const [SETOR_REC, setSetorRec] = useState('');
    const [error, setError] = useState([]);

    async function DiminuirQtde(){
        let erros = [false, false, false, false];

        if(!EMPRESA_REC){
            erros[0] = true;
        }   

        if(!SETOR_REC){
            erros[1] = true;
        }
        if(!NOME_REC){
            erros[2] = true;
        }

        if(!qtde){
            erros[3] = true;
        } 

        setError(erros);

        if(EMPRESA_REC && SETOR_REC && NOME_REC && qtde){

            console.log(`Diminuiu ${qtde}`);
            setError(false);

            const data = {  
                CPF: sessionStorage.getItem('CPF'),
                COD_PRODUTO : props.data.COD_PRODUTO,
                NOME_REC,
                EMPRESA_REC,
                SETOR_REC,
                QTD: qtde,
            }

            console.log(data);

            
            const res = await api.post('retirada', data, {
                headers :{
                    COD_EMPRESA: sessionStorage.getItem('COD_EMPRESA')
                }
            });

            console.log(res);
        

            //alert(`Tem certeza que deseja reduzir ${qtde}?`)
            props.setModal(false);
            //window.location.reload();
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

            <h1 style={{display: 'flex' , justifyContent: 'center'}} >REDUZIR QUANTIDADE</h1>
  
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

                    <div className="InputGroup" >
                    <div className="Input">
                        <FormControl required fullWidth={true}>
                            <InputLabel error={error[0]} >EMPRESA DO RECEBEDOR</InputLabel>
                            <Select
                            error={error[0]}
                            value={EMPRESA_REC}
                            onChange={e => setEmpresaRec(e.target.value)} >
                                <MenuItem value={1} >TERLOC</MenuItem>
                                <MenuItem value={2}>DEPOTCE</MenuItem>
                                <MenuItem value={3}>CEFERTIL</MenuItem>
                                <MenuItem value={4}>CESLOG</MenuItem>
                                <MenuItem value={5}>CEPARKING</MenuItem>
                                <MenuItem value={6}>PARQUE RAIZ DA SERRA</MenuItem>
                            </Select>
                            <FormHelperText error={error[0]} >{error[0] ? "Selecione uma empresa" : ""} </FormHelperText>
                        </FormControl>
                    </div>
                        <div className="Input">
                            <TextField
                                fullWidth={true}
                                error={error[1]}
                                label="SETOR DO RECEBEDOR"
                                value={SETOR_REC} onChange={e => setSetorRec(e.target.value)}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment>
                                            {error[1] ? <Report color="secondary" /> : <Business /> }
                                        </InputAdornment>
                                    )
                                }}
                                helperText={error[1] ? "Insira um SETOR válido" : ""}                   
                            />
                        </div>
                    </div>

                    <div className="InputGroup">
                        <div className="Input">
                            <TextField
                                fullWidth={true}
                                error={error[2]}
                                label="NOME DO RECEBEDOR"
                                value={NOME_REC} onChange={e => setNomeRec(e.target.value)}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment>
                                            {error[2] ? <Report color="secondary" /> : <Person />}
                                        </InputAdornment>
                                    )
                                }}
                                helperText={error[2] ? "Insira um NOME válido" : ""}
                            />
                        </div>

                        <div className="Input">
                            <TextField 
                                fullWidth={true}
                                error={error[3]}
                                label="Quantidade" 
                                value={qtde} onChange={e => setQtde(e.target.value)}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment>
                                            {error[3] ? <Report color="secondary" /> : <UnfoldMore />}
                                        </InputAdornment>
                                    )
                                }}
                                helperText={error[3] ? "Insira uma quantidade válida." : ""}

                            />
                        </div>
                    </div>

                </div>

            <div className="RightButtons">
                <Button variant="contained" onClick={() => props.setModal(false)}>Cancelar</Button>
                <Button variant="contained" color="secondary" onClick={() => DiminuirQtde()}>Reduzir</Button>
            </div>       
            
        </Paper>       
        
    )
}

export default ProdsModal;