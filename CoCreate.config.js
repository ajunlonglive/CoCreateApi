module.exports = {
    "config": {
        "apiKey": "2061acef-0451-4545-f754-60cf8160",
        "organization_Id": "5ff747727005da1c272740ab",
        "host": "general.cocreate.app"
    },
    jwttoken: {
        key: process.env.JWT_KEY || '<JWT Token>',
        options: {
            algorithm: "HS256",
            expiresIn: "2 days",
            issuer: "issuer"
        }
    },
    "sources": [
        {
            "entry": "./docs/index.html",
            "collection": "files",
            "document_id": "6204206980b409001727b6e8",
            "key": "src",
            "data": {
                "name": "index.html",
                "path": "/docs/CoCreateAPI/index.html",
                "domains": [
                    "*",
                    "general.cocreate.app"
                ],
                "directory": "/docs/CoCreateAPI",
                "content-type": "text/html",
                "public": "true",
                "website_id": "5ffbceb7f11d2d00103c4535"
            }
        }
    ]
}