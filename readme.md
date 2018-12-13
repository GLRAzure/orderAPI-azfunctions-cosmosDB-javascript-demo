# Azure Function Cosmos Db Demo
The following project outlines a simple Order API demo that uses Azure Functions and saves data in Azure Cosmos Db SQL API. Once the code in this is deployed a user can perform the following tasks:
1. Create or Remove an Order
2. Add or Remove a Product from an Order

There are 5 JavaScript files in this demo, each of which can be copied into a JavaScript function in the Azure Portal.

## Before you begin

Before you complete this demo I recomend reviewing the following tutorials and concepts, it will certainly make the demo more clear as I do not go into the details presented in these overviews.

1. How to create and run an HTTPTriggered Function in the Azure Portal. https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function

2. How to create a Cosmos Db SQL Instance https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-nodejs

# Getting Started

## Step 1: Create a Cosmos Db SQL Instance

You can use the Azure Cli to create an instance or create the instance in the Portal.
```
az group create --name RESOURCE_GROUP_NAME --location eastus2

az cosmosdb create --name COSMOS_DB_NAME --resource-group RESOURCE_GROUP_NAME

az cosmosdb database create --db-name root --url-connection COSMOS_URI --key COSMOS_KEY

az cosmosdb collection create --collection-name orders --db-name root --partition-key-path "/id" --throughput 400 --url-connection COSMOS_URI --key COSMOS_KEY
```

Once the Cosmos Db SQL Instance is created, copy the **URI** and the **PRIMARY KEY** you will need these later.

## Step 2: Create an Azure Function App

Inside the Azure Portal select **Create a resource** > **Compute** > **Function App** when the function app blade opens be sure the Runtime Stack is set to JavaScript.

## Step 3: Create the Functions

Once you have the Function app created you can begin to create the functions for your API.

Create the following functions (All are Http Triggered Functions) also be sure to set the Access level to Anonymous.

1. CreateOrder
2. GetOrderById
3. AddItemToOrder
4. RemoveItemFromOrder
5. RemoveOrder

once the functions are created you can copy the code from the JavaScript files into the Functions with the corresponding names.

### NOTE: Be sure to save each function after you copy code into it, otherwise the code you copy will not run.

## Step 4: Test the Functions

I recomend using a tool like postman to test the functions, in this repository you can find a collection of postman scripts that can be used to test the functions: https://github.com/GLRAzure/orderAPI-azfunctions-cosmosDB-javascript-demo/blob/master/OrdersDemo.postman_collection.json

