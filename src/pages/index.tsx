import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import { FormWrapper } from "../components/Form";
import { Loading } from "../components/Loading";
import MainGrid from "../components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";
import { ProfileSideBar } from '../components/ProfileSideBar';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../lib/AlurakutCommons";

interface IComunidade {
  id: string
  title: string;
  imageurl: string;
  creatorSlug: string;
}

export default function Home() {

  const githubUser = "mateushenrique-dev";
  const [pessoasFavoritas, setPessoasFavoritas] = useState([
    {
      id: "0",
      title: "mateushenrique-dev",
      imageurl: `https://github.com/mateushenrique-dev.png`,
    },
  ]);
  const [comunidades, setComunidades] = useState([] as IComunidade[]);
  const [isLoadingHidden, setIsLoadingHidden] = useState(false);

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
        setIsLoadingHidden(true)
      });
  }, []);

  return (
    <>
      <Loading hidden={isLoadingHidden} />
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
            <FormWrapper comunidades={comunidades} setComunidades={setComunidades} githubUser={githubUser}  />
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
