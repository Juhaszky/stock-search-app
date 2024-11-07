'use client'
const BackButton: React.FC = () => {
    return (
        <button
            className="self-start text-purple-500 hover:underline mb-4"
            onClick={() => window.history.back()}
        >
            &larr; Back
        </button>
    )
}
export default BackButton;