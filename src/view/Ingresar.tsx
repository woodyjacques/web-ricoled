import { useState } from "react";
import axios from "axios";
import { mostrarMensaje } from "../components/toast";
const api = "https://bac-ricoled.vercel.app";

function Ingresar() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };

    const handleAgregarClick = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo antes de continuar.");
        } else {
            const reader = new FileReader();

            reader.onload = async (event) => {
                const fileContent = event.target?.result as string;
                const lines = fileContent.split("\n");

                for (const line of lines) {
                    const [linkImagen,  categories, code, description, price] = line.split(",");

                    const product = {
                        linkImagen,
                        categories,
                        code,
                        description,
                        price
                    };

                    const MensajeErr = document.getElementById("MensajeErrServ");
                    const MensajeAct = document.getElementById("MensajeServ");
                    try {
                        const response = await axios.post(`${api}/product`, product);
                        mostrarMensaje(response.data.message, MensajeAct);
                        setFile(null);
                    } catch (error: any) {
                        mostrarMensaje(error.response.data.message, MensajeErr);
                    }
                }
            };

            reader.readAsText(file);
        }
    };

    const handleLimpiarClick = () => {
        const fileInput = document.getElementById("dropzone-file") as HTMLInputElement | null;
        if (fileInput) {
            fileInput.value = "";
        }
        setFile(null);
    };

    return (
        <div className="bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 shadow-md">
            <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
                <p className="text-center">Ingresar</p>
            </div>

            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para seleccionar el archivo</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SOLO ARCHIVO TXT</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>

            {file && (
                <div className="mt-4 text-white">
                    <p>Archivo seleccionado: {file.name}</p>
                </div>
            )}

            <p
                id="MensajeErrServ"
                className=" hidden text-red-500 text-sm font-medium rounded-lg text-center"
            ></p>
            <p
                id="MensajeServ"
                className=" hidden text-green-500 text-sm font-medium rounded-lg text-center"
            ></p>

            <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center items-center w-full">
                <button
                    onClick={handleAgregarClick}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-auto"
                >
                    Agregar
                </button>

                <button
                    onClick={handleLimpiarClick}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-auto"
                >
                    Limpiar
                </button>
            </div>
        </div>
    );
}

export default Ingresar;
