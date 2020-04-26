const Clarifai= require('clarifai');


const app = new Clarifai.App({
 apiKey: '59c841defcc04bd78ad9ef1e7afcecf5'
});

const imageApiHandler=(req,res)=>{
	app.models
	.predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
	.then(data=>{res.json(data)
	})
	.catch(err=> res.json("error getting api"))

}
const imageHandler= (req,res,db)=>{
	const{id}= req.body; 
	db('users').where({
		id: id
	}).increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>
		res.json("error"))
}

module.exports={
	imageHandler: imageHandler,
	imageApiHandler: imageApiHandler
}