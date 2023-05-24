const express = require('express');
const port = 9800;
const app = express();
const DB = require('./config/mongoose');
const crud = require('./model/modelCrud')

app.use(express.urlencoded());
app.set('view engine','ejs');

//Ejs file routing
app.get('/',(req,res)=>{
    crud.find({}).then((data)=>{
        return res.render('index',{
            data,
            singleData : ""
        })
    }).catch((err)=>{
        console.log(err);
        return res.redirect('back');
    })
});
//insertData
app.post('/insertData',(req,res)=>{
    const {bookname,bookprice,bookpages,bookauthor} = req.body;
    const updateId = req.body.updateId;
    if(updateId)
    {
        if(!bookname || !bookprice || !bookpages || !bookauthor)
        {
            console.log('All Data Fill In Field');
            return res.redirect('back');
        }
        crud.findByIdAndUpdate(updateId,{
            bookname : bookname,
            bookprice : bookprice,
            bookpages : bookpages,
            bookauthor : bookauthor
        }).then((data)=>{
            console.log('Data Successfully Update');
            return res.redirect('/');
    
        }).catch((err)=>{
            if(err)
            {
                console.log(err);
            }
        }); 
        return res.redirect('/');
    }
    if(!bookname || !bookprice || !bookpages || !bookauthor)
    {
        console.log('All Data Fill In Field');
        return res.redirect('back');
    }
    crud.create({
        bookname : bookname,
        bookprice : bookprice,
        bookpages : bookpages,
        bookauthor : bookauthor
    }).then((data)=>{
        console.log('Data Successfully Insert');
        return res.redirect('/');

    }).catch((err)=>{
        if(err)
        {
            console.log(err);
            return res.redirect('back');
        }
    });
});
//delete data
app.get('/deleteData',(req,res)=>{
    let id = req.query.id;
    crud.findByIdAndDelete(id)
    .then((data)=>{
        console.log('Your Data Successfully Delete');
        return res.redirect('back');
    }).catch((err)=>{
        console.log(err);
        return res.redirect('back');
    });
});
//update data
app.get('/updateData',async(req,res)=>{
    let id = req.query.id;
    let allData = await crud.find({});
    crud.findById(id).then((singleData)=>{
        return res.render('index',{
            singleData,
            data : allData
        });
    }).catch((err)=>{
        console.log(err);
        return res.redirect('back');
    });
});
app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log('Server is Running On Port :- '+port);
});