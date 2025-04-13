import React, { useState } from "react";
import "./appStyles.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import { converToLabel } from "../js/util";

import {ValtabListFormPage} from "../modules/valtab/ValtabListFormPage";
import {ClientsListFormPage} from "../modules/clients/ClientsListFormPage";
import {CategoriesListFormPage} from "../modules/categories/CategoriesListFormPage";
import {ProductsListFormPage} from "../modules/products/ProductsListFormPage";

export  const MainPage =()=>{

  const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState("");
  // Función que se ejecuta cuando se hace click en un menú horizontal
  const handleTopMenuClick = (menuName) => {
    setActiveTopMenu(menuName);
  };

  return (
    <div className="app-container">
     {/* SIDEBAR */}
     <aside className="sidebar">
        <div className="sidebar-logo">Inventory</div>
        {/* Render dinámico de las opciones de menú lateral según la opción activa en el header */}
        <ul className="sidebar-nav"> 
            <li key="ValtabListFormPage" >
              <a href="#!" onClick={(event) => {
                            event.preventDefault();
                            navigate("valtab", {
                              replace: true
                            });
                            setActiveComponent("valtab");
                            }}>
	   {converToLabel('valtab')}
              </a>
            </li> 
            <li key="ClientsListFormPage" >
              <a href="#!" onClick={(event) => {
                            event.preventDefault();
                            navigate("clients", {
                              replace: true
                            });
                            setActiveComponent("clients");
                            }}>
	   {converToLabel('clients')}
              </a>
            </li> 
            <li key="CategoriesListFormPage" >
              <a href="#!" onClick={(event) => {
                            event.preventDefault();
                            navigate("categories", {
                              replace: true
                            });
                            setActiveComponent("categories");
                            }}>
	   {converToLabel('categories')}
              </a>
            </li> 
            <li key="ProductsListFormPage" >
              <a href="#!" onClick={(event) => {
                            event.preventDefault();
                            navigate("products", {
                              replace: true
                            });
                            setActiveComponent("products");
                            }}>
	   {converToLabel('products')}
              </a>
            </li> 
        </ul>
      </aside>
       
      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">
        {/* HEADER con menú horizontal */}
        <header className="header">
          <ul className="header-menu">
            PLATKMFramework CPLATKM
          </ul>
        </header>

        {/* CUERPO DEL CONTENIDO */}
        <div className="content-wrapper">
            <Routes>
                <Route path="/valtab" element={<ValtabListFormPage/>} />  
                <Route path="/clients" element={<ClientsListFormPage/>} />  
                <Route path="/categories" element={<CategoriesListFormPage/>} />  
                <Route path="/products" element={<ProductsListFormPage/>} />  
            </Routes>
        </div>
      </div>
    </div>
  );
}

