const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');


const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());
const server = app.listen(8939);

// Database
require('./DB/connection')(mongoose);
const schemas = require('./DB/schemas')(mongoose);
const models = require('./DB/models')(schemas, mongoose);
require('./DB/loadInitialData')(models);

// sockets
const io = socketio(server, {
    cors: { origin: '*' },
    maxHttpBufferSize: 1e8
});
require('./sockets/socketHandler')(io);

// test endpoint
app.get('/', (req, res) => res.send('Hi'));


// fetch all the train data
app.get('/fetchAllTrains', async (req, res) => {
    try {
        await models['Trains'].find({}).select('Train_ID Operating_route_ID Origin_station Destination_station Departure_time')
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    } catch (error) {
        await res.status(500).send(error);
    }
});

// get the route details for a particular train using route id
app.post('/getRouteDetails', async (req, res) => {
    try {
        const routeId = req.body.id;
        const routeDetailsWithSignals = await models['Routes'].aggregate([
            { $match: { Route_ID: routeId } }, // Match documents based on Route_ID
            { $project: { _id: 0 } }, // Project fields, excluding _id
            {
                $lookup: {  // Lookup signal crossings for the route
                    from: 'Signals_crossings',
                    localField: 'Route_ID',
                    foreignField: 'Route_ID',
                    as: 'signalCrossings'
                }
            },
            {
                $lookup: {  // Lookup temporary restrictions for the route
                    from: 'Temporary_restrictions',
                    localField: 'Route_ID',
                    foreignField: 'Route_ID',
                    as: 'temporaryRestrictions'
                }
            },
            {
                $project: {
                    _id: 0,
                    Route_ID: 1,
                    Normal_running_speed: 1,
                    Origin: 1,
                    Destination: 1,
                    gradients: 1,
                    curvatures: 1,
                    points_switches: 1,
                    signalCrossings: {
                        $map: {
                            input: "$signalCrossings",
                            as: "signal",
                            in: {
                                coordinates: "$$signal.coordinates",
                                status: "$$signal.status"
                            }
                        }
                    },
                    temporaryRestrictions: {
                        $map: {
                            input: "$temporaryRestrictions",
                            as: "temporaryRestriction",
                            in: { // keep everything instead of route id as its already present
                                $mergeObjects: [
                                    "$$temporaryRestriction",
                                    {
                                        _id: "$$REMOVE",
                                        Route_ID: "$$REMOVE"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]);

        if (routeDetailsWithSignals.length === 0) {
            await res.status(404).send('Route not found');
        } else {
            await res.status(200).send(routeDetailsWithSignals);
        }

    } catch (error) {
        await res.status(500).send(error);
    }
});

// update train coordinates as they move
app.post('/updateTrainCoordinates', async (req, res) => {
    try {
        const model = await models['Trains'];
        await model.updateOne({ _id: req.body.id }, { $set: { Current_location_coordinates: req.body.coordinates } });
        await res.send(true);
    } catch (error) {
        await res.status(500).send(error);
    }
});

// update train speeds as they change
app.post('/updateTrainSpeed', async (req, res) => {
    try {
        const model = await models['Trains'];
        await model.updateOne({ _id: req.body.id }, { $set: { Current_speed: req.body.speed } });
        await res.send(true);
    } catch (error) {
        await res.status(500).send(error);
    }
});

// login authentication for train driver
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const model = await models['Drivers'];
        const driver = await model.findOne({ Driver_email: email });

        if (!driver) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else if (driver.Driver_password == password) {
            return res.status(200).json(driver.Driver_ID)
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

    } catch (error) {
        await res.status(500).send(error);
    }
});

// fetch driver details once they log in
app.post('/getDriverDetails', async (req, res) => {
    try {
        const model = await models['Drivers'];
        const driver = await model.findOne({ Driver_ID: req.body.driver_id });

        if (!driver) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            return res.status(200).json(driver);
        }

    } catch (error) {
        await res.status(500).send(error);
    }
});

// fetch trains details
app.post('/getTrainDetails', async (req, res) => {
    try {
        const model = await models['Trains'];
        const train = await model.findOne({ Train_ID: req.body.train_id });

        if (!train) {
            return res.status(401).json({ message: 'No trains found' });
        } else {
            return res.status(200).json(train);
        }

    } catch (error) {
        await res.status(500).send(error);
    }
});

// get station name
app.post('/getStationName', async (req, res) => {
    try {
        const model = await models['Stations'];
        const station = await model.findOne({ Station_ID: req.body.station_id }).select("-_id Station_name");
        return await res.status(200).json(station);
    } catch (error) {
        await res.status(500).send(error);
    }
});