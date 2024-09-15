import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios from "axios";
const api = "https://bac-ricoled.vercel.app";
const token = localStorage.getItem("ACCESS_TOKEN");

export const handleSubmitCat = async (
    event: FormEvent,
    id: number,
    name: string,
    description: string,
    setId: React.Dispatch<React.SetStateAction<number>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>
) => {
    event.preventDefault();
    const MensajeErr = document.getElementById("MensajeErrCat");
    const MensajeAct = document.getElementById("MensajeCat");

    if (name === "") {
        mostrarMensaje("Ingrese el nombre", MensajeErr);
        return null;
    }

    if (description === "") {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    function resetForm() {
        setId(0);
        setName("");
        setDescription("");
    }

    try {
        const method = id === 0 ? 'post' : 'patch';
        const url = id === 0 ? `${api}/categories` : `${api}/categories/${id}`;
        const response = await axios[method](url, { name, description }, {
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

export async function obtenerCategorias() {
    try {
        const response = await axios.get(`${api}/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function handleClickEl(cate: any) {
    const id = cate.id;
    const MensajeNegToast = document.getElementById("toast-negative");
  
    axios
      .delete(`${api}/categories/${id}`, {
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
  