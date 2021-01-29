import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import {TextField, Typography, Button, Paper, InputAdornment, Input} from '@material-ui/core';
import {Lock, Person, ArrowForward, Report} from '@material-ui/icons';


import './styles.css'

import productIteration from '../../assets/Logistics.png';

function Login(){

    const [LOGIN, setLogin] = useState('');
    const [SENHA, setSenha] = useState('');
    const [error, setError] = useState([]);

    const history = useHistory();

    async function handleLogin(){

        let erros = [false, false];

        if(!LOGIN){
            erros[0] = true;
        }
        if(!SENHA){
            erros[1] = true;
        }

        setError(erros)

        if(LOGIN && SENHA){
            const data = {
                LOGIN,
                SENHA
            }

            api.post('usuario/auth', data)
            .then(resp => {
                if (resp) {
                    sessionStorage.setItem('Login', resp.data.LOGIN);
                    sessionStorage.setItem('CPF', resp.data.CPF);
                    sessionStorage.setItem('COD_EMPRESA', resp.data.COD_EMPRESA);
                    history.replace('/empresa');
                    console.log(resp.data);
                } else {
                    alert(resp)
                    console.log(resp);
                }
            })
            .catch(error => {
                alert('Usuário ou senha inválido!')
                console.log(error)
            });
        }
        
        
    }

    return (
        <div className="windowArea">
        <Paper elevation={3} className="Container">

            <div className="ContainerForm">            
                <h1 style={{display: 'flex' , justifyContent: 'center'}} >Estoque Virtual</h1>
                
                <div className="Input">
                    <TextField 
                        fullWidth={true}
                        label="Login"  
                        onChange={e=>{setLogin(e.target.value)}} 
                        error={error[0]}
                        helperText={error[0] ? "Insira um login válido!" : ""}

                        InputProps={{
                            startAdornment:(
                                <InputAdornment>
                                    {!error[0] ? <Person /> : <Report color="secondary" />}                               
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                        
                <div className="Input">
                    <TextField 
                        fullWidth={true}
                        type='password'
                        label="Senha"  
                        onChange={e=>{setSenha(e.target.value)}} 
                        error={error[1]}
                        helperText={error[1] ? "Insira uma senha válida!" : ""}


                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    {!error[1] ? <Lock /> : <Report color="secondary" />}     
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                
                <div style={{marginTop: '12px', display: 'flex' , justifyContent: 'flex-end'}}>
                    <Button href="#text-buttons">
                        <Typography variant="caption">Esqueci minha senha</Typography>              
                    </Button>                
                </div>

                <div className="OptionsBar">                       
                        <Button variant="contained" color="primary" onClick={()=>handleLogin()} endIcon={<ArrowForward />} >ENTRAR</Button>  
                </div>

                <div className="ContainerObs">
                    <Typography variant="caption">Não possui conta? <Link to="/register">Cadastre-se Agora</Link>    </Typography>  
                </div>  
            </div>   

            <div className="ImageContainer">
                <img src={productIteration}></img>
            </div> 
        </Paper>
        </div>
    )
}

export default Login;