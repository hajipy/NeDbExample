const Database = require("nedb");

(() => {
    // インメモリデータベース
    const db = new Database();
})();


(() => {
    // 永続化する場合はfilenameを指定する
    const db = new Database({ filename: "example.db" });

    // データベースをロードする。ロード完了後にコールバックが呼ばれる
    db.loadDatabase((error) => {
        if (error !== null) {
            console.error(error);
        }

        console.log("load database completed.");
    });
})();
