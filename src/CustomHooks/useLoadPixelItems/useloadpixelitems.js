import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import axios from 'axios';
import lodash from 'lodash';
import imageCompression from 'browser-image-compression';

const PIXELBAYCONFIG = {
  baseURL : 'https://pixabay.com/api/',
  params:{
    key: '20260910-0af9ad46cbdaf780a15bf47f3'
  }
}

const imageCompressor = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 301,
    useWebWorker: true
  }

  try{
    let compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch(err){
    console.log(err);
  }
}

const useLoadPixelItems = (menufieldsRequired, sessionStorageKey, queryParameter) => {

  const requiredFields = menufieldsRequired;
  const [menuItems, setMenuItems] = useState(() => {return sessionStorage.getItem('burgerItems')
   ? JSON.parse(sessionStorage.getItem('burgerItems')) : []});
  const [pagesCount, setPagesCount] = useState(() => {return sessionStorage.getItem('burgerItems')
   ? JSON.parse(sessionStorage.getItem('pages'))+1 : 1})
  const itemsvalueRef = useRef();

  /* Asynchronous request to Pixelbay API */
  async function getpixelItems(){
    let axiosPixelBay = axios.create(PIXELBAYCONFIG);

    /* Interceptors to organize response data as per the requirement*/
    axiosPixelBay.interceptors.response.use((response) => {
      let items = response.data.hits.map(el => {
        return lodash.pick(el, requiredFields)
      })
      response.menuItems = items;
      return response
    },
    (error) => {
      return Promise.reject(error);
    });


    /* Make a GET request to the pixelbay API*/
    await axiosPixelBay.get('', {
      params:{
        q: queryParameter,
        page: pagesCount
      }
    }).then(response => {
      setMenuItems((prevState) => {return [...prevState, ...response.menuItems]});
    }).catch(error => {
      console.log(error)
    })
  }

  /* useEffect to call API methods */
  useEffect(() => {
    if(menuItems.length < 20){
      getpixelItems();
    }
    itemsvalueRef.current = menuItems;
    return function cleanup(){
      sessionStorage.removeItem(sessionStorageKey);
      sessionStorage.setItem('burgerItems', JSON.stringify(itemsvalueRef.current));
      sessionStorage.setItem('pages', JSON.stringify(Math.ceil(itemsvalueRef.current.length / 20)))
    }
  }, [pagesCount])

  /*Returning setPagesCount, menuItems reference*/
  return [menuItems, setPagesCount];
}

export default useLoadPixelItems;
