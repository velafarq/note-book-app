'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://velafarq:watermelon1@ds263590.mlab.com:63590/note-book-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-note-book-app';
exports.PORT = process.env.PORT || 8080;