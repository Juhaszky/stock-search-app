import Link from "next/link";
import Search from "./components/Search";

const SearchLayout = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    let searchResults: { symbol: string, name: string, matchScore: number }[] = [];
    if (query) {
        try {
            const fetchedData = await fetch(`http://localhost:3000/api/search?query=${query}`);
            const data = await fetchedData.json();
            searchResults = data.bestMatches || [];
            searchResults.sort((a, b) => b.matchScore - a.matchScore)
        } catch (err) {
            console.error("Error fetching search results:", err);
        }
    }
    return (
        <div className="flex flex-col items-center gap-4 w-full h-full p-4">
            <h1 className="font-bold text-3xl">Stock-Search-App</h1>
            <div className="flex justify-center relative w-full md:w-1/2">
                <Search placeholder="Search..."></Search>
            </div>
            {query && (
                <div className="max-w-md -mt-4 w-full md:w-1/2 text-gray-900 border border-zinc-500 rounded-lg bg-zinc-600">
                    <ul>
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (

                                <li key={index} className="p-2 border-b border-zinc-600 bg-zinc-600 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                                    <Link href={`/detail/${result.symbol}`}>
                                        <p>
                                            <span className="font-bold">Symbol:</span> {result.symbol}
                                        </p>
                                        <p>
                                            <span className="font-bold">Name: </span>{result.name}
                                        </p>
                                        <p><span className="font-bold">MatchScore:</span> {result.matchScore}</p>

                                        <div></div>
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
