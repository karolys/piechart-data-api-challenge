import * as pieChartService from '../services/pieChartService.js';

export const getPieChartDataByWorker = async(req, res) => {
    try {
        //TODO: Pagination?
        const workerIdListParam = (req.query.onlyWorkers)? req.query.onlyWorkers : null;
        const locationIdListParam = (req.query.onlyLocations)? req.query.onlyLocations : null;
        const taskStatusFilterParam = (req.query.onlyStatus)? parseInt(req.query.onlyStatus) : null;

        console.log(`Debug: Request Params Received: [${workerIdListParam}, ${locationIdListParam}, ${taskStatusFilterParam}]`)

        const workersData = await pieChartService.getPieChartDataByWorker(workerIdListParam, locationIdListParam, taskStatusFilterParam);
        res.json(workersData);
    } catch(error) {
        console.log("Error in getPieChartDataByWorker: " + error.message);
        res.status(500).send(error.message);
    }
};

export const getPieChartDataByLocation = async(req, res) => {

    try {
        const workerIdListParam = (req.query.onlyWorkers)? req.query.onlyWorkers : null;
        const locationIdListParam = (req.query.onlyLocations)? req.query.onlyLocations : null;
        const taskStatusFilterParam = (req.query.onlyStatus)? parseInt(req.query.onlyStatus) : null;

        const locationsData = await pieChartService.getPieChartDataByLocation(workerIdListParam, locationIdListParam, taskStatusFilterParam);

        res.json(locationsData);
    } catch(error) {
        console.log("Error in getPieChartDataByLocation: " + error.message);
        res.status(500).send(error.message);
    }
};

export const getWorkers = async(req, res) => {
    try {
        //TODO: Pagination?
        const workers = await pieChartService.findAllWorkers();
        console.log(`workers: ${workers}`);
        res.json(workers);
    } catch(error) {
        console.log("Error getting Worker Names from pieChartService");
        res.status(500).send(error.message);
    }
};

export const getLocations = async(req, res) => {
    try {
        //TODO: Pagination?
        const workers = await pieChartService.findAllLocations();
        console.log(`workers: ${workers}`);
        res.json(workers);
    } catch(error) {
        console.log("Error getting Worker Names from pieChartService");
        res.status(500).send(error.message);
    }
};

export const getTasks = async(req, res) => {
    try {
        //TODO: Pagination?
        const workers = await pieChartService.findAllTasks();
        console.log(`workers: ${workers}`);
        res.json(workers);
    } catch(error) {
        console.log("Error getting Worker Names from pieChartService");
        res.status(500).send(error.message);
    }
};

