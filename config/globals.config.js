exports.DATABASE_URL =
  process.env.DB_CONNECTION_URL

exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb://velafarq:watermelon1@ds129801.mlab.com:29801/note-book-app-test";
exports.PORT = process.env.PORT || 8080;
