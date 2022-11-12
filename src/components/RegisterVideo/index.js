import React from "react";
import { StyledRegisterVideo } from "./styles";
import {createClient} from '@supabase/supabase-js'

//custom Hook
function useForm(propsDoForm){
    
    const [values, setValues] = React.useState(propsDoForm.initialValues)
        
    return {
        values,
        handleChange: (evento) => {
            const val = evento.target.value;
            const name = evento.target.name
            // console.log(val)
            setValues({
                ...values,
                [name]: val,
            })
        },
        clearForm(){
            setValues({});
        }
    };
}

const PROJECT_URL = "https://xfnzbgbpzfxxhagmqpwl.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbnpiZ2JwemZ4eGhhZ21xcHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODM3MjYsImV4cCI6MTk4Mzg1OTcyNn0.R4EtaMWmeJ8gbP1FVaN59ApYD85YuVel0aEgvUGcT9g"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

//thumbnail de um video pelo seu id
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "titulo test", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(true) //false

    console.log()
    //botão de evento p chamar essa function
    //modal q tem o form

    //pegar valores dos input e alterar tbm
    // const [values, setValues] = React.useState({titulo: "", url: ""})

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* usa muito Ternário e operadores de Curti-circuito */}
            {/* se o formVisivel é true, então... */}
            {formVisivel 
            ? (
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastro.values)

                    //contrato entre front e back
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    }).then((oqveio) => {
                        console.log(oqveio)
                    }).catch((err) => {
                        console.log(err)
                    })

                    setFormVisivel(false);
                    formCadastro.clearForm();

                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input 
                            placeholder="Titulo do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} 
                        />

                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange} 
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )
            : false
        }
        </StyledRegisterVideo>
    )
}

