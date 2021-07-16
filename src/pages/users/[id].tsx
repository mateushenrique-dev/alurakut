import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "../../components/Box";
import { IPessoasFavoritas, IGithubAPI } from "../index";
import { ProfileRelationsBoxWrapper } from "../../components/ProfileRelations";
import { AlurakutMenu } from "../../lib/AlurakutCommons";
import { Loading } from "../../components/Loading";
import { Profile } from "../../components/Profile";

interface IUserInfos {
  login: string;
  id: string;
  bio: string;
  name: string;
  blog: string;
  followers: number | string;
  following: number | string;
  html_url: string;
}

export default function Perfil() {
  const router = useRouter();
  const githubUser = router.query.id;

  const Main = styled.main`
    @media (min-width: 861px) {
      max-width: 1100px;
      margin: 42px auto;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 10px;
    }
  `;

  const [pessoasFavoritas, setPessoasFavoritas] = useState<IPessoasFavoritas[]>([]);
  const [userInfos, setUserInfos] = useState<IUserInfos>({
    login: "",
    id: "",
    bio: "",
    name: "",
    blog: "",
    followers: 0,
    following: 0,
    html_url: "",
  });
  const [isLoadingHidden, setIsLoadingHidden] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => response.json())
      .then((data: IGithubAPI[]) => {
        let newPessoasFavoritas: IPessoasFavoritas[] = [];

        data.forEach((response) => {
          newPessoasFavoritas.push({
            id: response.id,
            title: response.login,
            imageurl: response.avatar_url,
          });
        });

        setPessoasFavoritas(newPessoasFavoritas);
      });
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfos(data);
        setIsLoadingHidden(true);
      });
  }, [githubUser]);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <Loading hidden={isLoadingHidden} />
      <Main>
        <Profile>
          <img
            src={`https://github.com/${githubUser}.png`}
            style={{ width: "100px" }}
            className="profileImage"
            alt="Github Profile Picture"
          />
          <h1 className="profileTitle">
            <a target="_blank" className="BoxLink" href={userInfos.html_url}>
              {githubUser}
            </a>
          </h1>
          <p className="profileBio">{userInfos.bio}</p>
          <span className="profileFollowers">
            Followers: {userInfos.followers}
            <br />
            Following: {userInfos.following}
          </span>
          <span className="profileBlog">
            Blog:{" "}
            <a target="_blank" href={userInfos.blog}>
              {userInfos.blog ? userInfos.blog : "Não possui"}
            </a>
          </span>
        </Profile>
        <ProfileRelationsBoxWrapper
          title="Pessoas da Comunidade"
          content={pessoasFavoritas}
        />
      </Main>
    </>
  );
}