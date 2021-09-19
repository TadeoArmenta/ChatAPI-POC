/* eslint-disable */
/**
 * WARNING !!! * WARNING !!! * WARNING !!! * WARNING !!!
 * THIS FILE HAS NOTHING TO DO WITH THIS PROJECT.
 * IT SERVES AS A MODULE RESOLVER FOR YOUR IDE. PLEASE DO NOT DELETE THIS!
 * IF YOU ARE USING INTELIJI IDEA TO CORRECTLY RESOLVE THE MODULES FOLLOW THE FOLLOWING STEPS:
 * 1. FILE -> SETTINGS
 * 2. SEARCH FOR WEBPACK
 * 3. SELECT THIS FILE AS THE WEBPACK CONFIG
 */

const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@database': path.resolve(__dirname, './src/database'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
};
