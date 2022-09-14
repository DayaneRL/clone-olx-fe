import React from "react";
import { Link } from "react-router-dom";
import {NotFoundArea} from './styled'
import { PageContainer, PageTitle } from "../../components/MainComponents";

const Page = () => {
    return (
        <NotFoundArea>
           <PageContainer>
                <div className="conteudo">
                        <PageTitle>Página não encontrada</PageTitle>
                        <div className="botao">
                            <Link to="/">Voltar para a Home</Link>
                        </div>
                </div>
           </PageContainer>
        </NotFoundArea>
    )
}
export default Page