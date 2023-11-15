
const Signin = () => {
    return (
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#f6f6f6f6] border-violet-800">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-10">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight ">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg font-medium">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                className="bg-gray-50 border border-violet-800 text-gray-900 sm:text-base rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 "
                                placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-lg font-medium ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                className="bg-gray-50 border border-violet-800 text-gray-900 sm:text-basef rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 "
                                required />
                        </div>

                        <button type="submit"
                            className="w-full  bg-[#9F6DDE] text-white hover:bg-[#4d2e74] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center  hover:bg-primary-700 focus:ring-primary-800">Sign
                            in</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signin