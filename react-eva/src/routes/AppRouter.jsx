import MainPage from "../views/pages/MainPage/MainPage";
import Favorite from "../views/pages/Favorite/Favorite";
import { Orders } from "../views/pages/Orders/Orders";
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () =>{

    const routesList=[
        {route: '/', element: <MainPage/>},
        {route: '/favorite', element: <Favorite />},
        {route: '/orders', element: <Orders />},
    ]

    const routes = routesList.map(({route, element})=>   <Route key={route} path={route} element={element} />)

    return (
        <Routes>
            {routes}
        </Routes> 
    )
}