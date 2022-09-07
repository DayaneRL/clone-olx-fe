import styled from "styled-components";

export const HeaderArea = styled.div`
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .container {
        max-width:1200px;
        margin: 0 auto;
        display: flex;
    }

    a {
        text-decoration: none;
    }

    .logo {
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;
    
        .logo-1, .logo-2, .logo-3{
            font-size: 27px;
            font-weight: bold;
        }

        .logo-1{ color: #F00;}
        .logo-2{ color: #0F0;}
        .logo-3{ color: #00F;}
    }

    nav{
        padding: 10px 0;
    
        ul, li{
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul{
            display: flex;
            align-items: center;
            height: 40px;
        }

        li{
            margin: 0 20px;

            a{
                color: #000;
                font-size: 14px;
                
                &:hover{
                    color: #999;
                }
            
                &.button{
                    background-color: #FF8100;
                    border-radius: 4px;
                    color: #FFF;
                    padding: 5px 10px;
                }

                &.button:hover{
                    background-color: #E57706;
                }
            }
        }
    }
`