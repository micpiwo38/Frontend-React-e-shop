import axios from 'axios';
import React, { use, useState } from 'react';
import bcrypt from 'bcryptjs';


const Register = () => {
  //States
  const salt = bcrypt.genSaltSync(10);
  const user_object = {
    id: null,
    username: "",
    email: "",
    password: "",
    role: 0
  }

  const [user, setUser] = useState(user_object);
  const [form_is_submit, setFormIsSubmit] = useState(false);

  const hash_password = bcrypt.hashSync(user_object.password, salt);
  //Actions

  //Analyse de l'etat des champs du formulaire
  const handleUserInputChange = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name]: value
    });
  } 

  const save_user = async() => {
    let new_user = {
      username: user.username,
      email: user.email,
      password: hash_password,
      role: 0
    }
    axios.post("http://localhost:3000/users", new_user)
      .then(response => {
        if(response.data.username === "" || response.data.email === "" || response.data.password === ""){
          alert("Merci de remplir tous les champs du formulaire !");
        }else{
          setUser({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            role: 0
          });
          setFormIsSubmit(true);
        }
      })
      .catch(error => console.error("Erreur lors de l'inscription " + error));
      
  }
  //Renderer
  return(
    <div className='container shadow w-50 rounded mt-5 p-3'>
      {form_is_submit ?(
        <div className='alert alert-success'>
            <h2 className='text-warning'>Merci pour votre inscription</h2>
            <a href={'/connexion'} className='btn btn-info mt-3'>Connexion</a>
        </div>
      ):(
        <div>
          <h1 className='text-warning'>Inscription</h1>
      <div className='mt-3'>
        <label htmlFor='username'>Nom d'utilisateur</label>
        <input 
            type='text' 
            className='form-control'
            placeholder="Nom d'utilisateur"
            required
            name='username'
            value={user.username}
            onChange={handleUserInputChange}
            />
      </div>
      <div className='mt-3'>
        <label htmlFor='email'>Email</label>
        <input 
            type='email' 
            className='form-control'
            placeholder="test@test.com"
            required
            name='email'
            value={user.email}
            onChange={handleUserInputChange}
            />
      </div>
      <div className='mt-3'>
        <label htmlFor='username'>Mot de passe</label>
        <input 
            type='password' 
            className='form-control'
            placeholder="Mot de passe"
            required
            name='password'
            value={user.password}
            onChange={handleUserInputChange}
            />
      </div>
      <div className='mt-3'>
        <input 
            type='hidden' 
            className='form-control'
            required
            name='username'
            value={user.role}
            onChange={handleUserInputChange}
            />
      </div>

      <button type='submit' className='btn btn-success mt-3' onClick={save_user}>S'incrire</button>

        </div>
      )}
      
    </div>
  )
}


export default Register;
