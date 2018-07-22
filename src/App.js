import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class  ProductCategoryRow extends Component{
   render(){
       return(
           <tr><th colSpan="2">{this.props.category}</th></tr>
       )
   }
}

class ProductRow extends Component{
    render(){
        var name=this.props.product.stocked?this.props.product.name:
            <span style={{color:'red'}}>
                {this.props.product.name}
            </span>;
        return(
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends Component{
    render(){
        var rows=[];
        var lastCategory=null;
        this.props.products.forEach((product)=> {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if(product.category!==lastCategory) {
                rows.push(
                    <ProductCategoryRow category={product.category} key={product.category}/>
                );
            }
                rows.push(
                    <ProductRow product={product} key={product.name}/>
                );
                lastCategory=product.category;

        });
        return(
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>

            </table>
        );
    }
}

class SearchBar extends Component{
    constructor(props){
        super(props);
    //绑定作用域
     this.handleFilterTextInputChange=this.handleFilterTextInputChange.bind(this);
     this.handleInStockInputChange=this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value)
    }
    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }
    render(){
        return(
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextInputChange}/>
                <p>
                    <input type="checkbox" checked={this.props.isStockOnly} onChange={this.handleInStockInputChange}/>
                    {''}
                    Only show products in stock
                </p>
            </form>

        )
    }
}

class FilterableProductTable extends  Component{
    constructor(props){
        super(props);
        this.state={
            filterText:"",
            inStockOnly:true
        };
        //绑定作用域
        this.handleFilterTextInput=this.handleFilterTextInput.bind(this);
        this.handleInStockInput=this.handleInStockInput.bind(this);
    }
    handleFilterTextInput(filterText){
        this.setState({
            filterText:filterText
        })
    }
    handleInStockInput(inStockOnly){
        this.setState({
            inStockOnly:inStockOnly
        })
    }

    render(){
        return(
            <div className="contain">
                <SearchBar
                    filterText={this.state.filterText}
                    isStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}


                />
                <ProductTable products={this.props.products}
                              filterText={this.state.filterText}
                              inStockOnly={this.state.inStockOnly}
                />
            </div>

        )

    }
    
}
export default FilterableProductTable;
