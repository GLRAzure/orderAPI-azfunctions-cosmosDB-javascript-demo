const CosmosClient = require("@azure/cosmos").CosmosClient; 

module.exports = async function (context, req) {

    var CosmosDb_Endpoint = "YOUR_COSMOS_DB_URI";
    var CosmosDb_Key = "YOUR_COSMOS_DB_PRIMARY_KEY";

    var databaseId = "YOUR_COSMOS_DB_DATABASE_NAME";
    var collectionId = "YOUR_COSMOS_DB_COLLECTION_NAME";

    var client = new CosmosClient({ endpoint: CosmosDb_Endpoint, auth: { masterKey: CosmosDb_Key }});

    if (req.body) {
        var database = await client.database(databaseId);
        var collection = await database.container(collectionId);
        var collectionResponse = await collection.items.create(req.body);  
    }
};