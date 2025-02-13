import React from 'react';
import { useRouteError } from 'react-router-dom';


const PageNotFound = () => {
  let error = useRouteError();
  
  return(
    <div className='alert alert-danger w-50 mx-auto mt-5 shadow rounded'>
      <h1 className='text-white'>Erreur : 404</h1>
      <h2 className='text-warning'>Page introuvable !</h2>
      <p>
        <em>{error.statusText || error.message}</em>
      </p>
      <a href={'/accueil'} className='btn btn-success'>Retour</a>
  </div>
  )
}
  


 




export default PageNotFound;
