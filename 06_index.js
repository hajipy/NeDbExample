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

    // filedNameで指定したフィールドにインデックスを作成する
    const options = {
        fieldName: "name"
    };

    db.ensureIndex(options, (error) => {
        if (error !== null) {
            console.error(error);
        }
    });
})();

(async () => {
    const db = await setUpDatabase();

    // ドットで連結することで子ドキュメントのフィールドを指定できる
    const options = {
        fieldName: "developer.name"
    };

    db.ensureIndex(options, (error) => {
        if (error !== null) {
            console.error(error);
        }
    });
})();

(async () => {
    const db = await setUpDatabase();

    // uniqueにtrueを指定すると一意制約を設けることができる（デフォルトはfalse)
    const options = {
        fieldName: "name",
        unique: true,
    };

    db.ensureIndex(options, (error) => {
        if (error !== null) {
            console.error(error);
        }
    });
})();

(async () => {
    const db = await setUpDatabase();

    const options = {
        fieldName: "name"
    };

    db.ensureIndex(options, (error) => {
        if (error !== null) {
            console.error(error);
        }
    });

    // removeIndex()を呼び出すことで作成済みインデックスを削除できる
    db.removeIndex(options, (error) => {
        if (error !== null) {
            console.error(error);
        }
    });
})();
