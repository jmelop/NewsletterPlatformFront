import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogUser, User } from '../../models/users/user.model'
import axios from 'axios';
import { stringify } from '@angular/compiler/src/util';



const apiUrl = `${environment.apiUrl}register/`
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  postUser(user: User) {
    return axios.post(apiUrl, user, options)
      .then(res => res.data)
      .catch((err) => {
        throw err
      });
  }
}




// getUser(name: string, password: string): Promise<User> {
//   const user= {
//     name: name,
//     password: password
//   }
//   return axios.get<User>(apiUrl, user)
// .then(user => user.name)
// .then(user => user.password)
// }

// }

// loadOnePokedex(name : string) : Promise<PokemonEntry[]> {
// return axios.get<singlePokedex>(`https://pokeapi.co/api/v2/pokedex/${name}`)
// .then(pok => pok.data)
// .then(pok => pok.pokemon_entries);
// }