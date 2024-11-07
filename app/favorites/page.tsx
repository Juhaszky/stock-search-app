'use client'

import { useEffect, useState } from "react";
import { FavoriteButtonProps } from "../models/StockSymbol";
import Link from "next/link";

const Favorites = () => {
    const [favorites, setFavorites] = useState<FavoriteButtonProps[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
        setFavorites(storedFavorites);
    }, []);
    return (
        <div className="flex flex-col items-center gap-4 w-full h-full p-4">
            <h1 className="font-bold text-3xl text-purple-500">Your Favorite Stocks</h1>
            {favorites.length === 0 ? (
                <p>You have no favorite stocks saved yet.</p>
            ) : (
                <div className="w-full md:w-1/2 text-gray-900">
                    <ul>
                        {favorites.map((stock, index) => (
                            <Link key={index} href={`/detail/${stock.stockSymbol}`}>
                                <li key={index} className="p-6 border-b border-zinc-700 bg-zinc-600 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                                    <p><span className="font-bold">Symbol:</span> {stock.stockSymbol}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Favorites