import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
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
    // console.log(config.playlist);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />
                <Header />
                <TimeLine playlist={config.playlists}>
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
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header(){
    return(
        <StyledHeader>
            {/* <img src="banner" /> */}
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

function TimeLine(props){
    // console.log("dentro do componente ", props.playlist)
    const playlistsNames = Object.keys(props.playlist)
    // console.log(`nomes aq ${playlistsNames}`)
    return(
        <StyledTimeline>
            {/* tanto foreach quanto map, são a msm coisa,
             mas o map irá retornar sem nenhum prblema os valores */}
            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlist[playlistsNames];
                // irá trazer o elemento da chave 'PlaylistsNames'
                // console.log(playlistsNames)
                // console.log(videos)                
                return (
                    <section>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
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