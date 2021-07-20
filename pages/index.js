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
  const [comunidades, setComunidades] = useState([]);
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
    // API GraphQL
    fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '79493696e8515d819b96a4af1cc825',
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        setComunidades(respostaCompleta.data.allCommunities);
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
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                };

                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (res) => {
                  const { registroCriado } = await res.json();
                  setComunidades([...comunidades, registroCriado]);
                });
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
