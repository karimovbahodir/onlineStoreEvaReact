import close from '../../../assets/img/drawer/close.png';
import empty from '../../../assets/img/drawer/empty.png';
import axios from 'axios';
import decoration from '../../../assets/img/drawer/end.png';
import arrow from '../../../assets/img/drawer/arrow.png';
import Info from '../../atoms/Info/Info';

import styles from './Drawer.module.scss';
import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';

function Drawer({ setCartOpened, items = [] }) {
    const {cartItems, setCartItems, resultTotalPrice, tax}=useCart();
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   
    
    const onRemoveItem = (id) => {
        try {
            axios.delete(`http://localhost:3001/cart/${id}`)
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из корзины!')
        }
    }
    
    const handleClose = () => {
        setCartOpened(false)
    }
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('http://localhost:3001/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('http://localhost:3001/cart/' + item.id)
            }
        } catch (error) {
            alert('Не удалось создать заказ!')
        }
        setIsLoading(false);
    }
    
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2>Карзина <img onClick={handleClose} className={styles.close} width={32} height={32} src={close} alt="close" /></h2>


                {
                    items.length > 0 ?
                        <>
                            <div className={styles.items}>
                                {items.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <img className={styles.img} width={70} height={70} src={item.src} alt="product" />
                                        <div className={styles.cartItemText}>
                                            <p>{item.name}</p>
                                            <b>{item.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemoveItem(item.id)} className={styles.close} width={32} height={32} src={close} alt="close" />
                                    </div>
                                ))}
                            </div>


                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{resultTotalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{tax} руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className={styles.drawerBtn}>Оформить заказ <img src={arrow} alt="arrow" /></button>
                            </div> </> : 
                            <Info 
                            title={isOrderComplete ? 'Заказ оформлен!': 'Карзина пустая'} 
                            handleClose={handleClose} 
                            description={isOrderComplete ? `Ваш заказ # ${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
                            infoImg={isOrderComplete ? decoration : empty} />
                }





            </div>
        </div>
    )
}

export default Drawer;