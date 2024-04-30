module.exports = async function (models) {

    const Drivers = [
        {
            "Driver_ID": "D001",
            "Driver_img": "https://source.unsplash.com/mens-blue-and-white-button-up-collared-top-DItYlc26zVI",
            "Driver_name": "John Smith",
            "Driver_email": "john.smith@gmail.com",
            "Driver_password": "password123",
            "Assigned_train_ID": "T001"
        },
        {
            "Driver_ID": "D002",
            "Driver_img": "https://source.unsplash.com/man-in-brown-leather-jacket-smiling-RGKdWJOUFH0",
            "Driver_name": "Alice Johnson",
            "Driver_email": "alice.johnson@gmail.com",
            "Driver_password": "securepass456",
            "Assigned_train_ID": "T002"
        },
        {
            "Driver_ID": "D003",
            "Driver_img": "https://source.unsplash.com/man-in-black-hoodie-wearing-black-framed-eyeglasses-3JmfENcL24M",
            "Driver_name": "David Lee",
            "Driver_email": "david.lee@gmail.com",
            "Driver_password": "driverpass789",
            "Assigned_train_ID": "T003"
        },
        {
            "Driver_ID": "D004",
            "Driver_img": "https://source.unsplash.com/woman-wearing-blue-denim-jacket-W7b3eDUb_2I",
            "Driver_name": "Emily Brown",
            "Driver_email": "emily.brown@gmail.com",
            "Driver_password": "brownie567",
            "Assigned_train_ID": "T004"
        },
        {
            "Driver_ID": "D005",
            "Driver_img": "https://source.unsplash.com/mens-gray-crew-neck-shirt-v2aKnjMbP_k",
            "Driver_name": "Michael Garcia",
            "Driver_email": "michael.garcia@gmail.com",
            "Driver_password": "mikepass123",
            "Assigned_train_ID": "T005"
        },
        {
            "Driver_ID": "D006",
            "Driver_img": "https://source.unsplash.com/a-woman-with-long-hair-and-a-black-shirt-Ud4bLEy4gC0",
            "Driver_name": "Sophia Martinez",
            "Driver_email": "sophia.martinez@gmail.com",
            "Driver_password": "sophia456",
            "Assigned_train_ID": "T006"
        },
        {
            "Driver_ID": "D007",
            "Driver_img": "https://source.unsplash.com/man-in-green-crew-neck-shirt-and-black-hat-pUhxoSapPFA",
            "Driver_name": "William Davis",
            "Driver_email": "william.davis@gmail.com",
            "Driver_password": "willpass789",
            "Assigned_train_ID": "T007"
        },
        {
            "Driver_ID": "D008",
            "Driver_img": "https://source.unsplash.com/smiling-woman-in-green-jacket-LnT_OqSf6Bs",
            "Driver_name": "Olivia Wilson",
            "Driver_email": "olivia.wilson@gmail.com",
            "Driver_password": "olivia123",
            "Assigned_train_ID": "T008"
        },
        {
            "Driver_ID": "D009",
            "Driver_img": "https://source.unsplash.com/a-man-wearing-a-necklace-with-a-cross-on-it-nSBl2cfwnmE",
            "Driver_name": "James Taylor",
            "Driver_email": "james.taylor@gmail.com",
            "Driver_password": "taylorpass456",
            "Assigned_train_ID": "T009"
        },
        {
            "Driver_ID": "D010",
            "Driver_img": "https://source.unsplash.com/man-in-white-crew-neck-shirt-GRyMXAQdtp8",
            "Driver_name": "John Anderson",
            "Driver_email": "john.anderson@gmail.com",
            "Driver_password": "john567",
            "Assigned_train_ID": "T010"
        }
    ];

    const Trains = [
        {
            "Train_ID": "T001",
            "Num_of_crew": 3,
            "Loading_gauge": {
                "width": 2.8,
                "height": 4.2,
                "min_weight": 50,
                "max_weight": 120
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [51.5323, -0.1248],
            "Current_speed": 80,
            "Departure_time": 1635201200,
            "Estimated_arrival_time": 1645201200,
            "Origin_station": "KGX",   // London King's Cross
            "Destination_station": "EDB"  // Edinburgh Waverley
        },
        {
            "Train_ID": "T002",
            "Num_of_crew": 2,
            "Loading_gauge": {
                "width": 2.9,
                "height": 4.1,
                "min_weight": 55,
                "max_weight": 110
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [52.1949, -0.1326],
            "Current_speed": 75,
            "Departure_time": 1635215600,
            "Estimated_arrival_time": 1645215600,
            "Origin_station": "CBG",   // Cambridge
            "Destination_station": "GLC"  // Glasgow Central
        },
        {
            "Train_ID": "T003",
            "Num_of_crew": 4,
            "Loading_gauge": {
                "width": 2.7,
                "height": 4.3,
                "min_weight": 60,
                "max_weight": 115
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [53.8013, -1.5486],
            "Current_speed": 70,
            "Departure_time": 1635190400,
            "Estimated_arrival_time": 1645190400,
            "Origin_station": "LDS",   // Leeds
            "Destination_station": "PNR"  // Penrith
        },
        {
            "Train_ID": "T004",
            "Num_of_crew": 3,
            "Loading_gauge": {
                "width": 2.8,
                "height": 4.2,
                "min_weight": 50,
                "max_weight": 120
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [54.9783, -1.6174],
            "Current_speed": 90,
            "Departure_time": 1635222800,
            "Estimated_arrival_time": 1645222800,
            "Origin_station": "DUR",   // Durham
            "Destination_station": "YRK"  // York
        },
        {
            "Train_ID": "T005",
            "Num_of_crew": 5,
            "Loading_gauge": {
                "width": 2.9,
                "height": 4.0,
                "min_weight": 45,
                "max_weight": 110
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [55.9527, -3.1886],
            "Current_speed": 85,
            "Departure_time": 1635230000,
            "Estimated_arrival_time": 1645230000,
            "Origin_station": "EDB",   // Edinburgh Waverley
            "Destination_station": "KGX"  // London King's Cross
        },
        {
            "Train_ID": "T006",
            "Num_of_crew": 4,
            "Loading_gauge": {
                "width": 2.8,
                "height": 4.3,
                "min_weight": 55,
                "max_weight": 115
            },
            "Operating_route_ID": "ECML",
            "Current_location_coordinates": [55.8026, -4.0547],
            "Current_speed": 75,
            "Departure_time": 1635208400,
            "Estimated_arrival_time": 1645208400,
            "Origin_station": "GLC",   // Glasgow Central
            "Destination_station": "CBG"  // Cambridge
        }
    ];

    const Stations = [
        {
            "Station_ID": "YRK",
            "Station_name": "York",
            "coordinates": [53.9591, -1.0815]
        },
        {
            "Station_ID": "LDS",
            "Station_name": "Leeds",
            "coordinates": [53.7959, -1.5481]
        },
        {
            "Station_ID": "EDB",
            "Station_name": "Edinburgh Waverley",
            "coordinates": [55.9521, -3.1897]
        },
        {
            "Station_ID": "NNG",
            "Station_name": "Newark North Gate",
            "coordinates": [53.0823, -0.8072]
        },
        {
            "Station_ID": "DHM",
            "Station_name": "Durham",
            "coordinates": [54.7787, -1.5814]
        },
        {
            "Station_ID": "CBG",
            "Station_name": "Cambridge",
            "coordinates": [52.1949, -0.1326]
        },
        {
            "Station_ID": "GLC",
            "Station_name": "Glasgow Central",
            "coordinates": [55.8026, -4.0547]
        },
        {
            "Station_ID": "PNR",
            "Station_name": "Penrith",
            "coordinates": [54.6842, -2.7588]
        },
        {
            "Station_ID": "KGX",
            "Station_name": "London King's Cross",
            "coordinates": [51.5323, -0.1248]
        }
    ];

    const Routes = [{
        Route_ID: "ECML",
        Normal_running_speed: 125,
        Origin: {
            name: "London King's Cross",
            coordinates: [51.5323, -0.1248]
        },
        Destination: {
            name: "Edinburgh Waverley",
            coordinates: [55.9521, -3.1897]
        },
        gradients: [
            {
                coordinates_from: [51.5323, -0.1248],
                coordinates_to: [51.5327, -0.1242],
                slope_angle: 5.5
            },
            {
                coordinates_from: [54.9722, -1.6174],
                coordinates_to: [54.9745, -1.6188],
                slope_angle: 23.4
            },
            {
                coordinates_from: [55.9521, -3.1897],
                coordinates_to: [55.9516, -3.1902],
                slope_angle: 10.3
            }
        ],
        curvatures: [
            {
                "coordinates_from": [51.4836, -0.6136],
                "coordinates_to": [51.4869, -0.6101],
                "curve_radius": 20
            },
            {
                "coordinates_from": [51.6741, -0.0951],
                "coordinates_to": [51.6758, -0.0914],
                "curve_radius": 18
            },
            {
                "coordinates_from": [52.9372, -1.4669],
                "coordinates_to": [52.9387, -1.4651],
                "curve_radius": 25
            },
            {
                "coordinates_from": [53.3816, -1.4721],
                "coordinates_to": [53.3827, -1.4689],
                "curve_radius": 22
            },
            {
                "coordinates_from": [53.6079, -1.4894],
                "coordinates_to": [53.6091, -1.4876],
                "curve_radius": 23
            },
            {
                "coordinates_from": [54.1593, -1.5349],
                "coordinates_to": [54.1612, -1.5324],
                "curve_radius": 19
            },
            {
                "coordinates_from": [54.7071, -1.6378],
                "coordinates_to": [54.7093, -1.6348],
                "curve_radius": 21
            },
            {
                "coordinates_from": [55.0523, -2.7801],
                "coordinates_to": [55.0537, -2.7786],
                "curve_radius": 24
            },
            {
                "coordinates_from": [55.4064, -2.7834],
                "coordinates_to": [55.4081, -2.7821],
                "curve_radius": 22
            },
            {
                "coordinates_from": [55.7618, -3.2491],
                "coordinates_to": [55.7632, -3.2478],
                "curve_radius": 26
            }
        ],
        points_switches: [
            {
                "coordinates": [51.6163, -0.2064],
                "turn": "Right",
                "connects_to": "YRK"
            },
            {
                "coordinates": [53.7984, -1.5491],
                "turn": "Left",
                "connects_to": "LDS"
            },
            {
                "coordinates": [55.9470, -3.1846],
                "turn": "Right",
                "connects_to": "EDB"
            },
            {
                "coordinates": [52.9885, -0.9093],
                "turn": "Left",
                "connects_to": "NNG"
            },
            {
                "coordinates": [54.9746, -1.6178],
                "turn": "Right",
                "connects_to": "DHM"
            }
        ]
    }];

    const Temporary_restrictions = [
        {
            "Route_ID": "ECML",
            "coordinates_from": [51.6758, -0.0914],
            "coordinates_to": [51.6723, -0.1057],
            "Start_time": 1645112400, // Timestamp for start time (e.g., 2022-02-17T08:00:00Z)
            "End_time": 1645116000,   // Timestamp for end time (e.g., 2022-02-17T09:00:00Z)
            "description": "Speed restriction due to maintenance work"
        },
        {
            "Route_ID": "ECML",
            "coordinates_from": [55.9470, -3.1846],
            "coordinates_to": [55.9505, -3.2001],
            "Start_time": 1645201200, // Timestamp for start time (e.g., 2022-02-18T08:00:00Z)
            "End_time": 1645204800,   // Timestamp for end time (e.g., 2022-02-18T09:00:00Z)
            "description": "Track repair work causing speed restriction"
        }
    ];

    const Signals_crossings = [
        {
            "Route_ID": "ECML",
            "coordinates": [51.6692, -0.1018],
            "status": "Proceed"
        },
        {
            "Route_ID": "ECML",
            "coordinates": [53.8047, -1.5489],
            "status": "Stop"
        },
        {
            "Route_ID": "ECML",
            "coordinates": [55.9487, -3.1852],
            "status": "Proceed with caution"
        },
        {
            "Route_ID": "ECML",
            "coordinates": [52.9724, -0.9102],
            "status": "Stop"
        },
        {
            "Route_ID": "ECML",
            "coordinates": [54.9756, -1.6173],
            "status": "Proceed"
        }
    ];

    // loadData()
    async function loadData() {

        await reset();

        await models['Drivers'].create(Drivers).then((result) => {
            console.log(`Data successfully uploaded for Drivers`);
        }).catch((error) => {
            console.log('Error:', error)
        });

        await models['Trains'].create(Trains).then((result) => {
            console.log(`Data successfully uploaded for Trains`);
        }).catch((error) => {
            console.log('Error:', error)
        });

        await models['Stations'].create(Stations).then((result) => {
            console.log(`Data successfully uploaded for Stations`);
        }).catch((error) => {
            console.log('Error:', error)
        });

        await models['Routes'].create(Routes).then((result) => {
            console.log(`Data successfully uploaded for Routes`);
        }).catch((error) => {
            console.log('Error:', error)
        });

        await models['Temporary_restrictions'].create(Temporary_restrictions).then((result) => {
            console.log(`Data successfully uploaded for Temporary_restrictions`);
        }).catch((error) => {
            console.log('Error:', error)
        });

        await models['Signals_crossings'].create(Signals_crossings).then((result) => {
            console.log(`Data successfully uploaded for Signals_crossings`);
        }).catch((error) => {
            console.log('Error:', error)
        });
    }

    async function reset() {
        await models['Drivers'].collection.drop()
        await models['Trains'].collection.drop()
        await models['Stations'].collection.drop()
        await models['Routes'].collection.drop()
        await models['Temporary_restrictions'].collection.drop()
        await models['Signals_crossings'].collection.drop()
        await console.log('Data reset');
    }
}   