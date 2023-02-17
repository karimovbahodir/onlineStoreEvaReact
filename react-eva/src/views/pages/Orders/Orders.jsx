import back from '../../../assets/img/favorite/back.png';
import close from '../../../assets/img/drawer/close.png';
import orderImg from '../../../assets/img/order/orderImg.png';
import { Link } from 'react-router-dom';
import Card from '../../atoms/Card/Card';
import styles from './Orders.module.scss';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../../App';
import Info from '../../atoms/Info/Info';
import { PageContainer } from '../PageContainer/PageContainer';

export const Orders=()=>{
    const { onAddToFavorites}=useContext(AppContext);
    const [isLoading, setIsLoading]=useState(true);
    const [orders, setOrders]=useState([]);

    useEffect ( () => {
        (async () => {
            try {
                const {data}= await axios.get('http://localhost:3001/orders');
                setOrders(data.map((obj)=>obj.items).flat());
                setIsLoading(false);
            } catch (error) {
                alert('ошибка при запросе заказов!')
            }
        })()
    }, []);

    const onRemoveOrder = (id) => {
        try {
            axios.delete(`http://localhost:3001/orders/${id}`)
            setOrders((prev) => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из заказов!')
        }
    }

    const orderItem=(isLoading ? [...Array(8)] : orders).map((item, index) => (
        <>
            <Card key={index} {...item} loading={isLoading}  onFavoraite={(obj)=>onAddToFavorites(obj)} />
            <img className={styles.orderCloseBtn} onClick={() => onRemoveOrder(item.id)}  width={32} height={32} src={close} alt="close" />
        </>
    ));

    return(
        <PageContainer>
            <Link to="/"><img src={back} alt="back" /></Link>
            <h2>Мои заказы</h2>
            <div className={styles.favoriteContent}>
                {orders.length>0 ? orderItem : <Info title="У вас нет заказов" description="Оформите хотя бы один заказ." infoImg={orderImg}/>} 
            </div>
        </PageContainer>
    )
}