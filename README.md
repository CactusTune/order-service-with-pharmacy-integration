# PHARMARCY ORDER API INTEGRATION

A TypeScript application for managing orders and integrating with external pharmacies. This application was built without any framework, and allows the creation of orders with products from different pharmacies.
## Cloning the repo

**NOTE:** Make sure you have Git installed on your system.

```bash
  # HTTPS
  $ git clone https://github.com/CactusTune/order-service-with-pharmacy-integration.git
  # SSH
  git@github.com:CactusTune/order-service-with-pharmacy-integration.git

  $ cd pharmacy-order-api
```

## Running locally - Docker

### Prerequisites

### Running the docker stack

For initial setup, run the following command in the root of the project(you can bind any port of your choice)

```bash
    $ docker build -t <image-name> .
    $ docker run -d -p <your-port>:3000 <image-name>
```

## Running locally - Manually with npm 

1. Clone this repository or download the source code.
2. Install the dependencies by running the following command: 
  ```bash
    $ npm install
  ```

3. Start the development server with the following command: 
 ```bash
    $ npm run dev
 ```

4. Start the main/production server with the following command
```bash
    $ npm run start
 ```

 ## Run unit Tests For correctness with Jest
 ```bash
    $ npm run test
 ```
