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

            const order = items.result[0];
            order.contents.push(req.body);
            console.log(order);

            const item = await collection.item(order.id, order.orderId);
            await item.replace(order);

            context.res = {
                status: 200,
                body: order
            };
        }
    }
};