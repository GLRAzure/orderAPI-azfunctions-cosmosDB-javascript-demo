const CosmosClient = require("@azure/cosmos").CosmosClient; 

module.exports = async function (context, req) {

    var CosmosDb_Endpoint = "https://ordersdemodb.documents.azure.com:443";
    var CosmosDb_Key = "gWzgiEjOGhJykW2DMpQhtRIX7FEcIZ04Ik2JGQbELw47VPdZquN9zueqPdsgoYGdGXP6Vuuv9a2EfG9LDLbD0g==";

    var databaseId = "Orders"
    var collectionId = "Cart"

    var client = new CosmosClient({ endpoint: CosmosDb_Endpoint, auth: { masterKey: CosmosDb_Key }});

    if (req.body) {
        var database = await client.database(databaseId);
        var collection = await database.container(collectionId);
        var collectionResponse = await collection.items.create(req.body);  
    }
};