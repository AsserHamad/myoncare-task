const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));
}