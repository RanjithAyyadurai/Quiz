import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi ({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery ({
    // base url of backend API
    baseUrl: 'http://localhost:5000/',
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, {getState}) => {
      // console.log("auth: ",getState ().auth);
      const token = getState ().auth.userToken;
      // console.log (token);
      if (token) {
        // include token in req header
        headers.set ('x-access-token', `${token}`);
        return headers;
      }
    },
  }),
  endpoints: builder => ({
    getUserDetails: builder.query ({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetUserDetailsQuery} = authApi;
