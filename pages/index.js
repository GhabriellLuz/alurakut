import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import { ComunityInfoSidebar } from '../src/components/ComunityInfoSidebar';

const ProfileSidebar = (props) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default function Home() {
  const githubUser = 'GhabriellLuz';
  const [comunidades, setComunidades] = useState([
    {
      id: new Date().toISOString,
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
  ]);
  const pessoasFavoritas = [
    'gustavoguanabara',
    'filipedeschamps',
    'rafaballerini',
    'juunegreiros',
    'omariosouto',
    'peas',
  ];

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((resposta) => {
        return resposta.json();
      })
      .then((respostaCompleta) => {
        setSeguidores(respostaCompleta);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo, {githubUser}!</h1>

            <OrkutNostalgicIconSet confiavel={2} legal={1} sexy={3} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const dadosDoForm = new FormData(event.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                };

                setComunidades([...comunidades, comunidade]);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  required
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ComunityInfoSidebar title="Seguidores" collection={seguidores} />
          <ComunityInfoSidebar title="Comunidades" collection={comunidades} />
          <ComunityInfoSidebar
            title="Pessoas da comunidade"
            collection={pessoasFavoritas}
          />
        </div>
      </MainGrid>
    </>
  );
}
