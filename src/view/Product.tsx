import { FormEvent, useEffect, useState } from "react";
import { handleClickEl, handleSubmitProduct, obtenerProductos } from "../validation/Product";
import { obtenerCategorias } from "../validation/Categories";
import { Modal } from "../components/toast";

function Product() {

    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [categories, setCategories] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [linkImagen, setLinkImagen] = useState("");

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setCode("");
        setName("");
        setCategories("");
        setDescription("");
        setPrice(0);
        setLinkImagen("");
    };

    const handleSubmit = (event: FormEvent) => {
        handleSubmitProduct(
            event,
            id,
            code,
            name,
            categories,
            description,
            price,
            linkImagen,
            setId,
            setCode,
            setName,
            setCategories,
            setDescription,
            setPrice,
            setLinkImagen
        );
    };

    const [cate, setCate] = useState<
        {
            id: number;
            name: string;
        }[]
    >([]);

    useEffect(() => {
        obtenerCategorias()
            .then((data) => {
                setCate(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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

    const handleActualizar = (
        id: number,
        code: string,
        name: string,
        categories: string,
        description: string,
        price: number,
        linkImagen: string,
    ) => {
        setId(id);
        setCode(code);
        setName(name);
        setCategories(categories);
        setDescription(description);
        setPrice(price);
        setLinkImagen(linkImagen);
        toggleModalAct();
    };

    const toggleModalAct = () => {
        setIsOpen(!isOpen);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = product.filter((product) =>
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categories.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

    const handleEliminarClick = (id: number) => {
        setProductIdToDelete(id);
        showModal();
    };

    const handleConfirmEliminar = () => {
        if (productIdToDelete !== null) {
            handleClickEl({ id: productIdToDelete });
            setProductIdToDelete(null);
        }
        showModal();
    };

    return (
        <div className=" bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 shadow-md">
            <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
                <form className="w-full">
                    <div className="relative w-full">
                        <p className="text-center">Productos</p>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={toggleModal}
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoría
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr
                                key={index}
                                className=" border-b bg-gray-900 border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                >
                                    {product.code}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                >
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">{product.categories}</td>
                                <td className="px-6 py-4">
                                    {product.description ? product.description.slice(0, 50) : "Sin descripción"}...
                                </td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-500 hover:underline"
                                        onClick={() =>
                                            handleActualizar(
                                                product.id,
                                                product.code,
                                                product.name,
                                                product.categories,
                                                product.description,
                                                product.price,
                                                product.linkImagen
                                            )
                                        }
                                    >
                                        Actualizar
                                    </a>
                                    <a
                                        href="#"
                                        className="ml-8 font-medium text-red-500 hover:underline"
                                        onClick={() => handleEliminarClick(product.id)}
                                    >
                                        Eliminar
                                    </a>
                                    <Modal
                                        onConfirm={handleConfirmEliminar}
                                        isVisible={isModalVisible}
                                        onClose={showModal}
                                        message="¿Estás seguro de eliminar el producto?"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpen && (
                <div
                    id="authentication-modal"
                    aria-hidden="true"
                    className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-gray-900 rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                data-modal-hide="authentication-modal"
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
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-white">
                                    Productos
                                </h3>

                                <p
                                    id="MensajeErrServ"
                                    className=" hidden text-red-500 text-sm font-medium rounded-lg text-center"
                                ></p>
                                <p
                                    id="MensajeServ"
                                    className=" hidden text-green-500 text-sm font-medium rounded-lg text-center"
                                ></p>
                                <form className="space-y-6" onSubmit={handleSubmit}>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Código
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Nombre del producto"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Nombre
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Nombre del producto"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Categorías
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="usuarios"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                value={categories}
                                                onChange={(e) => setCategories(e.target.value)}
                                            >
                                                <option value="">Categorías</option>
                                                {cate.map((cate) => (
                                                    <option key={cate.id} value={cate.name}>
                                                        {cate.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-500">
                                            Descripción
                                        </label>
                                        <textarea
                                            placeholder="Descripción del producto"
                                            className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}>
                                        </textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Precio
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Nombre del producto"
                                                value={price}
                                                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Imagen
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Link de la imagen"
                                                value={linkImagen}
                                                onChange={(e) => setLinkImagen(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="mb-10 mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;

