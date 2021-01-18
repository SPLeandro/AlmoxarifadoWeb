import React, {useState, useEffect} from 'react';

import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, Avatar} from '@material-ui/core';
import {Edit, ArrowUpward, ArrowDownward} from '@material-ui/icons';

import Modal from '../Modal/';


import api from '../../services/api';

import './styles.css'


function Home(){

    const [prods, setProds] = useState([
        {
            urlimg: 'data:image/jpeg;base64,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',
            id: '12836',
            desc: 'Lapis',
            ref: '',
            marca : 'FaberCastel',
            Medidas : [10, 15, 20],
            qtd : 25,
        },
    
        {
            urlimg: 'https://cdn.iset.io/assets/48768/produtos/287/bicazfina.jpg',
            id : '7124',
            desc : 'Caneta',
            ref : '',
            marca : 'Bic',
            Medidas : [4, 3, 12],
            qtd : 12,
        },

        {
            urlimg: 'data:image/jpeg;base64,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',
            id: '12836',
            desc: 'Lapis',
            ref: '',
            marca : 'FaberCastel',
            Medidas : [10, 15, 20],
            qtd : 25,
        },
        
        {
            urlimg: 'https://cdn.iset.io/assets/48768/produtos/287/bicazfina.jpg',
            id : '7124',
            desc : 'Caneta',
            ref : '',
            marca : 'Bic',
            Medidas : [4, 3, 12],
            qtd : 12,
        },
    
    ]);

    const [showModal, setModal] = useState(false);
    const [data, setData] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        async function loadProdutos(){

            const COD_EMPRESA = sessionStorage.getItem('COD_EMPRESA');

            const produtos = await api.get('produto',{
                headers: {
                    COD_EMPRESA: COD_EMPRESA
                }
            });
            setProds(produtos.data);
        }

        loadProdutos();
        

    },[])

    function openModal(e, reason){
        
        const emptyData = {        
            IMG: '',
            COD_PRODUTO : '',
            DESCR : '',
            REF : '',
            MARCA : '',
            MED : '',
            QTDE : '',
            reason: 'cadastrar',
        }

        if(reason == 'cadastrar'){
            setData(emptyData);             
        }
        if(reason == 'adicionar') {
            e.reason = 'adicionar';
            setData(e);
        }
        if(reason == 'subtrair') {
            e.reason = 'subtrair';
            setData(e);
        } 
        if(reason == 'editar') {
            e.reason = 'editar';
            setData(e);
        }

        setModal(true);
        
    }

    async function HandleSearch(){
        const COD_EMPRESA = sessionStorage.getItem('COD_EMPRESA');
        const response = await api.get(`/produto/${searchValue}`, {
            headers: {
                COD_EMPRESA: COD_EMPRESA
            }
        });
        setProds(response.data);
    }

    return (

        <div className="Content">

            <div className="SearchBar">
                <input type="text" placeholder="Insira a DESCRICAO do produto a ser pesquisado" value={searchValue} onChange={e=>setSearchValue(e.target.value)} />
                <Button variant="contained" color="primary" onClick={e=>HandleSearch(e.target.value)} >Pesquisar</Button>
            </div>

                    
            <TableContainer  component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>COD</TableCell>
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
                                <TableCell>{<Avatar alt={i.DESCR} src={i.IMG} />}</TableCell>
                                <TableCell>{i.COD_PRODUTO}</TableCell>
                                <TableCell>{i.DESCR}</TableCell>
                                <TableCell>{i.REF}</TableCell>
                                <TableCell>{i.MARCA}</TableCell>
                                <TableCell>{i.MED}</TableCell>
                                <TableCell>{i.QTD}</TableCell>
                                <TableCell>

                                    <IconButton onClick={() => openModal(i, 'adicionar')}
                                        style={{ color: '#00cc00' }} aria-label="ArrowUpward">
                                        <ArrowUpward />
                                    </IconButton>

                                    <IconButton onClick={() => openModal(i, 'subtrair')}
                                        style={{ color: '#b53737' }} aria-label="ArrowDownwardIcon">
                                        <ArrowDownward />
                                    </IconButton>


                                    <IconButton onClick={() => openModal(i,'editar')}
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
                <Button className="buttonaa" variant="contained" color="primary" onClick={()=> openModal({}, 'cadastrar')} >CADASTRAR PRODUTO</Button>
            </div>

            <Modal showModal={showModal} setModal={setModal} data={data} setProds={setProds}/>
        </div>


    )
}

export default Home;