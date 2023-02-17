import {Link} from 'react-router-dom';
import arrowL from '../../../assets/img/drawer/arrowL.png';
import styles from "./Info.module.scss";

function Info ({title, description, infoImg, handleClose}){

    return(
        <div className={styles.cartEmpty}>
                        <img className={styles.cartEmptyImg} width={120}  src={infoImg} alt="empty" />
                        <h3 className={styles.emptyTitle}>{title} </h3>
                        <p className={styles.cartEmptyText}>{description}</p>
                        <Link to='/'><button onClick={handleClose} className={ styles.drawerBack}>
                            <img src={arrowL} alt="arrowL" /> Вернуться назад
                        </button></Link>
        </div>
    )
}

export default Info;