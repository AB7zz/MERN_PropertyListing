import mongoose from 'mongoose'

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@realestatemern.xze6t9s.mongodb.net/?retryWrites=true&w=majority`
    try{
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected successfully')
    } catch (error){
        console.log('Error 2: ', error.message)
    }
}

export default Connection