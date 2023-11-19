type stateBol = {
    reject: boolean,
    accpet: boolean,
}
type modalProps = {
    title: string,
    handleAccept: () => void
    setModal: React.Dispatch<React.SetStateAction<stateBol>>
}

const Modal = ({ title, setModal, handleAccept }: modalProps) => {
    return (
        <div className="w-[100vw] h-[100vh] z-[600] fixed flex justify-center items-center">
            <div className="w-[500px] h-[200px] rounded-md bg-white flex flex-col p-12 shadow-md">
                <h1 className="text-center text-lg font-bold">{title}</h1>
                <div className=" flex justify-evenly mt-5">
                    <button onClick={() => setModal({ accpet: false, reject: false })} className="p-2 px-10 rounded-md bg-sky-200 text-sky-800 hover:bg-sky-300">Cancel</button>
                    <button onClick={() => handleAccept()} className="p-2 px-10 rounded-md bg-red-200 text-red-800 hover:bg-red-300">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Modal