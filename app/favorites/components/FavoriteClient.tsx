'use client'
import { StockSymbolData } from "@/app/models/StockSymbol";
import { useEffect, useState } from "react";
import Favorites from "./Favorites";

const FavoritesClient: React.FC = () => {
    const [favorites, setFavorites] = useState<StockSymbolData[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
        setFavorites(storedFavorites);
    }, []);
    return <Favorites favorites={favorites}></Favorites>
}

export default FavoritesClient;
