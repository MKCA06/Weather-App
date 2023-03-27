const express=require('express');

const https=require('https');

const bodyParser=require('body-parser')

const app=express();

app.use(bodyParser.urlencoded({extended:true}));//necessary to be able to stop parsing through the body of post req

app.get('/',function(req,res){
//res.send('Server is up and running.')
res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
    console.log(req.body.cityName)
    const query=req.body.cityName;
    const apikey="4072fd15643e4d98ee14b28f925ca347"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit
    https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        //console.log(weatherData)
        const desc=weatherData.weather[0].description
        const temp=weatherData.main.temp
        const icon=weatherData.weather[0].icon;
        const humidity=weatherData.main.humidity;
        const wind=weatherData.wind.speed;
        const image="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        console.log(temp)
        res.write('<h1><center>The temperature in '+query+' is '+temp+' degree celsius.</h1>')
        res.write('<center><img src='+image+">")
        res.write('<h4><center>The humidity level is '+humidity+' and wind speed is '+wind+'</center></h4>')
        res.send();
    })
})
//console.log("Post request received.")
})


app.listen(5500,()=>{
    console.log('Server is running on port 5500.')
})