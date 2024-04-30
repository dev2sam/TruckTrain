module.exports = function (mongoose) {

    const DriversSchema = new mongoose.Schema({
        Driver_ID: String,
        Driver_img: String,
        Driver_name: String,
        Driver_email: String,
        Driver_password: String,
        Assigned_train_ID: String
    });

    const TrainsSchema = new mongoose.Schema({
        Train_ID: String,
        Num_of_crew: Number,
        Loading_gauge: new mongoose.Schema({
            width: Number,        //m
            height: Number,       //m
            min_weight: Number,   //kg
            max_weight: Number    //kg
        }),
        Operating_route_ID: String,
        Current_location_coordinates: [Number],
        Current_speed: Number,
        Departure_time: String,
        Estimated_arrival_time: String,
        Origin_station: String,   //ID
        Destination_station: String  //ID
    });

    const StationsSchema = new mongoose.Schema({
        Station_ID: String,
        Station_name: String,
        coordinates: [Number]
    });

    const RoutesSchema = new mongoose.Schema({
        Route_ID: String,
        Normal_running_speed: Number,   //mph
        Origin: {
            name: String,
            coordinates: [Number]
        },
        Destination: {
            name: String,
            coordinates: [Number]
        },
        gradients: [{
            coordinates_from: [Number],
            coordinates_to: [Number],
            slope_angle: Number
        }],
        curvatures: [{
            coordinates_from: [Number],
            coordinates_to: [Number],
            curve_radius: Number
        }],
        points_switches: [{
            coordinates: [Number],
            turn: { type: String, enum: ['Left', 'Right'] },
            connects_to: String // Another track ID or Route ID
        }]
    });

    const Temporary_restrictionsSchema = new mongoose.Schema({
        Route_ID: String,
        coordinates_from: [Number],
        coordinates_to: [Number],
        Start_time: String,
        End_time: String,
        description: String
    });

    const Signals_crossingsSchema = new mongoose.Schema({
        Route_ID: String,
        coordinates: [Number],
        status: { type: String, enum: ['Proceed', 'Stop', 'Proceed with caution'] }
    });


    return ({
        DriversSchema: DriversSchema,
        TrainsSchema: TrainsSchema,
        StationsSchema: StationsSchema,
        RoutesSchema: RoutesSchema,
        Temporary_restrictionsSchema: Temporary_restrictionsSchema,
        Signals_crossingsSchema: Signals_crossingsSchema
    });

}