I used .env file to change the port of our backend server
We put our intended server port to .env so noone knows our Port and cannot 
have any ideas on hacking this.

And in frontend I used vite.config.mjs server > proxy > /api 
Because frontend interacts with backend via '/api' proxy and vite.config as we use Vite is the place to set it.