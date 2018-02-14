class HelloMessage extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            "Hello ",
            this.props.name
        );
    }
}

const reactEle = document.getElementById('reactComponent');

ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), reactEle);

/*
syntax:

React.createElement(
  type,
  [props],
  [...children]
)
 */
