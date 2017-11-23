import { api } from './Api'
import {
  GET_PAGE
} from './ApiConstants'

export function getPage() {
  return api._get(`${GET_PAGE}`).then(response => {
    console.log('APIFunctions - getPage - ',response);
    return response;
  }).catch((error) => {
    return error;
  });
}
