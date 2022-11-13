import React, { useEffect, useState } from "react";
import { 
    ErrorMessage,
    PageContainer, 
    PageTitle
} from '../../components/MainComponents';
import { PageArea, Item } from './styled';
import useApi from '../../helpers/OlxAPI';
import { Link } from "react-router-dom";

const Page = () => {
  
    const api = useApi();
    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState('view');

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [stateList, setStateList] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');


    useEffect(()=>{

        const getUserAds = async (user) => {
            const json = await api.getAds({
                userId: user.id
            });
            setAdList(json.ads);
        }

        async function loadUser(){
            const json = await api.getUser();
            let user = json.user;
            setName(user.name);
            setStateLoc(user.state);
            setEmail(user.email);

            getUserAds(user);
            setLoading(false);
        }
        loadUser();

    },[api]);

    useEffect(() => {
        const getStates = async () => {
            const list = await api.getState();
            setStateList(list);
        }
        getStates();
    }, [api]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        if(password!==confirmPass){
            setError("Senhas não coincidem");
            setDisabled(false);
            return;
        }

        const json = await api.updateUser(
            name, 
            stateLoc,
            email, 
            password
        );
        
        if(json.error){
            setError(json.error);
        }else{
            window.location.href = '/my-account';
        }
        setDisabled(false);
    }


    return (
        <div>
        <PageContainer>
            <PageTitle TextAlign={'center'} Margin={10 + 'px ' + 0}>
                {action==='view' ?'Minha conta':'Alterar Cadastro'}
            </PageTitle>
            <PageArea>
                {!loading && action==='view' && (
                    <div className="account">
                        <h4>{name}</h4>
                        <div className="account--data">
                            <p><b>Estado:</b> {stateLoc}</p>
                            <p><b>Email:</b> {email}</p>
                        </div>
                        <div className="account--button">
                            <button onClick={()=>setAction('edit')}>Editar dados</button>
                        </div>
                    </div>            
                )}
                {error && 
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                {!loading && action==='edit'&&(
                    
                    <form onSubmit={handleSubmit}>

                        <label className="area">
                            <div className="area--title">
                                Nome Completo
                            </div>
                            <div className="area--input">
                                <input type="text" disabled={disabled} required
                                    value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">
                                Estado
                            </div>
                            <div className="area--input">
                                <select disabled={disabled} required
                                    defaultValue={stateLoc} onChange={(e)=>setStateLoc(e.target.value)}>
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
                                <input type="email" disabled={disabled} required
                                    value={email} onChange={(e)=>setEmail(e.target.value)}
                                    />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">
                                Senha
                            </div>
                            <div className="area--input">
                                <input type="password" disabled={disabled} required
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">
                                Confirmar Senha
                            </div>
                            <div className="area--input">
                                <input type="password" disabled={disabled} required
                                    value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button>Alterar Cadastro</button>
                            </div>
                        </label>
                    </form>
                )}
                
            </PageArea>
        </PageContainer>

            <PageContainer>
                <PageArea>
                    <h3 className="list-title">Meus Recentes</h3>
                    <div className="list">
                        {adList.map((i,k)=>
                            <Item key={k} className="adItem">
                                <Link to={`edit-ad/${i.id}`}>
                                    <div className="itemImage">
                                        <img src={i.image} alt={''} />
                                    </div>
                                    <div className="itemName">{i.title}</div>
                                    <div className="itemPrice">{(i.priceNegotiable)?'Preço Negóciável':`R$ ${i.price}`}</div>
                                </Link>
                            </Item>
                        )}
                    </div>
                </PageArea>
         </PageContainer>
        </div>
    )
}
export default Page