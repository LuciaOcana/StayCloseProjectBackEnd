"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, error, errorRaw) => {
    console.log(errorRaw);
    res.status(500);
    res.send({ error });
};
exports.handleHttp = handleHttp;
