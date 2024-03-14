const { productService } = require("../services")

class ProductController {
    constructor(){
        this.service = productService
    }
    getProudcts = async (req, res)=>{
        
        res.send('get Products')
    }
    getProudct =  async (req, res)=>{
        res.send('get product')
    }
    createProudct = async (req, res)=>{
        try {
            res.send('post products')
        } catch (error) {
            res.send(error)
        }
    }
    updateProudct = async (req, res)=>{
        try {
            res.send('put products')
        } catch (error) {
            res.send(error)
        }
    }
    deleteProudct = async (req, res)=>{
        try {
            res.send('delete products')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = ProductController