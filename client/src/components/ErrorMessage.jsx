

function ErrorMessage({code}) {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-[90dvh]">
            <h4 className="text-8xl">{code}</h4>
            <p className="text-2xl">Oops!</p>
            <p>Something went wrong. Reload or try again later.</p>
        </div>
    )
}

export default ErrorMessage