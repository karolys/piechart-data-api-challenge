import express from "express";

import * as pieChartsController from "./controllers/pieChartsController.js";

const app = express();
const port = 3000;

async function main() {

  app.get("/", (req, res) => {
    res.send("Hello!");
  });

  app.get("/getWorkers", pieChartsController.getWorkers);

  app.get("/getLocations", pieChartsController.getLocations);

  app.get("/getTasks", pieChartsController.getTasks);

  app.get("/pieChartByWorker", pieChartsController.getPieChartDataByWorker);

  app.get("/pieChartByLocation", pieChartsController.getPieChartDataByLocation);

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
