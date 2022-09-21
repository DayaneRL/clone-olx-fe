import React, { useState } from "react";
import { PageArea } from "./styled";
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";
import useApi from '../../helpers/OlxAPI';
import { doLogin } from "../../helpers/AuthHandler";

const Page = () => {
    const api = useApi();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPass, setRememberPass] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        const json = await api.login(email, password);
        
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPass);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            E-mail
                        </div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                name="email" 
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
                                name="password" 
                                disabled={disabled} 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                required/>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">
                            Lembrar Senha
                        </div>
                        <div className="area--input remember">
                            <input 
                                type="checkbox" 
                                name="lembrar" 
                                disabled={disabled} 
                                value={rememberPass} 
                                onChange={()=>setRememberPass(!rememberPass)}
                                />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Fazer login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page