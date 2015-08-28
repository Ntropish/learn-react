$(document).on('ready', function(){

  var SearchBar = React.createClass({
    handleChange: function() {
      this.props.onUserInput(
        this.refs.searchFilterInput.getDOMNode().value,
        this.refs.inStockOnlyInput.getDOMNode().checked
      );
    },
    render: function() {
      return(
        <form>
          <input
            type="text"
            placeholder="Search"
            value={this.props.filterText}
            ref="searchFilterInput"
            onChange={this.handleChange}>

          </input>
          <label> Only see items in stock
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
              ref="inStockOnlyInput"
              onChange={this.handleChange}/>
          </label>
        </form>
      )
    }
  });

  var ProductList = React.createClass({
    render: function() {
      console.log(this.props);
      var rows = [];
      var lastCategory = '';
      this.props.products.forEach(function(product){
        if (product.category !== lastCategory) {
          rows.push(<ProductCategoryRow
            category={product.category}
            key={product.category}/>);
        }
        if (

          (
            this.props.filterText === '' ||
            product.name.indexOf(this.props.filterText) !== -1
          )
            &&
          (
            !this.props.inStockOnly ||
            product.stocked
          )

          ) {
          rows.push(<ProductRow
            product={product}
            ket={product.name}/>);
        }
        lastCategory = product.category;
      }.bind(this));

      return(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      )
    }
  })

  var ProductCategoryRow = React.createClass({
    render: function() {
      return(
        <tr>
          <th colSpan="2">
            {this.props.category}
          </th>
        </tr>
      )
    }
  })

  var ProductRow = React.createClass({
    render: function() {
      var name = this.props.product.stocked ?
        this.props.product.name :
        <span style={{color: 'red'}}>
          {this.props.product.name}
        </span>;
      return(
        <tr>
          <td>{name}</td>
          <td>{this.props.product.price}</td>
        </tr>
      )
    }
  })

  var Table = React.createClass({
    getInitialState: function() {
      return {
        filterText: '',
        inStockOnly: false
      };
    },
    handleUserInput: function(filterText, inStockOnly) {
      this.setState({
        filterText: filterText,
        inStockOnly: inStockOnly
      });
    },
    render: function() {
      return(
        <div>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onUserInput={this.handleUserInput}/>
          <ProductList
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            products={this.props.products}/>
        </div>
      );
    }
  });

  var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

  React.render(
    <Table products={PRODUCTS} />,
    document.getElementById('content')
  );

});
