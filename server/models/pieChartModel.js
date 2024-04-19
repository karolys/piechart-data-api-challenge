import pool from "../config/databaseConfig.js";

const generateQueryFilterFromParams = (workerIdList, locIdList, isTaskComplete) => {
    let sqlQueryFilterBuilder = [];
    let sqlQueryParams = [];
    let sqlQueryFilterBuilderString = "";

    if (workerIdList != null || locIdList != null || isTaskComplete != null) {
        if (workerIdList != null) {
            // We have Worker IDs to filter on, so add that WHERE clause
            sqlQueryFilterBuilder.push("w.id IN (?)");
            sqlQueryParams.push(workerIdList);
        }
        if (locIdList != null) {
            sqlQueryFilterBuilder.push("t.location_id IN (?)");
            sqlQueryParams.push(locIdList);
        }
        if (isTaskComplete != null) {
            // null is all tasks types, 0/1 are their respective values
            sqlQueryFilterBuilder.push("lt.is_task_complete = ?");
            sqlQueryParams.push(isTaskComplete);
        }

        sqlQueryFilterBuilderString = " WHERE " + sqlQueryFilterBuilder.join(" AND ") + ";";
    }

    return {
        queryParamList: sqlQueryParams,
        queryFilterString: sqlQueryFilterBuilderString
    };
}

export const retrievePieChartDataByWorker = async(workerIdList, locIdList, isTaskComplete) => {
    let conn = await pool.getConnection();
    let results;
    try {
        let sqlQuery = "SELECT\n" +
            "        t.location_id AS location_id,\n" +
            "        l.name AS location_name,\n" +
            "        lt.task_id AS task_id,\n" +
            "        w.id AS worker_id,\n" +
            "        w.username AS worker_name,\n" +
            "        w.hourly_wage,\n" +
            "        lt.time_seconds\n" +
            "    FROM logged_time lt\n" +
            "    JOIN tasks t ON lt.task_id = t.id\n" +
            "    JOIN locations l ON t.location_id = l.id\n" +
            "    JOIN workers w ON lt.worker_id = w.id\n";// +

        const queryFilterParams = generateQueryFilterFromParams(workerIdList, locIdList, isTaskComplete)
        sqlQuery = sqlQuery + queryFilterParams.queryFilterString;

        console.log(`Debug: SQL Query Statement: ${sqlQuery}`);
        console.log(`Debug: SQL Query Params: ` + JSON.stringify(queryFilterParams.queryParamList));
        results = await conn.query(sqlQuery, queryFilterParams.queryParamList);
        //console.log([results]);
    } finally {
        await conn.end();
        console.log("DB executed Select * from workers");
    }

    return results;
};

export const retrievePieChartDataByLocation = async() => {
    //TODO: This is probably unnecessary, though could tune main query to be more focused, less joins, improved performance
};

export const retrieveAllWorkers = async() => {
    let conn = await pool.getConnection();
    let results;
    try {
        results = await conn.query("SELECT * from workers");
        console.log([results]);
    } finally {
        await conn.end();
        console.log("DB executed Select * from workers");
    }

    return results;
};

export const retrieveAllLocations = async() => {
    let conn = await pool.getConnection();
    let results;
    try {
        results = await conn.query("SELECT * from locations");
        console.log([results]);
    } finally {
        await conn.end();
        console.log("DB executed Select * from locations");
    }

    return results;
};

export const retrieveAllTasks = async() => {
    let conn = await pool.getConnection();
    let results;
    try {
        results = await conn.query("SELECT * from tasks");
        console.log([results]);
    } finally {
        await conn.end();
        console.log("DB executed Select * from tasks");
    }

    return results;
};

export const retrieveAllLoggedTime = async() => {
    let conn = await pool.getConnection();
    let results;
    try {
        results = await conn.query("SELECT * from logged_time");
        console.log([results]);
    } finally {
        await conn.end();
        console.log("DB executed Select * from logged_time");
    }

    return results;
};