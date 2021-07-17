import React, { useEffect, useState } from "react";
import nookies from "nookies";
import jwt, { JwtPayload } from "jsonwebtoken";
import Box from "../components/Box";
import { FormWrapper } from "../components/Form";
import { Loading } from "../components/Loading";
import MainGrid from "../components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";
import { ProfileSideBar } from "../components/ProfileSideBar";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../lib/AlurakutCommons";

export interface IComunidade {
  id: string;
  title: string;
  imageurl: string;
  creatorSlug: string;
}

export interface IHomeProps {
  githubUser: string;
}

export interface IPessoasFavoritas {
  id: number;
  title: string;
  imageurl: string;
}

export interface IGithubAPI {
  login: string,
  id: number;
  avatar_url: string;
}

export default function Home({ githubUser }: IHomeProps) {
  const [pessoasFavoritas, setPessoasFavoritas] = useState<IPessoasFavoritas[]>([
    {
      id: 0,
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
        const comunidadesDato = data.data.allCommunities;
        setComunidades(comunidadesDato);
        setIsLoadingHidden(true);
      });
    
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => response.json())
      .then((data: IGithubAPI[]) => {
        let newPessoasFavoritas: IPessoasFavoritas[] = []

        data.forEach((response) => {
          newPessoasFavoritas.push({
            id: response.id,
            title: response.login,
            imageurl: response.avatar_url,
          });
        })

        setPessoasFavoritas(newPessoasFavoritas);
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
            <FormWrapper
              comunidades={comunidades}
              setComunidades={setComunidades}
              githubUser={githubUser}
            />
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

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const response = await fetch("https://alurakut-three.vercel.app//api/auth", {
    headers: {
      Authorization: token,
    },
  });

  const { isAuthenticated } = await response.json();

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  interface IGithubUser {
    githubUser: string;
  }

  const { githubUser }: IGithubUser = jwt.decode(token) as IGithubUser;

  console.log(githubUser, isAuthenticated)

  return {
    props: {
      githubUser,
    },
  };
}
