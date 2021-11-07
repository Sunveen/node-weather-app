const path= require('path');
const express= require('express');
const hbs= require('hbs');
const forecast= require('./utils/forecast');
const geocode= require('./utils/geocode');


const app= express();

const publicPath= path.join(__dirname, '../public');
const partialsPath= path.join(__dirname, '../templates/partials');
const viewsPath= path.join(__dirname, '../templates/views');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home',
        name: 'sunveen singh'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
    return res.send({
        error: 'Please provide address property'
    })
    }

    else{
        geocode(req.query.address, (err, {latitude, longitude, location}={})=>{
            if(err){
                return res.send({
                    error: err
                })
            }
            else{
                forecast(latitude, longitude, (fErr, {temperature, feelsLike})=>{
                    if(fErr){
                        return res.send({
                            error: fErr
                        })
                    }

                    else{
                        return res.send({
                            forecast: temperature,
                            location: location,
                            address:req.query.address
                    
                        });
                    }
                })
                
            }
        })
        
    }
    
});

app.get('/help', (req, res)=> {
    res.render('help', {
        message: 'I am very helpful',
        title: 'Help',
        name: 'sunveen'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'sunveen s'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('not-found', {
        title: '404',
        'not-found-msg': 'Help page not found',
        name: 'sunveen'
    })
})

app.get('*', (req, res)=>{
    res.render('not-found', {
        title: '404',
        'not-found-msg': 'Page not found',
        name: 'sunveen'
    })
})

app.listen('3000', ()=>{
    console.log('server is up and running');
})

