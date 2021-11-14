const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");

const http = require("http");
const Bearer_Token = 'AAAAAAAAAAAAAAAAAAAAAAD1VgEAAAAAjmxGSrn3TlLt0CbUAa5bOfvGypw%3DvTKLicj54I6hyAlqkvDcYBo5Hcm0tXWDJ7CTMp5pC0YqZSzYJD';
const getUser = new URL("https://api.twitter.com/2/users/by/username")
const getTweets= new URL("https://api.twitter.com/2/users/")

let port = process.env.PORT || 5000;
const post = util.promisify(request.post);
const get = util.promisify(request.get);



const server = http.createServer(app);

app.get("/api/getUser/:username", async(req, res) => {
    console.log("inside");
    const username = req.params.username; 
    const token = Bearer_Token;
    console.log(req.params);
    const requestConfig = {
        // url : getUser + "/narendramodi",
        url : getUser +"/"+ username,
        auth: {
          bearer: Bearer_Token,
        },
        json: true,
      };
    
      try {
        const response = await get(requestConfig);
        if (response.statusCode == 200) {
          if(response.body!=null){
        
        const id= response.body.data.id;
        console.log(id);
        const requestConfig2 = {
          url : getTweets +id+"/tweets",
          auth: {
            bearer: Bearer_Token,
          },
          json: true,
        };
        console.log(requestConfig2);
        
        const response2 = await get(requestConfig2);
        res.send(response2);
      }}
      else{
        if (response.statusCode !== 200) {
          if (response.statusCode === 403) {
            res.status(403).send(response.body);
          } else {
            throw new Error(response.body.error.message);
          }
        }
        
        res.send(response);

      }
        
       
        
      } catch (e) {
        res.send(e);
      }
})
app.get("/api/getTweets", async(req, res) => {
  console.log("inside");
  const token = Bearer_Token;
  const requestConfig = {
      url : getTweets + "18839785/tweets",
      auth: {
        bearer: Bearer_Token,
      },
      json: true,
    };
  
    try {
      const response = await get(requestConfig);
      console.log(response);
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
      
      res.send(response);
    } catch (e) {
      res.send(e);
    }
})

server.listen(port, () => console.log(`Listening on port ${port}`));