import React from 'react';



const Profile = ({user, is_login}) =>{
  //States

  //Actions

  //Renderer
  return(
    <div>
      {is_login ?(
        <div className='alert alert-success'>
            Bienvenue : {user.email}
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
