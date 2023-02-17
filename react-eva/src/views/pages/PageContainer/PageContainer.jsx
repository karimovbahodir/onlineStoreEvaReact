import { useContext } from "react";
import { AppContext } from "../../../App";
import Header from "../../organisms/Header/Header";
import Drawer from "../../organisms/Drawer/Drawer";
import styles from './PageContainer.module.scss';

export const PageContainer =({children})=>{
    const {cartOpened, cartItems, setCartOpened, setCartItems}=useContext(AppContext);
    return (
        <>
        <div className={styles.wrapper}>
            { cartOpened ? <Drawer items={cartItems} setCartOpened={setCartOpened} setCartItems={setCartItems}/>: null}

            <Header/>

            <div className={styles.content}>
                {children}
            </div>
           

        </div>
        </>
    )
}