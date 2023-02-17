import React from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { ViewEntryPoint } from './views/ViewEntryPoint';


export const AppContext= React.createContext({});



function App() { 
    const [product, setProduct] = useState([]);
    const [cartItems, setCartItems]= useState([]);
    const [favorites, setFavorites]=useState([]);
    const [cartOpened, setCartOpened]=useState(false);
    const [isLoading, setIsLoading]=useState(true);

    
    
    useEffect(()=>{
        async function fetchData(){
            try {
            const cartResponse= await axios.get('http://localhost:3001/cart');
            const favoriteResponse= await axios.get('http://localhost:3001/favorite');
            const itemsResponse =await axios.get('http://localhost:3001/product');

            setIsLoading(false);
            

            setCartItems(cartResponse.data);
            setFavorites(favoriteResponse.data);
            setProduct(itemsResponse.data);
            } catch (error) {
                alert('Ощибка при запросе данных!')
            }
        }

        fetchData();
    }, []);

    const onAddToCart= async (obj)=>{
        try {
            const findItem=cartItems.find(i=>Number(i.parentId) === Number(obj.id));
            if(findItem){
                setCartItems(prev=> prev.filter(item=>Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`http://localhost:3001/cart/${findItem.id}`);
            }else{
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post('http://localhost:3001/cart', obj);
                setCartItems((prev) => prev.map(item=>{
                    if(item.parentId === data.parentId) {
                        return{
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }));
            }
            
        } catch (error) {
            alert("Не удалось добавить карзины")
        }
        
    }

    const onAddToFavorites= async (obj)=>{
        try {
            if(favorites.find(i=>Number(i.id) === Number(obj.id))){
                axios.delete(`http://localhost:3001/favorite/${obj.id}`);
                setFavorites(prev =>  prev.filter(item=>item.id !== obj.id));
            }else{
                const {data} = await axios.post('http://localhost:3001/favorite', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert("не удолось добавить фовариты!")
        }
        
    }


    const isItemAdded= (id) =>{
        return cartItems.some(obj=>Number(obj.parentId) === Number(id))
    }
    
   

    return (
        <AppContext.Provider value={{product, setCartOpened, cartOpened, cartItems, favorites, isItemAdded, onAddToFavorites, setCartItems, onAddToCart, setFavorites, isLoading}}>
            <ViewEntryPoint/>
        </AppContext.Provider>
    );
}

export default App;
