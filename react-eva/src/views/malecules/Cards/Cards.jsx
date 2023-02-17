import Card from '../../atoms/Card/Card';
import styles from './Cards.module.scss';

function Cards ({product, onAddToCart, searchValue, onAddToFavorites, isLoading}){

    const renderItems=()=>{
        const filteredProduct= product.filter((i)=>i.name.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(12)] : filteredProduct).map((item, index)=>(
            <Card key={index} {...item} loading={isLoading} onPlus={(obj)=>onAddToCart(obj)} onFavoraite={(obj)=>onAddToFavorites(obj)}  />
    ))
    }



    return(
        <div className={styles.product}>
            {renderItems()}
        </div>
        
    )
}

export default Cards;