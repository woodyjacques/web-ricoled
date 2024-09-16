import { useEffect, useState } from "react";
import { obtenerProductos } from "../validation/Product";
import { ModalCard } from "../components/modalCard";

function Obtener() {
    const [product, setProduct] = useState<
        { id: number; code: string; name: string; categories: string; description: string, price: number, linkImagen: string }[]
    >([]);

    useEffect(() => {
        obtenerProductos()
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPriceOption, setSelectedPriceOption] = useState<number>(1);

    const filteredProducts = product.filter((product) =>
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categories.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculatePrice = (price: number) => {
        let adjustment = 0;
        switch (selectedPriceOption) {
            case 1:
                adjustment = price * 0.10;
                break;
            case 2:
                adjustment = price * 0.20;
                break;
            case 3:
                adjustment = price * 0.30;
                break;
            default:
                adjustment = 0;
        }
        return price + adjustment;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [articulo, setarticulos] = useState();

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

      const obtener = (offer: any) => {
        setarticulos(offer);
      };

    return (
        <div className=" bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 shadow-md">
            <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
                <form className="w-full">
                    <div className="relative w-full">
                        <p className="text-center">Obtener</p>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            required
                        />
                        <select
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            name="precio"
                            id="precio"
                            value={selectedPriceOption}
                            onChange={(e) => setSelectedPriceOption(parseInt(e.target.value))}
                        >
                            <option value="1">5</option>
                            <option value="2">10</option>
                            <option value="3">15</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Imagen</th>
                            <th scope="col" className="px-6 py-3">Código</th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index} className="border-b bg-gray-900 border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="h-12 w-18 rounded-md" src={product.linkImagen} alt="" onClick={() => {
                                        toggleModal();
                                        obtener(product);
                                    }} />
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {product.code}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">
                                    {product.description ? product.description.slice(0, 50) : "Sin descripción"}...
                                </td>
                                <td className="px-6 py-4">
                                    {calculatePrice(product.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalCard set={articulo} isOpen={isOpen} toggleModal={toggleModal} />
        </div>
    );
}

export default Obtener;
