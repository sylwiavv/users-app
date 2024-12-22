# App with users

### Running project locally

Clone the project, enter root project directory and run:
```
npm install
```

### For start locally server (it is required for app to work), run:
```
npx json-server --watch db.json --port 3000
```

### After that, run:
```
npm run build
npm run start
```
Go to the http://localhost:8080/signin

If this link will be not right you should see a local address in your termnal under which the application is served.

### Login credentials

Admin:
```
 admin@op.pl / Password: test123
```

Users:
```
robin@op.pl / Password: test123
shakira@op.pl / Password: test123
syl@op.pl / Password: test123
```

### Features
* Data is fetched from db.json.



### TODO
* add snackbars after error and success state
* reload settings page when admin change role to the employee or hr
* on edit general details user add fetch managers from db
* remove token after logg out