//  const express = require('express')

//  since it express provides a single function 

//  const app = express()
//  HERE app becames base URL can can be used to asccess diffrent pages using GET
//  Two argument for get 1.URL 2. request, response

//  app.get('' ,(req,res)=>{
//     res.send("<h1>Hello Express.js</h1>")
// })

//  Example app/about : JSON

// app.get('/about' ,(req,res)=>{
//     res.send({
//            name: Mohit Kumar ,
//            age : 21
//        })
// })


// Example app/help : String
// app.get('/help' ,(req,res)=>{
//     res.send("Superman is Here")
// })

// app.get('/weather' ,(req,res)=>{
//     res.send([{
//         name : "Bihar",
//         forecast : 37
//     },{
//         name : "Chakhani",
//         forecast : 40
//     }
// ])
// })

// you need to make the server to start listening to yoiu so you add only once a listen (continously) with
// one compulsary : PORT and other optinal argumnt

// app.listen(3000 , ()=>{
//     console.log("Web server started")
// })
// ******************************************************************************************************** */

// LOADING STATIC WEB PAGES LIKE HTML

// const express = require('express')

// //TO GET PATH SO THAT IT CAN BE PROVIDED TO "USE" WE USE INBUILT(no need of installation) "PATH" BY NODE JS 

// const path = require('path')

// //Getting th path

// // console.log(__dirname)
// // console.log(__filename)
// const curr_path = path.join(__dirname , "../public")
// console.log(curr_path)
// //Rendering it to root i.e app

// const app = express()

// //Root
// app.use(express.static(curr_path))

// //Say - help
// //just visit localhost:3000/help.html  to see the contents


// app.listen(3000)

// *************************************************************************************************** */

// LOADING UP DYNAMIC WEB PAGES
// WE NEED TO INSTALL "HBS" : A WEB PAGE RENDERER
// INSTEAD OF HTML WE NEED index.hbs file
// INSTEAD OF SEND : REQ.RENDER


// const express = require('express')

// const app = express()

// app.set('view engine' , 'hbs')

// app.get('' , (req , res)=>{
//     res.render('index' , {
//         name : "Mohit Kumar",
//         title: "Me"
//     })
// })

// app.listen(3000)

// ****************************************************************************** */

// In order to customise location of views you can do it in following way
// you can set the "veiws" to desired path location

// const express = require('express')
// const path =  require('path')

// const views_path = path.join(__dirname , "../template")
// console.log(__dirname)

// const app = express();

// app.set('view engine' , 'hbs')
// app.set('views' , views_path)

// app.get('' , (req , res)=>{
//     res.render('index' , {
//         name : "Mohit Kumar",
//         title: "Me"
//     })
// })

// app.listen(3000)


// ************************************************************************************** */

// ADDING PARTIALS : REUSABLE CODE USING "hbs"
// IT REQUIRES {{>file name}}
// For nodemon to start again for hbs/any other file you need to use : nodemon src/app.js -e js,hbs,html,css etc


// const express = require('express')
// const path =  require('path')
// const hbs = require('hbs')

// const app = express()
// console.log(__dirname)
// //defalt configration of Express 
// const curr_path = path.join(__dirname , "../public")
// app.use(express.static(curr_path))

// //for views i.e : dynamic web pages
// const views_path = path.join(__dirname , "../template/views")
// app.set('view engine' , 'hbs')
// app.set('views' , views_path)


// //for partials : code reusiblity
// const partials_path = path.join(__dirname , "../template/partials")
// hbs.registerPartials(partials_path)

// app.get('' , (req , res)=>{
//     res.render('index' , {
//         name : "Mohit Kumar",
//         title: "Me"
//     })
// })
// app.get('/help' , (req , res)=>{
//     res.render('index' , {
//         name : "Mohit Kumar",
//         title: "I am superman"
//     })
// })

// app.get('/about' , (req , res)=>{
//     res.render('about' , {
//         name : "Mohit Kumar",
//         title: "About me"
//     })
// })


// //404 pages and ways to handle them
// //Note : Express starts to check for url from beginning of the programm 
// // When it reaches "/help/*" => any help url like app/help/"anything" that dosent amtches will dislay this
// // When "*" is reached means no such url is fould and matches up with anything(*) 

// app.get('/help/*' , (req, res) => {
//     res.send("Help Not found !! Die")
// })

// app.get('*' , (req, res) => {
//     res.render('404' , {
//         name : "Mohit Kumar",
//         title: "About me",
//         error : "Page not found"
//     })
// })

// app.listen(3000)

//**************************************************************************************************** */

const express = require('express')
const path =  require('path')
const hbs = require('hbs')

const app = express()

//defalt configration of Express 
const curr_path = path.join(__dirname , "../public")
app.use(express.static(curr_path))

//for views i.e : dynamic web pages
const views_path = path.join(__dirname , "../template/views")
app.set('view engine' , 'hbs')
app.set('views' , views_path)


//for partials : code reusiblity
const partials_path = path.join(__dirname , "../template/partials")
hbs.registerPartials(partials_path)

app.get('' , (req , res)=>{
    res.render('index' , {
        name : "Mohit Kumar",
        title: "Me"
    })
})

//random testing******
app.get('/product' , (req , res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error : "Enter a search term"
        })
    }
    res.send({
        products : []
    })
})
//****************** */
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather' , (req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "Enter a valid address" ,
            address : req.query.search
        })
    }

    geocode(req.query.search, (error,data)=>{
        if(error != undefined){
            return res.send({
                error : error,
                address : req.query.search
            })
        }
    forecast(data.latitude, data.longtitude  , (error,data)=>{
        //console.log(error3)
        if(error != undefined){
            return res.send({
                error3 : "Enter a valid address"
           })
        }
        else{
            res.send({
                data : data,
                address : req.query.search
            })
                
        }
    })
    })
    
})


app.get('*' , (req, res) => {
    res.render('404' , {
        name : "Mohit Kumar",
        title: "About me",
        error : "Page not found"
    })
})


app.listen(3000 , ()=>{
    console.log("port 3000")
})