module.exports = async function (io) {

    let drivers_active = {};

    io.use((socket, next) => {

        const sessionID = socket.handshake.auth.sessionID;

        if (sessionID) {

            socket.sessionID = sessionID;
            socket.id = sessionID;
            socket.name = socket.handshake.auth.username;

            return next();

        } else {

            const sessionID = socket.handshake.auth.sessionID;
            const id = socket.handshake.auth.id;
            const username = socket.handshake.auth.username;

            if (!username) {
                return next(new Error("invalid username"));
            }

            // create new session
            socket.sessionID = sessionID;
            socket.id = id;
            socket.name = username;

            return next();
        }

    });

    io.on('connection', socket => {

        // send session details to driver's admon panel
        socket.emit("session", {
            sessionID: socket.sessionID,
            socketID: socket.id,
            socketName: socket.name
        });

        // new driver becomes active, store in array
        socket.on('new-driver-joined', train_ID => {
            console.log(`New driver joined: ${train_ID}`);
            if (!Object.values(drivers_active).includes(train_ID)) {
                drivers_active[socket.id] = train_ID;
            }
        });

        // as the train moves, send realtime coordinates and speed to driver's admin panel
        socket.on('update-live-data-to-driver', data => {
            io.to(`${data.train_ID}`).emit('new-live-data', {
                coordinates: data.coordinates,
                distanceCovered: data.distanceCovered,
                speed: data.speed
            })
        });

        // driver disconnected, remove them from array
        socket.on('disconnect', () => {
            console.log(`Disconnecting: ${socket[socket.id]}`);
            delete socket.id;
        });

    });
}   