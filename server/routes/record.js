const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will connect us to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Return all documents from all collections for drop-down list component
recordRoutes.route("/").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb("foodbasket");

    // const projection = { title: 1, _id: 0, price: 1 };

    // Query Meat Department Collection
    const meatDepartmentsCollection = 
      db_connect.collection("meatdepartments");
    const resultMeatDepartments = await meatDepartmentsCollection
      .find({ title: { $ne: "Chicken Drumstick" } })
      .toArray();


    // Query Bakery Department Collection
    const bakeryDepartmentsCollection =
      db_connect.collection("bakerydepartments");
    const resultBakeryDepartments = await bakeryDepartmentsCollection
      .find({})
      .toArray();

    // Query Produce Department Collection
    const produceDepartmentsCollection =
      db_connect.collection("producedepartments");
    const resultProduceDepartments = await produceDepartmentsCollection
      .find({})
      .toArray();

    // Query Canned and Dry Department Collection
    const cannedAndDryDepartmentsCollection = db_connect.collection(
      "cannedanddrydepartments"
    );

    const resultCannedAndDryDepartments =
      await cannedAndDryDepartmentsCollection.find({}).toArray();

    // Query Frozen Food Department Collection
    const frozenFoodDepartments = db_connect.collection(
      "frozenfooddepartments"
    );
    const resultFrozenFoodDepartments = await frozenFoodDepartments
      .find({})
      .toArray();

    // Query Refrigerated Department Collection
    const refrigeratedFoodSections = db_connect.collection(
      "refrigeratedfoodsections"
    );
    const resultRefrigeratedFoodSections = await refrigeratedFoodSections
      .find({})
      .toArray();

    // Combine ALL results from collections
    const combinedResults = [
      ...resultMeatDepartments,
      ...resultBakeryDepartments,
      ...resultProduceDepartments,
      ...resultCannedAndDryDepartments,
      ...resultFrozenFoodDepartments,
      ...resultRefrigeratedFoodSections,
    ];

    console.log(
      "Total number of documents in this database: " + combinedResults.length
    );

    // Order result alphabetically
    combinedResults.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    // Remove duplicated results
    const uniqueNames = {};

    const filteredArray = combinedResults.filter((obj) => {
      if (!uniqueNames[obj.title]) {
        uniqueNames[obj.title] = true;
        return true;
      }
      return false;
    });

    // encodeURIComponent(filteredArray);

    // Continue with the sorting, filtering, and response sending logic...

    // console.log(filteredArray[0]);
    // console.log(filteredArray.length + " products in the basket");
    // console.log("Sending response:", filteredArray);

    res.json(filteredArray);
  } catch (error) {
    console.error("Error querying collections:", error);
    res.status(500).send("Internal Server Error");
  }
});

recordRoutes.route("/test").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb("foodbasket");

    const projection = { title: 1, _id: 0, price: 1, url: 1 };

    // Query ONLY the title of docs from the second collection
    const produceDepartments = db_connect.collection("producedepartments");

    /* create lowestPricePer100g and averagePricePer100g field */
    /* create lowestPricePer100g and averagePricePer100g field */
    /* create lowestPricePer100g and averagePricePer100g field */

    const updateField = [
      {
        $group: {
          _id: "$title",
          lowestPrice: { $min: "$pricePer100g" },
          totalPrice: { $sum: "$pricePer100g" },
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
      {
        $project: {
          _id: 1,
          lowestPrice: 1,
          averagePricePer100g: { $divide: ["$totalPrice", "$count"] },
        },
      },
      {
        $project: {
          _id: 1,
          lowestPrice: 1,
          averagePricePer100g: { $round: ["$averagePricePer100g", 4] },
        },
      },
    ];

    const resultAggregation = await produceDepartments
      .aggregate(updateField)
      .toArray();

    // Update all documents in the collection
    const resultAdded = await produceDepartments.updateMany({}, [
      {
        $set: {
          lowestPricePer100g: {
            $first: "$lowestPrice",
          },
          averagePricePer100g: {
            $first: "$averagePricePer100g",
          },
        },
      },
    ]);

    // Retrieve and modify all documents in the collection
    const resultProduceDepartments = await produceDepartments
      .find({})
      .toArray();

    const combinedResults = resultProduceDepartments.map((doc) => {
      const matchingAggregationResult = resultAggregation.find(
        (aggr) => aggr._id === doc.title
      );
      doc.lowestPricePer100g = matchingAggregationResult
        ? matchingAggregationResult.lowestPrice
        : null;
      doc.averagePricePer100g = matchingAggregationResult
        ? matchingAggregationResult.averagePricePer100g
        : null;
      return doc;
    });

    console.log(combinedResults.length + " items");
    res.json(combinedResults);
  } catch (error) {
    console.error("Error querying collections:", error);
    res.status(500).send("Internal Server Error");
  }
});

recordRoutes.route("/details/:title").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb("foodbasket");
    const collectionNames = [
      "meatdepartments",
      "bakerydepartments",
      "producedepartments",
      "cannedanddrydepartments",
      "frozenfooddepartments",
      "refrigeratedfoodsections",
    ];

    const combinedResults = [];

    for (const collectionName of collectionNames) {
      const currentCollection = db_connect.collection(collectionName);

      // Your existing aggregation pipeline
      const updateField = [
        {
          $group: {
            _id: "$title",
            lowestPrice: { $min: "$pricePer100g" },
            totalPrice: { $sum: "$pricePer100g" },
            count: { $sum: 1 }, // Count the number of documents in each group
          },
        },
        {
          $project: {
            _id: 1,
            lowestPrice: 1,
            averagePricePer100g: { $divide: ["$totalPrice", "$count"] },
          },
        },
        {
          $project: {
            _id: 1,
            lowestPrice: 1,
            averagePricePer100g: { $round: ["$averagePricePer100g", 3] },
          },
        },
      ];

      const resultAggregation = await currentCollection
        .aggregate(updateField)
        .toArray();

      // Retrieve and modify all documents in the current collection
      const resultDocuments = await currentCollection
        .find({})
        .sort({ pricePer100g: -1 })
        .toArray();

      const combinedResultsForCollection = resultDocuments.map((doc) => {
        const matchingAggregationResult = resultAggregation.find(
          (aggr) => aggr._id === doc.title
        );
        doc.lowestPricePer100g = matchingAggregationResult
          ? matchingAggregationResult.lowestPrice
          : null;
        doc.averagePricePer100g = matchingAggregationResult
          ? matchingAggregationResult.averagePricePer100g
          : null;
        return doc;
      });

      combinedResults.push(...combinedResultsForCollection);
    }

    // Order result alphabetically
    combinedResults.sort((a, b) => a.title.localeCompare(b.title));

    // Remove duplicated results
    const uniqueNames = {};
    const filteredArray = combinedResults.filter((obj) => {
      if (!uniqueNames[obj.title]) {
        uniqueNames[obj.title] = true;
        return true;
      }
      return false;
    });

    // IT QUERIES ALL DOCUMENTS, BUT RENDERS ONLY THE FIRST ONE
    const title = req.params.title;
    const selectedDocument = filteredArray.find((doc) => doc.title === title);

    if (!selectedDocument) {
      res.status(404).json({ error: "Document not found" });
    } else {
      res.json(selectedDocument);
      // console.log("User selected:" + selectedDocument);
    }
  } catch (error) {
    console.error("Error querying collections:", error);
    res.status(500).send("Internal Server Error");
  }
});

recordRoutes.route("/record-count").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb("foodbasket");
    const collectionNames = [
      "meatdepartments",
      "bakerydepartments",
      "producedepartments",
      "cannedanddrydepartments",
      "frozenfooddepartments",
      "refrigeratedfoodsections",
    ];

    let resultAggregation = [];
    const combinedResults = [];

    for (const collectionName of collectionNames) {
      const currentCollection = db_connect.collection(collectionName);

      // Check if the savedDate field exists in the documents
      const hasSavedDateField = await currentCollection.findOne({ date: { $exists: true } });

      if (hasSavedDateField) {
        // Calculate daysSinceSaved for each document in the collection
        const result = await currentCollection
          .aggregate([
            {
              $project: {
                daysSinceSaved: {
                  $divide: [
                    {
                      $subtract: [
                        new Date(),  // Current date
                        "$date"  // Document's saved date
                      ]
                    },
                    1000 * 60 * 60 * 24  // Convert milliseconds to days
                  ]
                }
              }
            }
          ])
          .toArray();

        resultAggregation.push(...result);

        // Retrieve and modify all documents in the current collection
        const resultDocuments = await currentCollection.find({}).toArray();

        combinedResults.push(...resultDocuments);
      }
    }

    // Find the document with the maximum daysSinceSaved value
    const maxDaysDocument = resultAggregation.reduce((maxDoc, currentDoc) => {
      return currentDoc.daysSinceSaved > maxDoc.daysSinceSaved ? currentDoc : maxDoc;
    }, { daysSinceSaved: -Infinity }); // Initialize with a very small value

    const roundeddaysCount = Math.ceil(maxDaysDocument.daysSinceSaved);


    const combinedResultsFinal = {
      recordsOfData: combinedResults.length,
      daysCount: roundeddaysCount
    };

    res.json(combinedResultsFinal);
  } catch (error) {
    console.error("Error querying collections:", error);
    res.status(500).send("Internal Server Error");
  }
});

recordRoutes.route("/price/:title").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb("foodbasket");
    const allDepartments = [
      "meatdepartments",
      "bakerydepartments",
      "producedepartments",
      "cannedanddrydepartments",
      "frozenfooddepartments",
      "refrigeratedfoodsections",
    ];

    let combinedResults = [];

    for (const department of allDepartments) {
      const collection = db_connect.collection(department);
      const departmentResults = await collection.find({ title: req.params.title }).toArray();
      combinedResults = [...combinedResults, ...departmentResults];
    }

    console.log("Total number of documents for title " + req.params.title + ": " + combinedResults.length);

    combinedResults.sort((a, b) => a.title.localeCompare(b.title));

    const uniqueNames = {};
    const filteredArray = combinedResults.filter((obj) => {
      if (!uniqueNames[obj.title]) {
        uniqueNames[obj.title] = true;
        return true;
      }
      return false;
    });

    const resultWithAvgPricePerMonth = filteredArray.map((product) => {
      const avgPricePerMonth = calculateAvgPricePerMonth(product, combinedResults);
      return {
        ...product,
        avgPricePerMonth,
      };
    });

    res.json(resultWithAvgPricePerMonth);
  } catch (error) {
    console.error("Error querying collections:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Helper function to calculate average pricePer100g for every month
function calculateAvgPricePerMonth(product, allProducts) {
  try {
    const pricesPerMonth = {};

    for (const entry of allProducts) {
      const date = new Date(entry.date);

      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      if (!pricesPerMonth[monthYear]) {
        pricesPerMonth[monthYear] = [];
      }

      // Only consider entries with the same title
      if (entry.title === product.title) {
        pricesPerMonth[monthYear].push(entry.pricePer100g);
      }
    }

    const avgPricePerMonth = {};

    for (const [monthYear, prices] of Object.entries(pricesPerMonth)) {
      const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      avgPricePerMonth[monthYear] = averagePrice.toFixed(2); // Adjust decimal places if needed
    }

    return avgPricePerMonth;
  } catch (error) {
    console.error("Error calculating average pricePer100g per month:", error);
    return {};
  }
}

module.exports = recordRoutes;
