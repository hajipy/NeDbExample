const Database = require("nedb");

async function setUpDatabase() {
    const db = new Database();

    await new Promise((resolve, reject) => {
        db.loadDatabase((error) => {
            if (error !== null) {
                reject(error);
            }

            resolve();
        });
    });

    const docs = [
        {
            _id: 'id1',
            name: "Play Station 4",
            developer: { name: "Sony", country: "JP" },
            releaseDate: new Date(2014, 2, 22),
            media: "Blu-ray",
            portable: false,
            connectivity: ["HDMI", "USB", "Ethernet", "Wi-Fi", "Bluetooth"],
            peripheral: ["Play Station VR"],
        },
        {
            _id: 'id2',
            name: "Play Station Vita",
            developer: { name: "Sony", country: "JP" },
            releaseDate: new Date(2011, 12, 17),
            media: "Card",
            portable: true,
            connectivity: ["Wi-Fi", "Bluetooth", "3G"],
        },
        {
            _id: 'id3',
            name: "Nintendo 3DS",
            developer: { name: "Nintendo", country: "JP" },
            releaseDate: new Date(2011, 2, 26),
            media: "Card",
            portable: true,
            connectivity: ["Wi-Fi"],
        },
        {
            _id: 'id4',
            name: "Nintendo Switch",
            developer: { name: "Nintendo", country: "JP" },
            releaseDate: new Date(2017, 3, 3),
            media: "Card",
            portable: true,
            connectivity: ["HDMI", "USB", "Wi-Fi", "Bluetooth"],
        },
        {
            _id: 'id5',
            name: "Xbox One",
            developer: { name: "Microsoft", country: "US" },
            releaseDate: new Date(2013, 11, 22),
            media: "Blu-ray",
            portable: false,
            connectivity: ["HDMI", "USB", "Ethernet", "Wi-Fi"],
            peripheral: ["Kinect"],
        },
    ];

    await new Promise((resolve, reject) => {
        db.insert(docs, (error) => {
            if (error !== null) {
                reject(error);
            }

            resolve();
        });
    });

    return db;
}

(async () => {
    const db = await setUpDatabase();

    // queryはfind(), findOne()と同じものが使える
    const query = { _id: "id1" };

    // optionsについては後述
    const options = {};

    // remove()はqueryに一致したドキュメントを削除する
    db.remove(query, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        // numOfDocsには削除した件数が返る
        console.log(numOfDocs);

        // queryに一致したドキュメントのうち1件が削除されている

        db.count(query, (error2, numOfDocs2) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(numOfDocs2);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { "developer.name": "Sony" };

    // optionsはmultiのみを受け付ける
    // trueを指定した場合、複数のドキュメントを削除する(デフォルトはfalse)
    const options = { multi: true };

    db.remove(query, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // queryに一致したドキュメントがすべて削除されている

        db.count(query, (error2, numOfDocs2) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(numOfDocs2);
        });
    });
})();
