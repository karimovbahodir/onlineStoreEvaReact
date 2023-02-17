import React from 'react';
import { AppContext } from '../../../App';
import plus from '../../../assets/img/card/Plus.svg';
import checked from '../../../assets/img/card/checked.svg';
import like from '../../../assets/img/content/like.svg';
import dislike from '../../../assets/img/content/dislike.png';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import { useState } from 'react';

function Card ({id, name, price, src, onPlus, onFavoraite, favorited=false, loading=false}){
    const {isItemAdded}=React.useContext(AppContext);
    
    const [isFavoraite, setIsFavoraite]=useState(favorited);
    
    const itemObj={id, parentId: id, name, price, src}

    const onClickFavorite=()=>{
        onFavoraite(itemObj);
        setIsFavoraite(!isFavoraite);
    }
    const onClickPlus=()=>{
        onPlus(itemObj);
    }
    

    return(
        <div className={styles.card}>
            {
                loading ? <ContentLoader 
                speed={2}
                width={155}
                height={200}
                viewBox="0 0 150 260"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                
              >
                <rect x="0" y="155" rx="3" ry="3" width="93" height="15" /> 
                <rect x="0" y="210" rx="3" ry="3" width="80" height="24" /> 
                <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                <rect x="0" y="135" rx="3" ry="3" width="150" height="15" /> 
                <rect x="117" y="203" rx="8" ry="8" width="32" height="32" />
              </ContentLoader> : 
              <>
               <div className={styles.favorite} >
                <img onClick={onClickFavorite}  width={30} height={30} src={isFavoraite ? like : dislike} alt="dislike" />
                </div>
                    <img className={styles.csrdImg} width="100%" height={120} src={src} alt="01" />
                    <h5>{name}</h5>
                    <div className={styles.cardBtn}>
                        <div>
                            <span>Цена:</span>
                            <b> {price} руб.</b>
                        </div>
                        
                            { onPlus &&
                                <img className={styles.button} onClick={onClickPlus}  src={isItemAdded(id) ? checked : plus} alt="Plus" />
                            }
                       
                    </div>
              </>
            }
               
                </div>
    )
}

export default Card;