import type { NextApiRequest, NextApiResponse } from 'next'
const bcrypt = require('bcrypt');
const BlogPosts = require("../../../models/BlogPosts")

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const parseObj = JSON.parse(req.body)
    const saltRounds: number = 10;
    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(parseObj.password, salt, function(err:any, hash: any) {
            
        });
    });
    res.status(200).json({text: "udało się"})
}