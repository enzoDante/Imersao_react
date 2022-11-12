import React from "react";
import { StyledRegisterVideo } from "./styles";

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

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "titulo test", url: "asdad"}
    });
    const [formVisivel, setFormVisivel] = React.useState(true) //false
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

