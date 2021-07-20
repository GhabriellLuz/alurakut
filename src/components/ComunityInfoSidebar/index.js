import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

export function ComunityInfoSidebar(props) {
  const collection = props.collection;
  let key, url, imgSrc, title;
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({collection.length})
      </h2>
      <ul>
        {collection.slice(0, 6).map((itemAtual) => {
          if (typeof itemAtual == 'string') {
            key = itemAtual;
            url = `https://github.com/${itemAtual}`;
            imgSrc = `https://github.com/${itemAtual}.png`;
            title = itemAtual;
          } else {
            key = itemAtual.id;
            url = itemAtual.login
              ? `https://github.com/${itemAtual.login}`
              : itemAtual.imageUrl;
            imgSrc = itemAtual.login
              ? `https://github.com/${itemAtual.login}.png`
              : itemAtual.imageUrl;
            title = itemAtual.login ? itemAtual.login : itemAtual.title;
          }
          return (
            <li key={key}>
              <a href={url} target="_blank">
                <img src={imgSrc} />
                <span>{title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
