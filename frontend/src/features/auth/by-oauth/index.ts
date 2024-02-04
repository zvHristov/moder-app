
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldTypeI } from 'pages/auth/auth';
/// share/constants
//config fetch logic
const baseURL = 'http://localhost:8080/api/v1'; //'/api/v1

const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, config] = args;
  //console.log(config, 'config')
  /// can manipulate the headers of incoming HTTP requests through HTTP request header modification rules
  ///programming principles for overriding request headers
  ///Sets the value of an Beers 
  let response = await originalFetch(resource, config);
  console.log(response.status, 'response.status')
  if (
        !response.ok && response.status === 404 ||
        !response.ok && response.status === 401 
    ) {
        // 404 refresh token handling
        if (response.status === 401 ) {
            const res: any = fetch(`${baseURL}/refresh`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, body: (localStorage.getItem('token'))
            })
            .then(response => response.json());
            //console.log(res, 'response after refresh');
            if (!res) {
                localStorage.setItem('token', res.refreshToken);
            }

        }
    // 404 error handling
    return Promise.reject(response);
  }
  return response;
};

export const signUp = createAsyncThunk(
    '/auth/signup',
    async ({ name, email, password }: FieldTypeI ,  { rejectWithValue }) => {
        try {
           
            const request = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password }),
            };
            
            const response = await fetch(`${baseURL}/auth/signup`, request).then(res => res.json());
            // console.log(response, 'responese')
            // // store user token in local storage
            response && localStorage.setItem('token', response.refreshToken);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const signIn = createAsyncThunk(
    '/auth/signin',
    async ({ email, password }: FieldTypeI ,  { rejectWithValue }) => {
        try {
            const request = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password }),
            };
            const response = await fetch(`${baseURL}/auth/signin`, request).then(res => res.json());
       
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }

)



export const logOut = createAsyncThunk(
   'logout', async () => {
        try {
            const request = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            const response = await fetch(`${baseURL}/auth/logout`, request).then(res => res.json());
            // console.log(response, 'responese')
            // Remove sensitive data from localStorage:
            localStorage.removeItem('sensitiveData1');
            localStorage.clear();
            return response;
        } catch (error) {
            console.log(error);
           
        }
   }

)