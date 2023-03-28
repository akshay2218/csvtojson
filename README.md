# CSV To JSON

## how to run the application

Run `cd csvTojson`
Run `npm i`
Run `npm install -g sequelize-cli`
Run `sequelize db:migrate --config ./config/config.json`
Run `CSV_FILE_PATH='./files/sample.csv' node index.js`

### How to test APIs

- mehtod = get
- url = `http://localhost:3000/api/v1/user`  
- description = This API converts the contents of an CSV file into a JSON format. Then he adds information to the User table. 


- method = get 
- url = `http://localhost:3000/api/v1/user/calculate/age/distribution`
- description = This endpoint is calculating the age distribution of users based on age groups.

### Assumptions
The system must be running instances of git, nodeJs (v14.17.6), npm (v6.14.15), and postgresql (v11). Also, find database configuration from config/config.json file.