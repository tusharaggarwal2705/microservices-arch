const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.isAuthicated = async () => {
    let publicKey = fs.readFileSync('public.key', 'utf-8');
    let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY2OGJhNGIzNGViMzI2NTE4OGFlYjUiLCJzYWx0IjoiJDJiJDIwJHgwSW9KOVZKSHp1T0NwaTUuVWFvcmUiLCJpYXQiOjE2MzQyNzU0NDIsImV4cCI6MTYzNDM2MTg0MiwiYXVkIjoiaHR0cDovL3d3dy5teXNpdGUuY29tIiwiaXNzIjoibXkgc2l0ZSwiLCJzdWIiOiJ0dXNoYXJhZ2dhcndhbDI3MDVAZ21haWwuY29tIn0.fIgi8ehk8DgeRcOWFUm5shc7Qlt6fPS2PMliAnke08hi0knMXigQ7PiXD0MXJXeTGfqeFSrIr4JmHktmjtJsAQ';
    let verifyOptions = {
        issuer: 'my site,',
        subject: 'tusharaggarwal2705@gmail.com',
        audience: 'http://www.mysite.com',
        expiresIn: "24h",
        algorithm: ["RS256"]
    };
    let result = await jwt.verify(token, publicKey, verifyOptions);
    return result;
}