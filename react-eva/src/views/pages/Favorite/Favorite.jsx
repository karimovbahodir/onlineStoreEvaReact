import back from '../../../assets/img/favorite/back.png';
import favorite from '../../../assets/img/favorite/favorite.png';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../App';
import Card from '../../atoms/Card/Card';
import styles from './Favorite.module.scss';
import React from 'react';
import Info from '../../atoms/Info/Info';
import { PageContainer } from '../PageContainer/PageContainer';

function Favorite() {
    
    const {favorites, onAddToFavorites}=React.useContext(AppContext);



    return (
       <PageContainer>
         <div className={styles.favoriteBlock}>
            <Link to="/"><img src={back} alt="back" /></Link>
            <h2>Мои закладки</h2>
        

            {favorites.length > 0 ? <div className={styles.favoriteContent}>
                {favorites.map((item, index) => (
                    <Card key={index} {...item} favorited={true} onFavoraite={(obj) => onAddToFavorites(obj)} />
                ))}
            </div>: <Info title="Добавьте то, что понравилось" description="Вы ничего не добавляли в закладки" infoImg={favorite} />
            }
            
        </div>
       </PageContainer>

    )
}

export default Favorite;