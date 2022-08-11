import { createContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  
  const addTech = async (data) => {
    const token = localStorage.getItem("userToken");
    api.defaults.headers.authorization = `Bearer ${token}`;
    await api
      .post("/users/techs", data)
      .then((res) => {
        toast.success("Tecnologia adicionada com sucesso");
        setModal(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const deleteTech = async (techId) => {
    const token = localStorage.getItem("userToken");
    api.defaults.headers.authorization = `Bearer ${token}`;
    await api
      .delete(`/users/techs/${techId}`)
      .then((res) => {
        toast.success("Tecnologia excluída com sucesso");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <TechContext.Provider value={{ addTech, deleteTech, modal, setModal }}>
      {children}
    </TechContext.Provider>
  );
};