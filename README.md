Frontend -  Angular 12
Backend - Laravel 8

Steps to setup project on local

Backend -

Open the project root directory event-ticketing-app in code editor and create a new database on your local and update the .env file accordingly
Open terminal and go to the project root directory event-ticketing-app
run command - php artisan config:cache
run command - composer install to install the packages
run command - php artisan migrate
run command - php artisan db:seed


Frontend - 
Open terminal  and go to the directory event-ticketing-frontend inside the project root directory event-ticketing-app
you need to install angular cli and node on your system
you can download and install node from node official website
you can install angular cli using the command - npm install -g @angular/cli
run command - npm install
then run ng serve to run frontend development server
it will give the local url = localhost:4200 to run project in browser , copy and run in the app in the browser

Node server - 
open terminal , go to directory node-socket inside root directory
run command npm install
then run command npm run serve to run node server