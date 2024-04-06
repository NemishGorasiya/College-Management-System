# Important Note

- To send any of the request - add the frontend domain into the backend .env file with a `,`
- To send any request from the frontend - add below options to the requestOptions  

```javascript
  // Define the config for the request
const config = {
  withCredentials: true,
  credentials: 'include'
};

// Make the POST request with Axios
axios.post(url, data, config)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

```
