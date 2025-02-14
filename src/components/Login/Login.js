import axios from 'axios';
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Redirect } from 'react-router-dom';
import Profile from '../Profile/Profile';

const Login = () => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState(Boolean);
  const [is_login, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  //Actions
  const user_login = async(event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3000/users");
    const all_users = response.data;
    const user = all_users.find((user) => user.email === email);
    //Si email exist
    if(user){
      //Check email et mot de passe HACHER
      const is_match = await bcrypt.compare(password, user.password);

      if(is_match){
          //Creer un token clé => valeur
          const user_token = JSON.stringify(user);
          const user_id = user.id;
          localStorage.setItem("token", user_token);
          setIsLogin(true);
          setUser(user);
          if(is_login){
            window.location.href = `/profile/${user_id}`;
          }
      }else{
        alert("Erreur de connexion !");
        console.log(is_match);
        console.log("Mot de passe saisi:", password);
        console.log("Mot de passe haché:", user.password);
      }
      
    }else{
      alert("Cet email est inconnu !");
      return;
    }
  }

  const user_logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  }

  //Renderer
  return(
    <div className='container shadow rounded p-3 mt-5'>
      {is_login ?(
        <div>
          <Profile user={user} is_login={is_login}/>
        </div>
      ):(
        <div>
          <h1 className='text-success'>Connexion</h1>
            <form onSubmit={user_login}>
              <div className='mt-3'>
                <label htmlFor='email'>Email</label>
                <input 
                    type='email'
                    placeholder='test@test.com'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mt-3'>
                <label htmlFor='password'>Mot de passe</label>
                <input 
                    type='password'
                    placeholder='Mot2P@asse'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {erreur && <p><em>{erreur}</em></p>}
              <button type='submit' className='btn btn-success mt-3'>Se connecter</button>
              <hr/>
                  <p>Vous êtes nouveau ?</p>
                  <a href={'/inscription'}>S'incrire</a>
              <hr/>
            </form>
        </div>
      )}

      
      

  </div>
  )
}


export default Login;
