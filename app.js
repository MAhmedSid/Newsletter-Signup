const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.listen( process.env.PORT || '3000', () => {
    console.log("Server is running on port 3000.")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")

})

app.post('/', (req, res) => {
    let fName = req.body.firstname;
    let lName = req.body.lastname;
    let email = req.body.email;
    console.log(req.body);

    var data = {
        members: [
            {
                "email_address": email,
                "status": "subscribed",
                merge_fields: { 
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    }

    var JSONdata = JSON.stringify(data);


    options = {
        url: "https://us13.api.mailchimp.com/3.0/lists/fa3bda3107",
        method: "POST",
        headers: {
            "Authorization": "myapikey 47dc6d31d6e05862e08f406a42678854-us13",
        },
        body: JSONdata,
    }

    request(options, (error, response, body) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
            
        else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

})


app.post("/failure", (req,res)=>{
    res.redirect("/");
})
// api key: 47dc6d31d6e05862e08f406a42678854-us13
// list unique id:  fa3bda3107


