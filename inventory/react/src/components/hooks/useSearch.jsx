import { useContext, useEffect, useState } from 'react'
import { useFetch } from './useFetch'
import {config} from "../../config.js";

export const useSearch = ({domain=config.baseURL, url, page, pageCount, error}) => {
 
  const {post, get, respDecode} = useFetch()  
  const [refreshSearch, setRefreshSearch] = useState(true)
  const [generalData, setGeneralData] = useState({url:url, domain: domain})
  
  const [filter, setFilter] = useState({ 
    page:0,
    rowsPerPage:5, 
    orderType:"asc",
    order:""
  })
  
  const [result, setResult] = useState({
     totalPages:0,
    recordList:[],
  })      
 
  const search = (info)=>{

    let currentPage = filter.page;

    if(info != undefined && info != null){
      if(info.page != undefined && info.page != null){
        currentPage = info.page;
      }
    }

    const currentFilter = {...filter, 
      'page':currentPage,  
    }
    setFilter(currentFilter);

    runSearch(currentFilter, generalData);
  }
  
  const runSearch = (currentFilter, auxGeneralData)=>{

    get(
          {domain:auxGeneralData.domain, 
            url: auxGeneralData.url +  `?page=${currentFilter.page}&size=${currentFilter.rowsPerPage}`
          },
          (status, searchResult)=>{  
            setResult({...result, 
                                totalPages:searchResult.totalPages, 
                                recordList:searchResult.content,  
            });  

            if(searchResult.content.lenght == 0){
              setFilter({...filter, page:0}); 
            } 
           
          }, (status, msg)=>{  
            if(error)
              error(msg)
          } 
     ) 
  }
 

  const handleSort = (field)=>{
    let auxFilter = {...filter}
    auxFilter.orderType = (field === filter.order && filter.orderType === "asc" ? "desc" : "asc");
    auxFilter.order = field;
    setFilter(auxFilter);
    applyResultSorted(auxFilter);
  }

  const applyResultSorted = (auxFilter) => {
    const sorted = [...result.recordList];
    sorted.sort((a, b) => {
      let valA = a[auxFilter.order];
      let valB = b[auxFilter.order];

      // Convierto a string para evitar problemas con null/undefined
      valA = valA !== null && valA !== undefined ? valA.toString() : "";
      valB = valB !== null && valB !== undefined ? valB.toString() : "";

      if (valA < valB) return auxFilter.orderType === "asc" ? -1 : 1;
      if (valA > valB) return auxFilter.orderType === "asc" ? 1 : -1;
      return 0;
    });

    setResult({...result, recordList: sorted})
    
  };

 
  return (
   {search, result, filter, setFilter, refreshSearch, setRefreshSearch, setResult, handleSort}
  )
}
