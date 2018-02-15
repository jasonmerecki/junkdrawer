
const state1 = {symbols:
        {
            ABC: {symbol: "ABC", price:"49.02" },
            DEF: {symbol: "DEF", price:"132.18" },
            GJI: {symbol: "GHI", price:"89.01" }
        }
};

const state2 = {symbols:
        {
            ABC: {symbol: "ABC", price:"49.71" },
            DEF: {symbol: "DEF", price:"132.18" },
            GJI: {symbol: "GHI", price:"89.71" }
        }
};


const standardHeader = React.createElement(
    "thead",
    null,
    React.createElement("th",{colspan: 2}, "Table contents changed and built by React")
);


class TestRow extends React.Component {
    render() {
        const td1 = React.createElement("td", null, this.props.symbol);
        const td2 = React.createElement("td", null, this.props.price);
        return React.createElement("tr", null, td1, td2 );
    };
};

class TestBpdy extends React.Component {
    render() {
        const childRows = [];
        for (const symbolObj of Object.values(this.props.symbols)) {
            childRows.push(React.createElement(TestRow, symbolObj));
        }
        return React.createElement("tbody", null, childRows);
    };
};

// ugly work-around because the webpage is not 'contained' in a react app
const tableHolder = {};

class TestTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = state1;
        tableHolder[this.props.name] = this;
    };
    componentDidUpdate(prevProps, prevState) {
        tableHolder[this.props.name].postUpdate();
    };
    render() {
        const bodyComponent = React.createElement(
            TestBpdy, this.state
        );
        return React.createElement("table", {border: 2}, standardHeader, bodyComponent);
    };
}



const reactEle = document.getElementById('reactComponent');

const tableElement = React.createElement(TestTable, {name: "mytable"});

ReactDOM.render(tableElement, reactEle);

// tableHolder["mytable"].setState(state2);




/*
syntax:

React.createElement(
  type,
  [props],
  [...children]
)
 */

/*
The table being built:
<table border="2">
        <thead>
        <th colspan="2">Table contents changed by innerHTML text</th>
        </thead>
        <tbody id="changeTableByText">
        <tr>
            <td>ABC</td>
            <td>49.02</td>
        </tr>
        <tr>
            <td>DEF</td>
            <td>132.18</td>
        </tr>
        <tr>
            <td>GHI</td>
            <td>89.01</td>
        </tr>
        </tbody>
    </table>
 */