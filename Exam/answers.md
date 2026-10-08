I used .env file to change the port of our backend server
We put our intended server port to .env so noone knows our Port and cannot 
have any ideas on hacking this.

And in frontend I used vite.config.mjs server > proxy > /api 
Because frontend interacts with backend via '/api' proxy and vite.config as we use Vite is the place to set it.

Q13 and Q14 explanation; in previous exam i have implemented authpage for both sign in and signup so i decide to leave it is this part. However,
For Q14 I have made signup page with useAuth hook that is not used in my frontend but is present in this repo for Q14.