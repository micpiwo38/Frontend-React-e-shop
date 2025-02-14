import axios from 'axios';
import React, { useState } from 'react';



const Profile = ({user, is_login}) =>{
  //States
  const [current_user, setCurrentUser] = useState(user);
  //Actions
  const delete_profile = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(response => {
        alert("Votre compte a été supprimer !");
        window.location.href = '/inscription';
      })
      .catch(error => console.error("Erreur lors de la supression de votre compte !" + error));
  }

  //Renderer
  return(
    <div>
      {is_login ?(
        <div className='alert alert-success'>
            <div>Bienvenue : {user.email}</div>
            <button type='button' className='btn btn-danger mt-3' onClick={() => delete_profile(user.id)}>Supprimer votre compte</button>
        </div> 
      ):(
        <div className='alert alert-danger'>
          Cette page demande une connexion de l'utilisateur
        </div>
      )}
  </div>
  )
}


export default Profile;
