import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
        this.update = this.update.bind(this)
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }
    update() {
        this.props.onUpdate(this.props.product.id);
    }
  
    render () {
        console.log(this.props.product.product[0].instock)
        return (
            
            <tr>
                <td>{this.props.product.product[0].name}</td>
                <td>{this.props.product.product[0].category}</td>
                <td>${this.props.product.product[0].price}</td>
                <td>{this.props.product.product[0].instock ? "Yes" : "No"}</td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-info">Delete</button></td>
                <td className="text-right"><button onClick={this.update} className="btn btn-info">Update</button></td>
            </tr>
        )
    }
}

export default ProductRow