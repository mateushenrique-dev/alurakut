import React, { useState } from "react";
import styled from "styled-components";

interface IForm {
  githubUser: string;
  comunidades: IComunidade[];
  setComunidades: any;
}

interface IComunidade {
  id: string;
  title: string;
  imageurl: string;
  creatorSlug: string;
}

interface Errors {
  [key: string]: { error: boolean; message: string };
}

const Form = styled.form`
  .error {
    border: 2px solid rgba(255, 0, 80);

    ::placeholder {
      color: rgba(255, 0, 80);
    }
  }
`;

export function FormWrapper({ githubUser, comunidades, setComunidades }: IForm) {

  
  const [errors, setErrors] = useState<Errors>({
    title: { error: false, message: "" },
    image: { error: false, message: "" },
  });

  function validate(e: React.ChangeEvent<HTMLInputElement>) {
    const formField = e.target;

    if (!formField.value) {
      let novoErro = { ...errors, [formField.name]: { error: true, message: "Preencha este campo!" } }
      setErrors(novoErro);
    } else {
      let novoErro = { ...errors, [formField.name]: { error: false, message: "" } }
      setErrors(novoErro);
    }
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        const dadosForm = new FormData(e.target as HTMLFormElement);

        const comunidadeDados = {
          title: dadosForm.get("title").toString(),
          imageurl: dadosForm.get("image").toString(),
          creatorSlug: githubUser,
        };

        const comunidadesAtualizada = [...comunidades, comunidadeDados];
        setComunidades(comunidadesAtualizada);

        await fetch("/api/comunidades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comunidadeDados),
        });
      }}
    >
      <div>
        <input
          type="text"
          placeholder={
            errors.title.error
              ? `${errors.title.message}`
              : "Qual vai ser o nome da sua comunidade?"
          }
          name="title"
          aria-label="Qual vai ser o nome da sua comunidade?"
          onBlur={(e) => validate(e)}
          className={errors.title.error ? "error" : ""}
          required
        />
      </div>

      <div>
        <input
          type="url"
          placeholder={
            errors.image.error
              ? `${errors.image.message}`
              : "Coloque uma URL para usarmos de capa"
          }
          name="image"
          aria-label="Coloque uma URL para usarmos de capa"
          className={errors.image.error ? "error" : ""}
          onBlur={(e) => validate(e)}
          required
        />
      </div>

      <button disabled={errors.title.error || errors.image.error}>
        Criar comunidade
      </button>
    </Form>
  );
}
