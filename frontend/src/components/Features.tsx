import img9 from '../../images/image 9.png'

const Features = () => {
    return (
        <section className="px-5">
            <div className="flex flex-col items-center justify-center text-center my-28">
                <h1 className="font-bold text-3xl md:text-5xl">Start sorting candidates in minutes</h1>
                <p className="text-gray-500 text-xl md:text-xl mt-5">filtering and sorting candidate has never been easier with
                    HireX</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-16 my-10 px-0 md:px-5">
                <div className="max-w-xs md:max-w-full">
                    <hr className="border-none h-[0.1rem] bg-black/30" />
                    <p className="text-[#9F6DDE] mt-8">Step 1</p>
                    <h3 className="text-xl font-bold mt-4">Sign up for an account</h3>
                    <p className="text-lg mt-4">Contact us through <a href="#" className="text-[#9F6DDE]">email</a> to set you up
                        the
                        service</p>
                </div>
                <div className="max-w-xs md:max-w-full">
                    <hr className="border-none h-[0.1rem] bg-black/30" />
                    <p className="text-[#9F6DDE] mt-8">Step 2</p>
                    <h3 className="text-xl font-bold mt-4">Upload CV pdf file</h3>
                    <p className="text-lg mt-4">We’ll process the CV file and extract info from it</p>
                </div>
                <div className="max-w-xs md:max-w-full">
                    <hr className="border-none h-[0.1rem] bg-black/30" />
                    <p className="text-[#9F6DDE] mt-8">Step 3</p>
                    <h3 className="text-xl font-bold mt-4">Start making decisions</h3>
                    <p className="text-lg mt-4">You can sort , filter and take overview of your candidates</p>
                </div>
            </div>

            <div className='mx-auto max-w-6xl px-6 lg:px-8 '>
                <div className='mt-16 flow-root sm:mt-24'>
                    <div
                        className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                        <img src={img9} alt='product preview' width='1364' height='866'
                            className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features