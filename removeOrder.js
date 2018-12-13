const CosmosClient = require("@azure/cosmos").CosmosClient; 

module.exports = async function (context, req) {

    var CosmosDb_Endpoint = "https://ordersdemodb.documents.azure.com:443";
    var CosmosDb_Key = "gWzgiEjOGhJykW2DMpQhtRIX7FEcIZ04Ik2JGQbELw47VPdZquN9zueqPdsgoYGdGXP6Vuuv9a2EfG9LDLbD0g==";

    var databaseId = "Orders"
    var collectionId = "Cart"

    var client = new CosmosClient({ endpoint: CosmosDb_Endpoint, auth: { masterKey: CosmosDb_Key }});

    var database = await client.database(databaseId);
    var collection = await database.container(collectionId);

    const query = {
        query: "SELECT * FROM Cart c WHERE c.orderId = @orderId",
        parameters: [
            {
                name: "@orderId",
                value: parseInt(req.query.orderId)
            }
        ]
    };

    var items = await collection.items.query(query).toArray();
    if (items.result.length == 1) {
        const item = await collection.item(items.result[0].id, items.result[0].orderId);
        await item.delete();

        context.res = {
            status: 204
        };
    }
};