import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {PageArea, SearchArea} from './styled';
import {PageContainer} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxAPI';

const Page = () => {
    const api = useApi();
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

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

        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    },[]);

    return (
        <div>
            {/* <h2>Home</h2> */}
            {/* <Link to='/about'>Sobre</Link> */}
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="query" 
                                placeholder="O que você procura?"/>
                                <select name="state">
                                    {stateList.map((item, key)=>{
                                        <option key={key} value={item.name}>
                                            {item.name}
                                        </option>
                                    })}
                                </select>
                                <button>Presquisar</button>
                        </form>
                    </div>

                    <div className="categoryList">
                        {categories.map((item, key)=>{
                            <Link
                                key={key}
                                to={`/ads?cat=${item.slug}`}
                                className="categoryItem"
                            >
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        })}
                    </div>
                </PageContainer>
            </SearchArea>
            
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k)=>{
                            <AdItem key={k} data={i}/>
                        })}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr/>
                    Lorem Ipsum is simply dummy text of the printing and 
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining 
                    essentially unchanged.
                </PageArea>
            </PageContainer>
        </div>
    )
}
export default Page