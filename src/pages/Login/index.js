import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {TextField, Typography, Button, Paper} from '@material-ui/core';


import './styles.css'

function Login(){

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');


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

            <Link className="back-link" to="/home">
                Voltar
            </Link>
            
            <Button variant="contained" color="primary" >ENTRAR</Button>  

        </Paper>
    )
}

export default Login;