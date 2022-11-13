import styled from 'styled-components'

export const PageArea = styled.div`
    .account {
        background-color: #FFF;
        border-radius: 5px;
        padding: 10px 30px;
        box-shadow: 0px 0px 3px #999;
        margin-bottom: 20px;

        .account--data{
            margin-top: 20px;
        }

        .account--button button {
            background-color: #0089FF;
            border: 0;
            outline: 0;
            padding: 5px 10px;
            border-radius: 4px;
            color: #FFF;
            font-size: 15px;
            cursor: pointer;

            &:hover {
                background-color: #006FCE;
            }
        }
       
    }

    .list-title{
        margin-bottom: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .adItem {
            width: 25%;
        }
    }

    form{
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
        margin-bottom: 20px;

        .area{
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;

            .area--title{
                width: 130px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }

            .area--input{
                flex: 1;

                input{
                    width: 100%;
                    font-size: 16px;
                    padding: 5px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    outline: none;

                    &:focus{
                        border: 1px solid #333;
                        color: #333;
                    }
                }

                button{
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 15px;
                    cursor: pointer;

                    &:hover{
                        background-color: #006FCE;
                    }
                }
            }
        }
    }
`;


export const Item = styled.div`
    a {
        display: block;
        border: 1px solid #ccc;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        background-color: #fff;
        transition: all ease 0.2s;

        &:hover {
            background-color: #d9ffcc;
            border: 1px solid #b3ff99;
        }

        .itemImage {
            width:  100%;
            border-radius: 5px;

            img{
                width: 260px;
            }
        }

        .itemName {
            font-weight: bold;
            margin-top: 5px;
        }
    }
`