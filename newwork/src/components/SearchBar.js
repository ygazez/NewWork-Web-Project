import React from "react";

class SearchBar extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row mb-5">
          <div className="col-12">
            <input
              onChange={(event) => {
                this.props.searchWorkProp(event);
              }}
              type="text"
              className="form-control"
              placeholder="Search a work"
            />
          </div>
        </div>
      </form>
    );
  }
}
export default SearchBar;
