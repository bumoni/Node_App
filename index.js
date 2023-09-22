const express = require('express');
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./db/Users")
const Product=require("./db/Products");
app.use(cors());
app.use(express.json())
app.post("/register", async (req, resp) => {
   let user = User(req.body);
   let result = await user.save();
   result=result.toObject();
   delete result.password;
   resp.send(result);
})

app.post("/login", async (req, resp) => {
   if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select('-password');
      if (user) {
         resp.send({...user,status_code: 200});
      }
      else {
         resp.send({ "result": "No User Found" ,status_code: 400})
      }
   }
   else {
      resp.send({ "result": "No User Found" ,status_code: 400})
   }
})

app.post("/add_product",async(req,resp)=>{
     let product=Product(req.body)
     product=await product.save();
     if(product){
      resp.send({status_code:200,result:"Successfully Added Product."});
     }
     else{
      resp.send({ "result": "Unable to connect" ,status_code: 400})
     }
    
})
app.get("/products",async (req,resp)=>{
   let products=await Product.find();
   if(products.length>0){
      resp.send(products);
   } 
   else{
      resp.send({"result":"No Data Found"})
   }
})
app.listen(5000)