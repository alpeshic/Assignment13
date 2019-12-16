import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import UpdateProductForm from './UpdateProductForm'

// let PRODUCTS = {
//     '1': {id: 1, category: 'Music', price: '$459.99', name: 'Clarinet'},
//     '2': {id: 2, category: 'Music', price: '$5,000', name: 'Cello'},
//     '3': {id: 3, category: 'Music', price: '$3,500', name: 'Tuba'},
//     '4': {id: 4, category: 'Furniture', price: '$799', name: 'Chaise Lounge'},
//     '5': {id: 5, category: 'Furniture', price: '$1,300', name: 'Dining Table'},
//     '6': {id: 6, category: 'Furniture', price: '$100', name: 'Bean Bag'}
// };

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: '',
            updateProduct: '',
            showNewProductForm: true
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancelUpdate = this.handleCancelUpdate.bind(this)
        this.getAllProducts = this.getAllProducts.bind(this)
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }
    handleCancelUpdate(){
        this.setState({showNewProductForm : true, updateProduct : ''})
    }
    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        console.log(product.instock)
        var newProduct ={
            id: new Date().getTime(),
            product: {
                productid: new Date().getTime(),
                category: product.category,
                name: product.name,
                price: product.price,
                instock: product.instock
            }
        }
        fetch('/product/create', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        }).then(this.getAllProducts())
        // this.setState((prevState) => {
        //     let products = prevState.products
        //     products[product.id] = product
        //     return { products }
        // })
    }
    handleUpdate(productId) {
        this.setState((prevState) => {
            this.setState({showNewProductForm : false})
            // fetch('/product/delete', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //       },
            //     body: JSON.stringify(productId)
            // })
            fetch('/product/getById?id=' + productId)
            .then(response => response.json())
            .then(json => this.setState({ updateProduct: json.product[0] }))
            //let products = prevState.products
            //delete products[productId]
            //return { products }
        });
    }
    handleDestroy(productId) {
        this.setState((prevState) => {
            // fetch('/product/delete', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //       },
            //     body: JSON.stringify(productId)
            // })
            fetch('/product/delete?id=' + productId)
            .then(this.getAllProducts())
            //let products = prevState.products
            //delete products[productId]
            //return { products }
        });
    }
    getAllProducts() {
        fetch('/product/get')
            .then(response => response.json())
            .then(json => this.setState({ products: json }))
    }
	componentDidMount() {
		// fetch('/message')
		//   .then(response => response.json())
        //   .then(json => this.setState({ message: json }));
           this.getAllProducts();
        // fetch('/product/get')
        //     .then(response => response.json())
        //     .then(json => this.setState({ products: json }))
	  }
    render () {
        let productForm;
        if(this.state.showNewProductForm){
            productForm = <ProductForm
            onSave={this.handleSave}></ProductForm>
        } else {
            productForm =<UpdateProductForm
                    onSave={this.handleSave} 
                    onCancelUpdate={this.handleCancelUpdate}
                    product = {this.state.updateProduct}></UpdateProductForm>
        }
        return (
            <div className="col-md-7">
			<h2>{this.state.message}</h2>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdate}></ProductTable>
                {productForm}
                
                
            </div>
        )
    }
}

export default Products