import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import {TextField, Typography, Button, Paper} from '@material-ui/core';


import './styles.css'

function Login(){

    const [LOGIN, setLogin] = useState('');
    const [SENHA, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(){

        const data = {
            LOGIN,
            SENHA
        }

       api.post('usuario/auth', data)
        .then(resp => {
            if (resp) {
                sessionStorage.setItem('COD_EMPRESA', resp.data.COD_EMPRESA);
                history.push('/home');
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

    return (
        <Paper elevation={3} className="ContainerForm">

            <Typography style={{display: 'flex' , justifyContent: 'center'}} variant="h5">Estoque Virtual</Typography>
            
            <TextField 
                label="Login"  
                onChange={e=>{setLogin(e.target.value)}} 
            />

            <TextField 
                type='password'
                label="Senha"  
                onChange={e=>{setSenha(e.target.value)}} 
            />
            
            <div style={{display: 'flex' , justifyContent: 'flex-end'}}>
                <Button href="#text-buttons">
                    <Typography variant="caption">Esqueci minha senha</Typography>                
                </Button>                
            </div>

            <div className="OptionsBar">                       
                    <Button variant="contained" color="primary" onClick={()=>handleLogin()}>ENTRAR</Button>  
            </div>

            <Typography variant="caption">Não possui conta? <Link to="/register">Cadastre-se Agora</Link>    </Typography>           

        </Paper>
    )
}

export default Login;