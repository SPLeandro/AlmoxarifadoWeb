import React, {useState} from 'react';

import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button} from '@material-ui/core';
import {Add, Edit} from '@material-ui/icons';

import Modal from '../Modal/';

import './styles.css'

const prods = [
    {
        id: '12836',
        desc: 'Lapis',
        ref: '',
        marca : 'FaberCastel',
        Medidas : [10, 15, 20],
        qtd : 25,
    },

    {

        id : '7124',
        desc : 'Caneta',
        ref : '',
        marca : 'Bic',
        Medidas : [4, 3, 12],
        qtd : 12,
    }

]

function Home(){

    const [showModal, setModal] = useState(false);
    const [data, setData] = useState('');

    function openModal(e){

        if(e == 'new'){
            setData({

                id : '',
                desc : '',
                ref : '',
                marca : '',
                Medidas : '',
                qtd : '',
            });
            
        } else {
            setData(e);
        }

        setModal(true);
        
    }

    return (

        <div className="Content">

            <div className="SearchBar">
                <input type="text" placeholder="Insira o ID do produto" />
                <Button variant="contained" color="primary" >Pesquisar</Button>
            </div>

                    
            <TableContainer  component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Referência</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Medidas</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    
                    </TableHead>
                    <TableBody>
                        {prods.map(i => (
                            <TableRow>
                                <TableCell>{}</TableCell>
                                <TableCell>{i.id}</TableCell>
                                <TableCell>{i.desc}</TableCell>
                                <TableCell>{i.ref}</TableCell>
                                <TableCell>{i.marca}</TableCell>
                                <TableCell>{i.Medidas[0],i.Medidas[1] }</TableCell>
                                <TableCell>{i.qtd}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => openModal(i)}
                                        aria-label="edit">
                                        <Edit />
                                    </IconButton>
                                
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="OptionsBar">
                {showModal == true ? 'a' : 'b'}
                <Button className="buttonaa" variant="contained" color="primary" onClick={()=> openModal('new')} >Cadastrar</Button>
            </div>

            <Modal showModal={showModal} setModal={setModal} data={data}/>
        </div>


    )
}

export default Home;