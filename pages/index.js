import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";

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

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    // const valorDoFiltro = "Frost";
    // console.log(config.playlist);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlist={config.playlists}>
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
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

//o valor do filtro e todos os outros valores da propriedades
function TimeLine({searchValue, ...props}){
    // console.log("dentro do componente ", props.playlist)
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