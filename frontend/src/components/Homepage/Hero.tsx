const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center mt-28">

            <div className="p-3 px-8 bg-[#FCFCFC] rounded-3xl shadow-2xl">
                <h3 className="text-lg text-gray-600">HireX now is online !</h3>
            </div>

            <div className="flex flex-col items-center text-center mt-12">
                <h1 className="font-bold text-5xl md:text-7xl px-3 md:px-0">Streamline Your Hiring,</h1>
                <h2 className="font-bold text-4xl md:text-6xl px-3 md:px-0"><span className="text-[#9F6DDE]">CV Filtering </span>
                    Made Easy!</h2>
                <p className="font-light text-gray-500 mt-10 text-lg md:max-w-3xl px-3 md:px-0">HireX streamlines CV filtering,
                    making hiring
                    easier
                    for
                    employers.
                    Simplify
                    your
                    candidate selection with our SaaS
                    solution.</p>

                <button
                    className="rounded-lg mt-10 text-lg bg-[#9F6DDE] flex items-center gap-2 p-2 px-10 text-white transition duration-75 hover:bg-[#4d2e74]">
                    <span>Get
                        started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>

        </section>
    )
}

export default Hero