import React from "react";

class Table extends React.Component {
  getValue(data, tableName, row) {
    if (tableName in data && row in data[tableName]) {
      return data[tableName][row];
    } else {
      return "Add Score";
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      //search
      search: "",
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  // update search
  updateSearch(event) {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  createRows(name) {
    return (
      <div>
        {this.props.rows.map((row, index) => (
          <div className="Box-row d-flex flex-justify-between" key={index}>
            {row}
            <input
              className="form-control input-sm"
              type="text"
              placeholder={this.getValue(this.props.data, name, row)}
              onChange={(event) =>
                this.props.addFunction(name, row, event.target.value)
              }
            />

            {/* remove students from grades */}
            <input
              className="btn btn-sm "
              type="button"
              value="remove"
              onClick={() => this.props.removeStudent(index)}
            />
          </div>
        ))}
      </div>
    );
  }
  // eslint-disable-next-line no-dupe-class-members
  render() {
    // search
    const filteredList =
      this.state.search !== ""
        ? this.props.tableNames.filter(
            (listItem) =>
              listItem.toLowerCase().indexOf(this.state.search) !== -1
          )
        : this.props.tableNames;
    console.log(filteredList);

    return (
      <div>
        {/* search */}
        <label>
          <input
            placeholder="Search"
            className="form-control input-sm mx-auto d-block mt-6"
            type="text"
            value={this.state.search}
            onChange={this.updateSearch}
          />
        </label>

        {this.props.tableNames.map((name, index) => (
          <div className="pt-6" key={index}>
            <div className="Box col-6 mx-auto">
              <div className="Box-header Box-title">
                {name}

                {/* remove assignments from grades */}
                <input
                  className="btn btn-sm float-right"
                  type="button"
                  value="remove"
                  onClick={() => this.props.removeAssignment(index)}
                />
              </div>

              <div>{this.createRows(name)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;
