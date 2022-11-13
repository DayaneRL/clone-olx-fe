import 
    React, 
    { 
        useState, 
        useEffect, 
        useRef
    } from 'react';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';
import { PageArea } from './styled';
import { 
    PageContainer, 
    PageTitle, 
    ErrorMessage 
} from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import { useHistory, useParams } from 'react-router-dom';

const Page = () => {
    const api = useApi();
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const fileField = useRef(null);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [api]);

    useEffect(()=>{
        const getAdInfo = async (id) => {
            const json = await api.getAd(id);
            setTitle(json.title);
            setCategory(json.category.id.toString());
            setPrice(json.price);
            setPriceNegotiable(json.priceNegotiable);
            setDescription(json.description);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];
        if(!title.trim()) {
            errors.push("O título é obrigatório");
        }
        if(!category.trim()) {
            errors.push("É obrigatório escolher uma categoria");
        }
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append("title", title);
            fData.append("price", price);
            fData.append('priceneg', priceNegotiable);
            fData.append("desc", description);
            fData.append("cat", category);
            if(fileField.current.files.length > 0) {
                for(let i = 0; i < fileField.current.files.length; i++) {
                    fData.append("img", fileField.current.files[i]);
                }
            }

            const response = await api.updateAd(id, fData);
            if(!response.error) {
                history.push(`/ad/${response.id}`);
            } else {
                setError(response.error);
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        descimalSymbol: ','
    });

    return (
        <PageContainer>
            <PageTitle Margin={10 + 'px ' + 0}>
                Alterar um Anúncio
            </PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                {!loading && (
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            Título
                        </div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                defaultValue={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Categoria
                        </div>
                        <div className="area--input">
                            <select 
                                disabled={disabled} defaultValue={category}
                                onChange={(e) => console.log(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                {categories && categories.map( category =>
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço
                        </div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                defaultValue={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço Negociável
                        </div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disabled} 
                                checked={priceNegotiable}
                                onChange={() => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Descrição
                        </div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                defaultValue={description}
                                onChange={e => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Imagens (1 ou mais)
                        </div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Alterar Anúncio</button>
                        </div>
                    </label>
                </form>
                )}
            </PageArea>
        </PageContainer>
    )
}

export default Page;