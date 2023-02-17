import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../../App";
import search from '../../../assets/img/content/search.svg';
import close from '../../../assets/img/drawer/close.png';
import Cards from '../../malecules/Cards/Cards';
import { PageContainer } from "../PageContainer/PageContainer";
import styles from './MainPage.module.scss';

function MainPage() {
    const [searchValue, setSearchValue]=useState('');
    const {product, setCartItems, setFavorites, onAddToFavorites, onAddToCart, isLoading} = useContext(AppContext)
    
    const onChangeSearchInput =(event)=>{
        setSearchValue(event.target.value);
    }

    return(
            <PageContainer>
                 <div className={styles.search}>
                <h1>{searchValue ? `Поисок по запросу: ${searchValue}`: 'Все косметики'}</h1>
                <div className={styles.searchBlock}>
                    <img  src={search} alt="search" />
                    {searchValue ? <img onClick={()=> setSearchValue('')} className={styles.close} width={18} height={18} src={close} alt="clear" /> : null}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...' />
                </div>
                </div>

                <Cards product={product} setCartItems={setCartItems} searchValue={searchValue} setFavorites={setFavorites} onAddToFavorites={onAddToFavorites} onAddToCart={onAddToCart} isLoading={isLoading}/>
            </PageContainer>
    )
}

export default MainPage;