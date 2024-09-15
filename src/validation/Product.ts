import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios from "axios";
const api = "https://bac-ricoled.vercel.app";
const token = localStorage.getItem("ACCESS_TOKEN");

export const handleSubmitProduct = async (
    event: FormEvent,
    id: number,
    name: string,
    categories: string,
    description: string,
    price:number,
    linkImagen: string,
    setId: React.Dispatch<React.SetStateAction<number>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setCategories: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setLinkImagen: React.Dispatch<React.SetStateAction<string>>
) => {
    event.preventDefault();
    const MensajeErr = document.getElementById("MensajeErrServ");
    const MensajeAct = document.getElementById("MensajeServ");

    if (name === "") {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (categories === "") {
        mostrarMensaje("Ingrese la categoria", MensajeErr);
        return null;
    }

    if (description === "") {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    if (price === 0) {
        mostrarMensaje("Ingrese el precio", MensajeErr);
        return null;
    }

    if (linkImagen === "") {
        mostrarMensaje("Ingrese el link imagen", MensajeErr);
        return null;
    }

    function resetForm() {
        setId(0);
        setName("");
        setCategories("");
        setDescription("");
        setPrice(0);
        setLinkImagen("");
    }

    try {
        const method = id === 0 ? 'post' : 'patch';
        const url = id === 0 ? `${api}/product` : `${api}/product/${id}`;
        const response = await axios[method](url, { name, description, price, categories,  linkImagen }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        resetForm();
        window.location.reload();
        mostrarMensaje(response.data.message, MensajeAct);
    } catch (error: any) {
        mostrarMensaje(error.response.data.message, MensajeErr);
    }

};

export async function obtenerProductos() {
    try {
        const response = await axios.get(`${api}/product`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function handleClickEl(product: any) {
    const id = product.id;
    const MensajeNegToast = document.getElementById("toast-negative");
  
    axios
      .delete(`${api}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          mostrarMensaje(error.response.data.error, MensajeNegToast);
        }
      });
  }
  