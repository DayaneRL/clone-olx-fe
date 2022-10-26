import React, {useState, useEffect} from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { PageArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';
import './styled';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : "");
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : "");
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : "");

    useEffect(()=> {
        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cat=${cat}`);
        }
        if(state){
            queryString.push(`state=${state}`);
        }
        history.replace({
            search: `?${queryString.join('&')}`
        });
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    },[q, cat, state]);

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [currenctPage, setCurrentPage] = useState(1);
    const [resultOpacity, setResultOpacity] = useState(1);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [warningMessage, setWarningMessage] = useState('Carregando...');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(0);
    
    useEffect(()=> {
        const getState = async () => {
            const sList = await api.getState();
            setStateList(sList);
        }
        getState();

        const getCategories = async () => {
            const catList = await api.getCategories();
            setCategories(catList);
        }
        getCategories();
    },[]);

    const getAdsList = async () => {
        setLoading(true);
        let offset = 0;
        offset = (currenctPage - 1) * 9;
    }

    return (
        <div>

            <PageContainer>
                <PageArea>
                    <div className="leftSide">
                        <form method="GET">
                            <input type="text" name="q"
                                placeholder="O que voçê procura?"
                                value={q} onChange={(e) => setQ(e.target.value)}
                            />
                            <div className="filterName">Estado:</div>
                            <select name="state"
                                value={state} onChange={(e) => setState(e.target.value)}>
                                <option value=""></option>
                                {stateList.map((state, index)=> 
                                    <option key={index} value={state.id}>
                                        {state.name}
                                    </option>
                                )}
                            </select>
                            <div className="filterName">Categoria:</div>
                            <ul>
                                {categories.map((category,index) => 
                                    <li key={index} className={cat===category.slug ? 'categoryItem active':'categoryItem'}
                                        onClick={()=>setCat(category.slug)}
                                    >
                                        <img src={category.img} alt=''/>
                                        <span>{category.name}</span>   
                                    </li>
                                )}
                            </ul>
                        </form>
                    </div>
                    <div className="rightSide">
                        <h2>Resultados</h2>
                        {loading && adList.length === 0 &&
                            <div className="ListWarning">
                                Carregando...
                            </div>
                        }
                        {!loading && adList.length === 0 &&
                            <div className="ListWarning">
                                Nenhum resultado encontrado :(
                            </div>
                        }
                        <div className="list" style={{opacity:resultOpacity}}>
                            {adList.map((ad, index) =>
                                <AdItem key={index} data={ad} />
                            )}
                        </div>
                        <div className="pagination">
                            {pagination.map((pg, index) =>
                                <div onClick={()=> setCurrentPage(pg)} className={pg===currenctPage ? 'pagItem active' : 'pagItem'}>
                                    {pg}
                                </div>
                            )}
                        </div>
                    </div>
                </PageArea>
            </PageContainer>
        </div>
    )
}
export default Page