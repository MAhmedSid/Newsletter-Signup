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
            "Authorization": "myapikey d41702ed3f997d48ad98addeaecb8ffe-us13",
        },
        body: JSONdata,
    }

    request(options, (error, response, body) => {
        if(error){
            console.log(error);
        }
        else{ 
        if (res.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } 
        else {
            res.sendFile(__dirname + "/failure.html")
            console.log(res.statusCode);
        } }
    })

})


app.post("/failure", (req,res)=>{
    res.redirect("/");
})
// api key: d41702ed3f997d48ad98addeaecb8ffe-us13 
// list unique id:  fa3bda3107


