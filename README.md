##Food Delivery Backend – Cloud Native Microservices
#Overview
This project is a cloud-native Food Delivery backend built using a microservices architecture.
The system is divided into three services:
restaurant-service
menu-service
order-service
All services are connected through an API Gateway (Nginx) and run using Docker Compose.
The order-service stores order data in Firebase Firestore to ensure that data is persistent even after restarting the containers.

##Architecture
#The system uses an API Gateway as the single entry point (port 8080).
Each service runs independently inside a Docker network and communicates using REST APIs.
When creating an order, the order-service first calls the menu-service to validate that the requested item exists.
If valid, the order is stored in Firestore.
The architecture diagram is included in the file architecture-diagram.png.

##How to Run the Project
#-Requirements:
    #Docker
    #Docker Compose
#-Steps:
#1.Clone the repository.
2.Add your Firebase serviceAccountKey.json file inside the order-service folder.
3.Run the command:
docker-compose up --build
4.The API will be available at:
http://localhost:8080
All requests must go through port 8080 (the API Gateway).

#Available Endpoints
-Restaurants
GET /restaurants
GET /restaurants/:id
-Menus
GET /menus/:restaurantId
GET /menus/item/:id
-Orders
POST /orders
GET /orders
-Gateway
GET /gateway/health

#Cloud Integration
The order-service uses Google Firebase Firestore to store order data.
Orders are saved in the "orders" collection.
Data remains stored even if the Docker containers are restarted.

#Observability
The API Gateway generates an X-Correlation-ID for every request.
This ID is forwarded to the internal services and logged to help trace requests across the system.

#Testing
A Postman collection file (postman-collection.json) is included in the repository.
You can import it into Postman to test all endpoints through port 8080.

#Environment Configuration
Ports and service URLs are configured using environment variables inside docker-compose.yml.
The serviceAccountKey.json file is not included in the repository for security reasons.
