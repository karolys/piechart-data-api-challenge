import * as pieChartModel from "../models/pieChartModel.js";
import * as utils from "../utility/utility.js";

export const getPieChartDataByWorker = async (workerIdList, locIdList, isTaskComplete) => {
    const results = await pieChartModel.retrievePieChartDataByWorker(workerIdList, locIdList, isTaskComplete);
    let totalCost = 0;
    //TODO: Want to refactor this to use Map
    let workerCostMap = {};
    results.forEach( (resultRow) => {
        // TODO: Need to validate that columns exist, values returned make sense probably
        const workerId = resultRow["worker_id"];
        let taskCost = (resultRow["time_seconds"] / 360) * parseFloat(resultRow["hourly_wage"]);
        taskCost = utils.roundToTwoDecimals(taskCost);// Math.round( * 100) / 100;

        if (workerCostMap.hasOwnProperty(workerId)) {
            const currentCost = workerCostMap[workerId].cost;
            workerCostMap[workerId].cost = utils.roundToTwoDecimals(currentCost + taskCost);
        } else {
            workerCostMap[workerId] = {
                "name": resultRow["worker_name"],
                "cost": taskCost,
                "percentOfTotal": 0
            };
        }

        totalCost += taskCost;
    });

    for (let workerKey in workerCostMap) {
        workerCostMap[workerKey].percentOfTotal = utils.roundToTwoDecimals((workerCostMap[workerKey].cost / totalCost));// Math.round((workerCostMap[workerKey].cost / totalCost) * 100) / 100;
    }

    console.log("Worker Cost Map: " + JSON.stringify(workerCostMap));

    return {
        "totalResults": 0,
        "perPage": 0,
        "pageNum": 0,
        "data": workerCostMap
    };
}

export const getPieChartDataByLocation = async (workerIdList, locIdList, isTaskComplete) => {
    const results = await pieChartModel.retrievePieChartDataByWorker(workerIdList, locIdList, isTaskComplete);

    let totalCost = 0;
    //TODO: Want to refactor this to use Map
    let locationCostMap = {};
    results.forEach( (resultRow) => {
        // TODO: Need to validate that columns exist, values returned make sense probably
        const locationId = resultRow["location_id"];
        let taskCost = (resultRow["time_seconds"] / 360) * parseFloat(resultRow["hourly_wage"]);
        taskCost = utils.roundToTwoDecimals(taskCost);// Math.round( * 100) / 100;

        if (locationCostMap.hasOwnProperty(locationId)) {
            const currentCost = locationCostMap[locationId].cost;
            locationCostMap[locationId].cost = utils.roundToTwoDecimals(currentCost + taskCost);
        } else {
            locationCostMap[locationId] = {
                "name": resultRow["location_name"],
                "cost": taskCost,
                "percentOfTotal": 0
            };
        }

        totalCost += taskCost;
    });

    for (let locationKey in locationCostMap) {
        locationCostMap[locationKey].percentOfTotal = utils.roundToTwoDecimals((locationCostMap[locationKey].cost / totalCost));
    }

    console.log("Location Cost Map: " + JSON.stringify(locationCostMap));

    return {
        "totalResults": 0,
        "perPage": 0,
        "pageNum": 0,
        "data": locationCostMap
    };
}

export const findAllWorkers = () => {
    return pieChartModel.retrieveAllWorkers();
}

export const findAllLocations = () => {
    return pieChartModel.retrieveAllLocations();
}

export const findAllTasks = () => {
    return pieChartModel.retrieveAllTasks();
}