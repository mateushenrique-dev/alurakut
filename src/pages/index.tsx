import Box from '../components/Box';
import MainGrid from '../components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons';

interface IProfileSideBarProps {
  user: string
}

function ProfileSideBar({ user }: IProfileSideBarProps) {
  return (
    <Box>
      <img style={{ borderRadius: '8px' }} src={`https://github.com/${user}.png`} alt="Profile Picture" />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'mateushenrique-dev';
  const pessoasFavoritas = [
    'juunegreiros',
    'peas',
    'omariosouto',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar user={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`http://github.com/${pessoa}.png`} alt="" />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Pessoas da Comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  );
}
