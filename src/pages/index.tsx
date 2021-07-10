import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import MainGrid from "../components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../lib/AlurakutCommons";

interface IProfileSideBarProps {
  user: string;
}

function ProfileSideBar({ user }: IProfileSideBarProps) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${user}.png`}
        alt="Profile Picture"
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "mateushenrique-dev";
  const [pessoasFavoritas, setPessoasFavoritas] = useState([
    {
      id: "0",
      title: "juunegreiros",
      imageurl: `https://github.com/juunegreiros.png`,
    },
  ]);

  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "069e791e2609475d4d74dad9dabe2c",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
            allCommunities {
              id,
              title,
              imageurl,
              creatorSlug
            }
          }`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const comunidadesDato = data.data.allCommunities;
        setComunidades(comunidadesDato);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar user={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const dadosForm = new FormData(e.target as HTMLFormElement);

                const comunidadeDados = {
                  title: dadosForm.get("title").toString(),
                  imageurl: dadosForm.get("image").toString(),
                  creatorSlug: githubUser,
                };

                await fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidadeDados),
                });

                const comunidadesAtualizada = [...comunidades, comunidadeDados];
                setComunidades(comunidadesAtualizada);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  type="urç"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper
            title="Comunidades"
            content={comunidades}
          />
          <ProfileRelationsBoxWrapper
            title="Pessoas da Comunidade"
            content={pessoasFavoritas}
          />
        </div>
      </MainGrid>
    </>
  );
}
