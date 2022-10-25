import 
    React, 
    { 
        useState, 
        useEffect 
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

const Page = () => {
    const api = useApi();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        
        
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
            <PageTitle TextAlign={'center'} Margin={10 + 'px ' + 0}>
                Postar um anuncio
            </PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            Título
                        </div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={title}
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
                                disabled={disabled} 
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                {categories && categories.map( category =>
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
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
                                value={price}
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
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
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
                                value={desciption}
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
                            <button disabled={disabled} >Adicionar Anuncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page;