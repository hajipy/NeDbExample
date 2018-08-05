const Database = require("nedb");

(async () => {
    const db = new Database();

    await new Promise((resolve, reject) => {
        db.loadDatabase((error) => {
            if (error !== null) {
                reject(error);
            }

            resolve();
        });
    });

    // 保存したいドキュメント
    const doc = {
        // 文字列
        someString: "hello, world",
        // 数字
        someNumber: 37,
        // 日付
        someDate: new Date(),
        // 配列
        someArray: [1, 2, 3],
        // オブジェクト
        someObject: {
            key: "value",
        }
    };

    // 新規ドキュメントをデータベースに保存する
    db.insert(doc, (error, newDoc) => {
        if (error !== null) {
            console.error(error);
        }

        // newDocにはアルファベット16文字の値を持つ_idフィールドが追加されている
        console.log(newDoc);
    });
})();
