import React from "react";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      //search
      search: "",
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      value: "",
    });

    this.props.addFunction(this.state.value);
    event.preventDefault();
  }

  // update search
  updateSearch(event) {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  render() {
    // search
    const filteredList =
      this.state.search !== ""
        ? this.props.currList.filter(
            (listItem) =>
              listItem.toLowerCase().indexOf(this.state.search) !== -1
          )
        : this.props.currList;

    return (
      <div className="col-6 mx-auto">
        <p className="h2">{this.props.title}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>

          <input className="btn btn-sm" type="submit" value="Submit" />

          {/* search */}
          <label>
            <input
              placeholder="Search"
              className="form-control input-sm"
              type="text"
              value={this.state.search}
              onChange={this.updateSearch}
            />
          </label>
        </form>

        <ul className="Box">
          <div className="Box-header">{this.props.title}</div>
          {filteredList.map((item, index) => (
            <li className="Box-row" key={index}>
              {" "}
              {item}
              {/* remove button */}
              <input
                className="btn btn-sm float-right"
                type="button"
                value="remove"
                onClick={() => this.props.removeFunction(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
