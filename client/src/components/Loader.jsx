
/**
 * Loader Component
 * 
 * Renders the loading animation and message.
 * 
 * Props:
 * - message: A string that contains the message for the UI to show to the user.
 */
function Loader({message}) {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center gap-4 h-[90dvh]">
        
                {/* === Loader === */}
                <div className="flex flex-col justify-center items-center size-[80px] overflow-hidden">
                    <i className="text-[64px] [animation:var(--animate-rotate-y)] bi bi-film"/>
                </div>
        
                {/* === Loading Message === */}
                <p className="text-2xl">{message}</p>
            </div>
        </div>
    )
}

export default Loader