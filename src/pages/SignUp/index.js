import React, { useState, useEffect } from "react";
import { PageArea } from "./styled";
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";
import useApi from '../../helpers/OlxAPI';
import { doLogin } from "../../helpers/AuthHandler";

const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [stateList, setStateList] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const list = await api.getState();
            setStateList(list);
        }
        getStates();
    }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        if(password!==confirmPass){
            setError("Senhas não coincidem");
            setDisabled(false);
            return;
        }

        const json = await api.register(
            name, 
            stateLoc,
            email, 
            password
        );
        
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, false);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>

                    <label className="area">
                        <div className="area--title">
                            Estado
                        </div>
                        <div className="area--input">
                            <input 
                                type="texto" 
                                disabled={disabled} 
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}
                                required/>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">
                            Estado
                        </div>
                        <div className="area--input">
                            <select
                                disabled={disabled} 
                                value={stateLoc} 
                                onChange={(e)=>setStateLoc(e.target.value)}
                                required>
                                <option>Selecione...</option>
                                {stateList.map((state, index)=>(
                                    <option key={index} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">
                            E-mail
                        </div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled} 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                required/>
                        </div>
                    </label>
                    
                    <label className="area">
                        <div className="area--title">
                            Senha
                        </div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                required/>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">
                            Confirmar Senha
                        </div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled} 
                                value={confirmPass} 
                                onChange={(e)=>setConfirmPass(e.target.value)}
                                required/>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page