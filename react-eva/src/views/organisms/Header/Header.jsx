import {  Link } from 'react-router-dom';
import logo from '../../../assets/img/header/logo.png';
import basket from '../../../assets/img/header/Group.png';
import heard from '../../../assets/img/header/Vector.png';
import union from '../../../assets/img/header/Union.png';


import styles from './Header.module.scss';
import { useCart } from '../../../hooks/useCart';
import { useContext } from 'react';
import { AppContext } from '../../../App';


function Header() {
    const{resultTotalPrice}=useCart();
    const {setCartOpened}=useContext(AppContext);
    
    const handleOpen=()=>{
        setCartOpened(true);
    }

    return (
        <header className={styles.line}>
        <div className={styles.headerLeft}>
            <Link to="/"><img width={40} height={40} src={logo} alt="logo" /></Link>
            <div className={styles.headerInfo}>
                <h3>EVA cosmetics</h3>
                <p>магазин лучших косметики</p>
            </div>
        </div>
        <ul className={styles.headerRight}>
            <li onClick={handleOpen} className={styles.basket}> <img width={18} height={18} src={basket} alt="basket" />  <span> Карзина  <p>{resultTotalPrice} руб.</p></span></li>
            <li><Link to="/favorite"><img width={20} height={20} src={heard} alt="heard" /> <span>Избренное</span></Link> <Link to="/orders"><img className={styles.union} width={20} height={20} src={union} alt="union" /> <span>Заказы</span></Link></li>
        </ul>

    </header>
    )
}

export default Header; 