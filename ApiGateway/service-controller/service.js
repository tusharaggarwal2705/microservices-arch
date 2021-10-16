const { default: axios } = require("axios");
const request=require('util').promisify(require('request'));
const {services}=require('../api-configurations/api-config.json');
const { isAuthicated } = require("../services/jwt");

exports.service=async(req,res,next)=>{
    
    // console.log(services[service]);
    // const requestOptions={
    //     method:'GET',
    //     url:`http://localhost:5001/${apiName}`,
    //     body:'',
    //     options:{
    //         "Content-Type":"application/json"
    //     }
    // }

    // let result=await request(requestOptions);
    // let response=result.body;
    // res.send(response)
    const result=await isAuthicated();
    console.log(result);
    res.send(result);
}


