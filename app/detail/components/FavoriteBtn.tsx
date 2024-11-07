'use client'
import { StockSymbolData } from "@/app/models/StockSymbol";
import { useEffect, useState } from "react";

const FavoriteButton: React.FC<StockSymbolData> = ({ stockSymbol }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites: StockSymbolData[] = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
        setIsFavorite(favorites.some((f) => f.stockSymbol === stockSymbol));
    }, [stockSymbol]);

    const handleAddFavorite = () => {
        const favorites: StockSymbolData[] = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
        if (isFavorite) {
            const updatedFavorites = favorites.filter((f) => f.stockSymbol !== stockSymbol);
            localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
        } else {
            favorites.push({ stockSymbol: stockSymbol });
            localStorage.setItem('favoriteStocks', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="flex flex-col items-center w-full md:w-3/4 h-full mt-4">
            <button
                className="w-full h-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-md"
                onClick={handleAddFavorite}
            >
                {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
            </button>
            {isFavorite && (
                <p className="mt-2 text-green-600 font-medium">
                    {stockSymbol} is in your favorites!
                </p>
            )}
        </div>
    )
}
export default FavoriteButton;