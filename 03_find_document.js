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
    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // find()はクエリに一致したすべてのドキュメントを返す
        db.find({ media: "Blu-ray" }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // findOne()はクエリに一致したドキュメントのいずれか1つを返す
        // どれが返ってくるかは不定なので注意
        db.findOne({ media: "Blu-ray" }, (error, doc) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4もしくはXbox Oneのいずれか1つが返る
            console.log(JSON.stringify(doc, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // ドットで連結することで子ドキュメントのフィールドを指定できる
        db.find({ "developer.name": "Sony" }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とPlayStation Vitaが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // 複数のフィールドを指定するとすべて一致したドキュメントのみを返す
        db.find({ media: "Blu-ray", "developer.name": "Sony" }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4のみが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // 空オブジェクトを指定することで全ドキュメントを返す
        db.find({}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // 全ドキュメントが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $lt, $lte, $gt, $gteで比較条件が指定できる
        db.find({ releaseDate: { $gte: new Date(2014, 1, 1) }}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とNintendo Switchが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $inで指定した値のいずれかに一致したドキュメントを返す
        db.find({ name: { $in: ["Play Station 4", "Nintendo 3DS"] }}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とNintendo 3DSが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $neで指定した値に一致しないドキュメントを返す
        db.find({ name: { $ne: "Xbox One" }}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とPlay Station VitaとNintendo 3DSとNintendo Switchが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $ninで指定した値のすべてに一致しなかったドキュメントを返す
        db.find({ name: { $nin: ["Play Station 4", "Nintendo 3DS"] }}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station VitaとNintendo SwitchとXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $existsはフィールドの存在有無をbooleanで指定する
        db.find({ peripheral: { $exists: true }}, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $whereはbooleanを返す関数を指定し、その関数がtrueを返したドキュメントを返す
        // 関数のthisには判定対象のドキュメントが束縛されている
        db.find({ $where: function() { return this.connectivity.length >= 4; } }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とNintendo SwitchとXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $sizeは配列フィールドの要素数が一致するドキュメントを返す
        db.find({ connectivity: { $size: 4 } }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Nintendo SwitchとXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $elemMatchは配列の要素1つ以上が一致するドキュメントを返す
        db.find({ connectivity: { $elemMatch: "Ethernet" } }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とXbox Oneが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $and, $orはクエリの配列を指定し、そのすべてもしくはいずれかに一致するドキュメントを返す
        db.find({ $or: [{ "developer.name": "Sony"}, { portable: true }] }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とPlay Station VitaとNintendo 3DSとNintendo Switchが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // $notはクエリに一致しないドキュメントを返す
        db.find({ $not: { connectivity: { $size: 4 } } }, (error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // Play Station 4とPlay Station VitaとNintendo 3DSが返る
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // ソートを行う場合にはfind()の戻り値に対してsort(), exec()をメソッドチェーンする
        // sort()には並び替えフィールドと昇順(1)と降順(-1)を指定する
        // exec()にはfind()の第2引数と同じコールバックを指定する
        db.find({}).sort({ releaseDate: 1 }).exec((error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // 以下の順に並んだドキュメントが返る
            // 1. Nintendo 3DS      (releaseDate: 2011-03-25)
            // 2. Play Station Vita (releaseDate: 2012-01-16)
            // 3. Xbox One          (releaseDate: 2013-12-21)
            // 4. Play Station 4    (releaseDate: 2014-03-21)
            // 5. Nintendo Switch   (releaseDate: 2017-04-02)
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // skip(), limit()でページネーションが行える
        // skip()には読み飛ばすドキュメント数を指定する
        // limit()には返すドキュメント数を指定する
        db.find({}).sort({ releaseDate: 1 }).skip(1).limit(2).exec((error, docs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // 以下の順に並んだドキュメントが返る(ｰは返らないドキュメント)
            // -  Nintendo 3DS      (releaseDate: 2011-03-25)
            // 1. Play Station Vita (releaseDate: 2012-01-16)
            // 2. Xbox One          (releaseDate: 2013-12-21)
            // -  Play Station 4    (releaseDate: 2014-03-21)
            // -  Nintendo Switch   (releaseDate: 2017-04-02)
            console.log(JSON.stringify(docs, null, 4));

            resolve();
        });
    });

    await new Promise(async (resolve, reject) => {
        const db = await setUpDatabase();

        // findの代わりにcountを使うとドキュメント数のみを返す
        db.count({}, (error, numOfDocs) => {
            if (error !== null) {
                reject(error);
                return;
            }

            // 5が返る
            console.log(numOfDocs);

            resolve();
        });
    });
})();
