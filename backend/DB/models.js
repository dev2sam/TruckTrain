module.exports = function (schemas, mongoose) {

    const Drivers = mongoose.model("Drivers", schemas.DriversSchema, "Drivers")
    const Trains = mongoose.model("Trains", schemas.TrainsSchema, "Trains")
    const Stations = mongoose.model("Stations", schemas.StationsSchema, "Stations")
    const Routes = mongoose.model("Routes", schemas.RoutesSchema, "Routes")
    const Temporary_restrictions = mongoose.model("Temporary_restrictions", schemas.Temporary_restrictionsSchema, "Temporary_restrictions")
    const Signals_crossings = mongoose.model("Signals_crossings", schemas.Signals_crossingsSchema, "Signals_crossings")

    return ({
        Drivers: Drivers,
        Trains: Trains,
        Stations: Stations,
        Routes: Routes,
        Temporary_restrictions: Temporary_restrictions,
        Signals_crossings: Signals_crossings
    });

}