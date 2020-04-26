
const signinHandler= (req,res,bcrypt,db)=>{
	const {email, password}= req.body;
	if(!email || !password){
		return res.json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data=>{
		const isTrue= bcrypt.compareSync(password, data[0].hash);
		if(isTrue){
			return db.select('*').from('users')
			.where('email', '=' , email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err => res.json("unable to get user"))
			
		}
		else{
			 res.json("wrong credential");
		}

	})
	.catch(err=> res.json("wrong credentials"))
}

module.exports={
	signinHandler: signinHandler
}