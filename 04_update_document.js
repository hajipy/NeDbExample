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
            price: 39980,
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
            price: 24980,
            media: "Card",
            portable: true,
            connectivity: ["Wi-Fi", "Bluetooth", "3G"],
        },
        {
            _id: 'id3',
            name: "Nintendo 3DS",
            developer: { name: "Nintendo", country: "JP" },
            releaseDate: new Date(2011, 2, 26),
            price: 25000,
            media: "Card",
            portable: true,
            connectivity: ["Wi-Fi"],
        },
        {
            _id: 'id4',
            name: "Nintendo Switch",
            developer: { name: "Nintendo", country: "JP" },
            releaseDate: new Date(2017, 3, 3),
            price: 29980,
            media: "Card",
            portable: true,
            connectivity: ["HDMI", "USB", "Wi-Fi", "Bluetooth"],
        },
        {
            _id: 'id5',
            name: "Xbox One",
            developer: { name: "Microsoft", country: "US" },
            releaseDate: new Date(2013, 11, 22),
            price: 39980,
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

    // updateにmodifier(後述)を含まないオブジェクトを指定した場合、ドキュメントの内容すべてを置き換える
    const update = {
        _id: 'id1',
        name: "Play Station 4 Pro",
        developer: { name: "Sony", country: "JP" },
        releaseDate: new Date(2016, 11, 10),
        media: "UHD Blu-ray",
        portable: false,
        connectivity: ["HDMI 2.0b", "USB", "Ethernet", "Wi-Fi", "Bluetooth"],
        peripheral: ["Play Station VR"],
    };

    // optionsについては後述
    const options = {};

    // update()はqueryに一致したドキュメントをupdateに従って更新する
    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        // numOfDocsには更新した件数が返る
        console.log(numOfDocs);

        // ドキュメント全体がupdateの内容に更新されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id5" };

    // updateに$set modifierを指定した場合、そのフィールドのみ更新し、それ以外のフィールドは以前のままになる
    const update = {
        $set: {
            name: "Xbox One X",
            releaseDate: new Date(2017, 11, 7),
            media: "UHD Blu-ray",
        },
    };

    const options = {};

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // name, releaseDate, mediaフィールドのみが更新されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id1" };

    // updateに$unset modifierを指定した場合、そのフィールドを削除し、それ以外のフィールドは以前のままになる
    const update = {
        $unset: {
            peripheral: true,
        },
    };

    const options = {};

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // peripheralフィールドが削除されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id1" };

    // updateに$unset modifierを指定した場合、そのフィールドの値をインクリメントし、それ以外のフィールドは以前のままになる
    const update = {
        $inc: { price: 10000 }
    };

    const options = {};

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // priceが39980+10000=49980に更新されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id1" };

    // updateに$push modifierを指定した場合、配列フィールドに値を追加し、それ以外のフィールドは以前のままになる
    const update = {
        $push: { peripheral: "Play Station Move" }
    };

    const options = {};

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // peripheralがPlay Station VRとPlay Station Moveに更新されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id1" };

    // updateに$pop modifierを指定した場合、配列フィールドの先頭(-1)か末尾(1)から値を取り除き、それ以外のフィールドは以前のままになる
    const update = {
        $pop: { connectivity: 1 }
    };

    const options = {};

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // connectivityの末尾のBluetoothが削除される(-は削除された値)
        // 1. HDMI
        // 2. USB
        // 3. Ethernet
        // 4. Wi-Fi
        // -  Bluetooth

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { "developer.name": "Nintendo" };

    const update = {
        $set: {
            "developer.japaneseName": "任天堂"
        }
    };

    // optionsのmultiにtrueを指定した場合、複数のドキュメントを更新する(デフォルトはfalse)
    const options = {
        multi: true,
    };

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // developer.nameがNintendoのドキュメントすべてが更新されている

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { "name": "Play Station 3" };

    const update = {
        _id: 'id6',
        name: "Play Station 3",
        developer: { name: "Sony", country: "JP" },
        releaseDate: new Date(2006, 11, 11),
        price: 62790,
        media: "Blu-ray",
        portable: false,
        connectivity: ["HDMI", "USB", "Ethernet", "Wi-Fi", "Bluetooth"],
    };

    // optionsのupsertにtrueを指定した場合、queryに一致するドキュメントがなかった場合、insertを行う(デフォルトはfalse)
    const options = {
        upsert: true,
    };

    db.update(query, update, options, (error, numOfDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // nameがPlay Station 3のドキュメントはないので、insertされる

        db.find(query, (error2, updatedDocs) => {
            if (error2 !== null) {
                console.error(error2);
            }

            console.log(updatedDocs);
        });
    });
})();

(async () => {
    const db = await setUpDatabase();

    const query = { _id: "id1" };

    const update = {
        _id: 'id1',
        name: "Play Station 4 Pro",
        developer: { name: "Sony", country: "JP" },
        releaseDate: new Date(2016, 11, 10),
        media: "UHD Blu-ray",
        portable: false,
        connectivity: ["HDMI 2.0b", "USB", "Ethernet", "Wi-Fi", "Bluetooth"],
        peripheral: ["Play Station VR"],
    };

    // optionsのreturnUpdatedDocsにtrueを指定した場合、更新したドキュメントを返す(デフォルトはfalse)
    // multiがfalseの場合はドキュメント、trueの場合はドキュメントの配列になる
    const options = {
        returnUpdatedDocs: true,
    };

    // update()はqueryに一致したドキュメントをupdateに従って更新する
    db.update(query, update, options, (error, numOfDocs, updatedDocs) => {
        if (error !== null) {
            console.error(error);
        }

        console.log(numOfDocs);

        // updatedDocsにはドキュメントが返る
        console.log(updatedDocs);
    });
})();
