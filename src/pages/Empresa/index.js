import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Paper} from '@material-ui/core';

import './styles.css';

import Cefertil from '../../assets/Cefertil.svg';
import Terloc from '../../assets/Terloc.svg';
import Depotce from '../../assets/Depotce.svg';
import Ceslog from '../../assets/Ceslog.svg';
import Ceparking from '../../assets/Ceparking.svg';
import PRdS from '../../assets/PRdS.svg';

function Empresa (){

    const history = useHistory();

    function HandleSelectEnterprise(value){
        console.log(value);
        sessionStorage.setItem('EMPRESA_SHOW', value);
        history.push('/home');
    }

    
    useEffect(()=>{
        if(!sessionStorage.getItem('Login')){
            history.replace('/');
        }
    });

    // <h1>SELECIONE A EMPRESA QUE DESEJA ACESSAR:</h1>
    

    return (
        <div className="ContainerEmp">

            <div className="ContainerRow">
                <Paper elevation={1} className="CardEmpresa"  onClick={e => HandleSelectEnterprise(1)}>
                    <img src={Terloc} />   
                </Paper>

                <Paper elevation={1} className="CardEmpresa"  onClick={e => HandleSelectEnterprise(2)}>
                    <img src={Depotce} />   
                </Paper>

                <Paper elevation={1} className="CardEmpresa" onClick={e => HandleSelectEnterprise(3)}>
                    <img src={Cefertil} />   
                </Paper>

                
            </div>
            

            <div className="ContainerRow">

                <Paper elevation={1} className="CardEmpresa" onClick={e => HandleSelectEnterprise(4)}>
                    <img src={Ceslog} />   
                </Paper>

                <Paper elevation={1} className="CardEmpresa" onClick={e => HandleSelectEnterprise(5)}>
                    <img src={Ceparking} />   
                </Paper>

                <Paper elevation={1} className="CardEmpresa" onClick={e => HandleSelectEnterprise(6)}>
                    <img src={PRdS} />   
                </Paper>

            </div>
            

        </div>            
    )
}

export default Empresa;