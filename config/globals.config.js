exports.DATABASE_URL =
  process.env.DB_CONNECTION_URL || "mongodb://re34ZDBObWOHvWL3:TyWcv6nX92t3BYjn@vela-notebook-db-2-6nihn-mongodb.external.kinsta.app:32455/vela-notebook-db-2"

exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb://velafarq:watermelon1@ds129801.mlab.com:29801/note-book-app-test";
exports.PORT = process.env.PORT || 8080;
