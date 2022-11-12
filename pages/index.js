import React from "react";
import config from "../config.json";
import styled from "styled-components";
// import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import {videoService} from "../src/services/videoService";

function HomePage(){
    // const estilo = {
    //     display: "flex",
    //     flexDirection: "column",
    //     flex: 1,
    // }
    // const mensagem = "Começando com Next.js"
    // <Menu></Menu>
    // <Header></Header>
    // <TimeLine></TimeLine>

    const service = videoService()

    //ajuda a re-executar as funções
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    // const valorDoFiltro = "Frost";
    // console.log(config.playlist);
    const [playlists, setPlaylists] = React.useState({});
    React.useEffect(() => {
        console.log("usou o effect")
        service.getAllVideos().then((dados) => {
            // console.log(dados)

            const novasPlaylists = {...playlists}
            dados.data.forEach((vide) => {
                //a ? é uma pergunta se tem aquilo, ai se tem, ele faz o push
                if(!novasPlaylists[vide.playlist]){
                    novasPlaylists[vide.playlist] = [];
                }
                novasPlaylists[vide.playlist].push(vide)
            })
            setPlaylists(novasPlaylists)
        });
        
    }, [])


    // const playlists = {
    //     "jogos": [],
    // }    

    return (
        <>
            {/* <CSSReset /> */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlist={playlists}>
                    Conteudo
                </TimeLine>     
            </div>
        </>
    )
}

export default HomePage

// function Menu(){
//     return(
//         <div>
//             Menu
//         </div>
//     )
// }


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`
function Header(){
    return(
        <StyledHeader>
            {/* <img src="banner" /> */}
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.description}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

//o valor do filtro e todos os outros valores da propriedades
function TimeLine({searchValue, ...props}){
    // console.log("dentro do componente ", props)
    const playlistsNames = Object.keys(props.playlist)
    // console.log(`nomes aq ${playlistsNames}`)
    return(
        <StyledTimeline>
            {/* tanto foreach quanto map, são a msm coisa,
             mas o map irá retornar sem nenhum prblema os valores */}
            {playlistsNames.map((playlistsName) => {
                const videos = props.playlist[playlistsName];
                // irá trazer o elemento da chave 'PlaylistsNames'
                // console.log(playlistsName)
                // console.log(videos) 
                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValuesNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValuesNormalized)

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
                // é a msm coisa acima!
                // return videos.map((video) => {
                //     return (
                //         <a href={video.url}>
                //             <img src={video.thumb} />
                //             <span>
                //                 {video.title}
                //             </span>
                //         </a>
                //     )
                // });
            })}
        </StyledTimeline>
    )
}