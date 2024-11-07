const ErrorLayout: React.FC<{ error: Error, symbol: string }> = ({ error, symbol }: { error: Error, symbol: string }) => {
    return (
        <div className="flex flex-col items-center w-full mx-auto p-6 bg-red-400 border border-red-500 rounded-lg text-red-700">
            <h2 className="text-xl font-semibold">Error</h2>
            <p className="mt-4">There was an issue fetching the stock details for <strong>{symbol}</strong>.</p>
            <p className="mt-2">{error.message}</p>
        </div>
    );
}
export default ErrorLayout;