interface Forms {
    isOpen: boolean;
    set: any;  // Manteniendo el tipo como 'any' para mayor flexibilidad
    toggleModal: () => void;
}

export function ModalCard({ isOpen, toggleModal, set }: Forms) {
    if (!isOpen) {
        return null;
    }

    console.log(set.linkImagen); // Mostramos 'set.linkImagen' tal como lo pasaste

    return (
        <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="bg-gray-100 bg-opacity-50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <div className="flex items-start justify-between border-b rounded-t border-gray-600">
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                            data-modal-hide="staticModal"
                            onClick={toggleModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <img src={set.linkImagen} alt={set.name} className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
