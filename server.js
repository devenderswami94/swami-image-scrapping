var path = require('path');
var express = require('express');
var app = express();
var Scraper = require ('images-scraper') , google = new Scraper.Google();
var bodyParser = require("body-parser");
var Sync = require('sync');
var download = require('image-downloader');
var fs = require('fs');
var Jimp = require("jimp");
var ejs = require('ejs');
var fs = require('fs');
var name='';

let arr=[];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/view'));


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/node-demo", { useMongoClient: true });

var schema = new Schema({
    category: { Name:{type:String,unique: true,required: true, } }, img: { obj0:String, obj1:String, obj2:String, obj3:String, obj4:String, obj5:String, obj6:String, obj7:String, obj8:String, obj9:String, obj10:String, obj11:String, obj12:String, obj13:String, obj14:String,}
});
var A = mongoose.model('A', schema);
var a =new A;


var server = app.listen(8088, function () {
    console.log('Node server is running..');
});

app.post('https://afternoon-depths-19370.herokuapp.com/image', function (request, response) {
    // response.set("Access-Control-Allow-Origin", "*");
    // response.set("Access-Control-Allow-Headers", "X-Requested-With");
    name = request.body.IMAGENAME;
    //Direct Value passing for testing
    //var name1='bike';
    console.log(name);
    a.category.Name=name;
    var dir = __dirname + '/img/'+name;
    if (!fs.existsSync(dir))
    {

        fs.mkdirSync(dir);
        google.list({
            keyword: name,
            num: 15,
            detail: true,
            nightmare: {
                show: false
            },
            advanced: {
                imgType: 'photo', // options: clipart, face, lineart, news, photo
                resolution: undefined, // options: l(arge), m(edium), i(cons), etc.
                color: undefined, // options: color, gray, trans
                fileType:'jpg'
            }
        })
            .then(function (res) {
                console.log('first 15 results from google');
                // response.writeHead(200, {'Content-Type': 'pain/html'});
                var temp= res;
                //response.end(JSON.stringify(res));
                console.log("downloading started");
                //Display Image deitals
                /*for(var i=0 ;i<15; i++ ){


                    console.log(temp[i]);

                }*/

                /*db.collection.save(JSON.stringify(res));*/

                //Extracting URL for downloading

                for(var id in temp)
                {
                    arr.push(temp[id]["url"])
                }
                //Display Image URL
                /*for(var i=0 ;i<15; i++ ){


                    console.log(arr[i]);

                }*/

                //Downloading and Compression and Black and white transformation

                for(var j=0; j<15;j++) {

                    options = {
                        url: arr[j],
                        dest: "D:/Dev/image Scrapping/img/"+name+"/img"+j+".jpg"                // Save to /path/to/dest/image.jpg
                    }
                    //Download module implementation
                    download.image(options)
                        .then(({ filename , image }) => {
                            console.log('File saved to', filename)

                            var imgpath=filename;
                            //Image Convection to grey and Compressing using resize function
                            Jimp.read(imgpath, function (err, lenna) {
                                if (err) throw err;
                                lenna.resize(150, 150)            // resize
                                    .quality(60)                 // set JPEG quality
                                    .greyscale()                 // set greyscale
                                    .write(filename);// save



                            });
                            console.log("Done");

                        }).catch((err) => {
                        throw err
                    })



                }


//---------------------------------------------------------------------------------

                //-----------------------------------------------------------------------


            }).catch(function(err) {
            console.log('err', err);

        });


        var obj = [];

        a.category.Name = name;
        a.img.obj0 = "\\"+name+"\\img0.jpg";
        a.img.obj1 = "\\"+name+"\\img1.jpg";
        a.img.obj2 = "\\"+name+"\\img2.jpg";
        a.img.obj3 = "\\"+name+"\\img3.jpg";
        a.img.obj4 = "\\"+name+"\\img4.jpg";
        a.img.obj5 = "\\"+name+"\\img5.jpg";
        a.img.obj6 = "\\"+name+"\\img6.jpg";
        a.img.obj7 = "\\"+name+"\\img7.jpg";
        a.img.obj8 = "\\"+name+"\\img8.jpg";
        a.img.obj9 = "\\"+name+"\\img9.jpg";
        a.img.obj10 = "\\"+name+"\\img10.jpg";
        a.img.obj11 = "\\"+name+"\\img11.jpg";
        a.img.obj12 = "\\"+name+"\\img12.jpg";
        a.img.obj13 = "\\"+name+"\\img13.jpg";
        a.img.obj14 = "\\"+name+"\\img14.jpg";
        var json = a;
        console.log(a);



        fs.writeFile(__dirname + "/json/templates.json", JSON.stringify(json));


        a.save(function (err, a) {
            if (err) throw err;

            //fs.writeFile('json/templates.json', json, 'utf8', callback);
            console.error('saved img to mongo ');
        });




        //  ----------------------------------------------------------------------------
        console.log("sawami is here");


        console.log('Setting to true');

    }
    else
    {
        response.sendFile(path.join(__dirname,'home.html'));
        console.log(" already exist  ")
        console.log('Setting to true');


    }

    setTimeout( function()
    {

        response.sendFile(path.join(__dirname,'home.html'));
    }, 20000);

    //var renderedHtml = ejs.render(response, {name: name});
    /*  var content = fs.readFileSync('index.html', 'utf-8');
      var compiled = ejs.compile(content);*/


    //response.writeHead(200, {'Content-Type': 'text/html'});
    //



    //response.end(compiled({name: name}));
    //response.end(renderedHtml);
    //response.render(__dirname + "/index2.html", {name:name});
    //response.sendFile(path.join(__dirname,  'index2.html'),{name:name});

})




/* app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });*/

app.get('https://afternoon-depths-19370.herokuapp.com/', function (req, res,next) {
    res.sendFile('index.html');
});


/*app.get('https://afternoon-depths-19370.herokuapp.com/home', function (req, res,next) {
    res.sendFile(path.join(__dirname,  'view/home.html'));
});*/

