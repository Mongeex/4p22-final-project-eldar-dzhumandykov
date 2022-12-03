import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
        speed={2}
        width={220}
        height={625}
        viewBox="0 0 220 625"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
    <rect x="208" y="225" rx="0" ry="0" width="4" height="2" /> 
    <rect x="0" y="15" rx="15" ry="15" width="158" height="406" /> 
    <rect x="0" y="438" rx="12" ry="12" width="160" height="70" /> 
    <rect x="0" y="535" rx="10" ry="10" width="50" height="35" /> 
    <rect x="127" y="535" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <div>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? './img/liked.svg' : './img/unliked.svg'} alt="Удалить из избранного" />
            </div>
          )}
          <img width={'160px'}  src={imageUrl} alt="Гитара" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>£{price}</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'}
                alt="Добавить в корзину"
              />
            )}
          </div>
          </div>
      )}
    </div>
  );
}

export default Card;