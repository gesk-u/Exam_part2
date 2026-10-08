I used index.js file to change the port of our backend server
It is the file that connects our server with DB and also internet.

And in frontend I used vite.config.mjs server > proxy > /api 
Because frontend interacts with backend via '/api' proxy and vite.config as we use Vite is the place to set it.