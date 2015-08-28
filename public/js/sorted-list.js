$(document).on('ready', function(){

  var SearchBar = React.createClass({displayName: "SearchBar",
    handleChange: function() {
      this.props.onUserInput(
        this.refs.searchFilterInput.getDOMNode().value,
        this.refs.inStockOnlyInput.getDOMNode().checked
      );
    },
    render: function() {
      return(
        React.createElement("form", null, 
          React.createElement("input", {
            type: "text", 
            placeholder: "Search", 
            value: this.props.filterText, 
            ref: "searchFilterInput", 
            onChange: this.handleChange}

          ), 
          React.createElement("label", null, " Only see items in stock", 
            React.createElement("input", {
              type: "checkbox", 
              checked: this.props.inStockOnly, 
              ref: "inStockOnlyInput", 
              onChange: this.handleChange})
          )
        )
      )
    }
  });

  var ProductList = React.createClass({displayName: "ProductList",
    render: function() {
      console.log(this.props);
      var rows = [];
      var lastCategory = '';
      this.props.products.forEach(function(product){
        if (product.category !== lastCategory) {
          rows.push(React.createElement(ProductCategoryRow, {
            category: product.category, 
            key: product.category}));
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
          rows.push(React.createElement(ProductRow, {
            product: product, 
            ket: product.name}));
        }
        lastCategory = product.category;
      }.bind(this));

      return(
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "Name"), 
              React.createElement("th", null, "Price")
            )
          ), 
          React.createElement("tbody", null, 
            rows
          )
        )
      )
    }
  })

  var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
    render: function() {
      return(
        React.createElement("tr", null, 
          React.createElement("th", {colSpan: "2"}, 
            this.props.category
          )
        )
      )
    }
  })

  var ProductRow = React.createClass({displayName: "ProductRow",
    render: function() {
      var name = this.props.product.stocked ?
        this.props.product.name :
        React.createElement("span", {style: {color: 'red'}}, 
          this.props.product.name
        );
      return(
        React.createElement("tr", null, 
          React.createElement("td", null, name), 
          React.createElement("td", null, this.props.product.price)
        )
      )
    }
  })

  var Table = React.createClass({displayName: "Table",
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
        React.createElement("div", null, 
          React.createElement(SearchBar, {
            filterText: this.state.filterText, 
            inStockOnly: this.state.inStockOnly, 
            onUserInput: this.handleUserInput}), 
          React.createElement(ProductList, {
            filterText: this.state.filterText, 
            inStockOnly: this.state.inStockOnly, 
            products: this.props.products})
        )
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
    React.createElement(Table, {products: PRODUCTS}),
    document.getElementById('content')
  );

});