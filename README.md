# Virtual Disk for Storage Serve

Run 
````bash
npm run start
````

## How to use

### Create a new virtual storage

````bash
npm run start
````
This will create a new virtual storage in `./storage`.
- The storage is available at `http://localhost:4000`

- You modify package `./package.json` to change the port of the server host
Example:
````json

"scripts": {
    "start": "cd client && echo VITE_BACKEND_HOST=http://localhost:4000/api > .env && npm run build && cd .. && echo BACKEND_PORT=4000 > .env && node index.js"
  },
````


the backend is configured to query the files in the movies folder and queries the TMD api to download the information and the file covers, the client is being built to provide video playback in `http://localhost:4000/api/movies`.