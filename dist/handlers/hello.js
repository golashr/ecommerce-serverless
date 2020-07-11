"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("source-map-support/register");
exports.main = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Go Serverless v1.0! ${await message({
                time: 1,
                copy: 'Your function executed successfully!',
                name: 'Neelima',
                age: 32,
            })}`,
        }),
    };
};
const message = (rest) => new Promise(resolve => setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
}, rest.time * 1000));
//# sourceMappingURL=hello.js.map