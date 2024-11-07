import Link from "next/link";
import Search from "./components/Search";

import { Match } from "./models/Match";
import { SearchResponse } from "./models/SearchResponse";

const SearchLayout: React.FC<{
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}> = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) => {
        const searchParams = await props.searchParams;
        const query = searchParams?.query || '';
        let searchResults: Match[] = [];
        if (query) {
            try {
                const fetchedData: SearchResponse = await fetch(`http://localhost:3000/api/search?query=${query}`)
                    .then(res => res.json());
                searchResults = fetchedData.bestMatches || [];
                searchResults.sort((a, b) => b['9. matchScore'] - a['9. matchScore'])
            } catch (err) {
                console.error("Error fetching search results:", err);
            }
        }
        return (
            <div className="flex flex-col items-center gap-4 w-full p-4">
                <h1 className="font-bold text-3xl text-purple-500">Stock-Search-App</h1>
                <div className="flex justify-center relative w-full md:w-1/2">
                    <Search placeholder="Enter symbol or name..."></Search>
                </div>
                {query && (
                    <div className="max-w-md -mt-4 w-full md:w-1/2 text-gray-900 border border-zinc-500 rounded-lg bg-zinc-600 overflow-y-scroll">
                        <ul >
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (

                                    <li key={index} className="p-2 border-b border-zinc-700 bg-zinc-600 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                                        <Link href={`/detail/${result['1. symbol']}`}>
                                            <p>
                                                <span className="font-bold">Symbol:</span> {result['1. symbol']}
                                            </p>
                                            <p>
                                                <span className="font-bold">Name: </span>{result['2. name']}
                                            </p>
                                            <p><span className="font-bold">MatchScore:</span> {result['9. matchScore']}</p>
                                        </Link>

                                    </li>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        );
    };
export default SearchLayout;
