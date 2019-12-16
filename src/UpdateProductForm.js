import React, { Component } from 'react'

const RESET_VALUES = {id: '', category: '', price: '', name: '', instock: false}

class UpdateProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.state = {
            product: "",
            errors: {}
        }
    }
        
    handleChange(e) {
        const target = e.target
        var value = target.value
        const name = target.name
        if(target.type == 'checkbox')
        {
            value = target.checked
        }
        console.log(target.checked)
        this.setState((prevState) => {
            prevState.product[name] = value
            return { product: prevState.product }
        })
    }

    handleCancel(e) {
        this.props.handleCancelUpdate();
        e.preventDefault()
    }
    handleUpdate(e) {
        this.props.onUpdate(this.state.product);
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES), 
            errors: {}
        })
        // prevent the form submit event from triggering an HTTP Post
        e.preventDefault()
    }

    render () {
        console.log(this.props.product)
        return (
            <form>
                <h4>Update product</h4>
                <input type="hidden" value={this.props.product._id} />
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.props.product.name} /></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} value={this.props.product.category} /></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="number" className="form-control" step="0.01" name="price" onChange={this.handleChange} value={this.props.product.price} /></label>
                </p>
                <p>
                    <label>In Stock <br /> 
                    <input type="checkbox" className="form-control" name="instock" onChange={this.handleChange} value={this.props.product.instock} /></label>
                </p>
                <input type="submit" className="btn btn-info" value="Save" onClick={this.handleUpdate}></input>
   
                <input type="submit" className="btn btn-info" value="Cancel" onClick={this.handleCancel}></input>
            </form>
        )
    }
}

export default UpdateProductForm