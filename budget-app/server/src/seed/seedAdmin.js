const CryptoJS =require('crypto-js')
const { Admin} = require('../models')

exports.createAdmin = async () =>{
    const username=process.env.DEFAULT_ADMIN_USERNAME;
    const password=process.env.DEFAULT_ADMIN_PASSWORD;
    try {
        const admin = await Admin.findOne({username: username , password:password})
        if(admin !== null){
            return true
        }
        const newAdmin = new Admin({
            username:process.env.DEFAULT_ADMIN_USERNAME,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            )
        })
        await newAdmin.save()
        console.log('---------------')
        console.log('Admin Created With')
        console.log(`Username => ${username}`)
        console.log(`Password => ${password}`)
        console.log('---------------')
    } catch (error) {
        console.log(error)
        return false
    }
}