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
                <div className="max-w-md -mt-4 w-full md:w-1/2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                    <ul>
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (

                                <li key={index} className="p-2 border-b hover:bg-gray-200 hover:cursor-pointer rounded-lg">
                                    <Link href={`/detail/${result.symbol}`}>
                                        {result.symbol} ({result.name})
                                        <div>MatchScore: {result.matchScore}</div>
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
