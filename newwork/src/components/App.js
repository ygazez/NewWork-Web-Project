import React from "react";
import SearchBar from "./SearchBar";
import Worklist from "./Worklist";
import axios from "axios";
import AddWork from "./AddWork";
//import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    works: [],
    searchQuery: "",
  };
  //GETWORK
  async componentDidMount() {
    const response = await axios.get(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/"
    );
    console.log(response);
    this.setState({ works: response.data });
  }
  //DELETEWORK
  deleteWork = async (work) => {
    axios.delete("https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/");
    const newWorklist = this.state.works.filter((m) => m.iş_ID !== work.iş_ID);
    this.setState((state) => ({
      works: newWorklist,
    }));
  };
  //SEARCHWORK
  searchWork = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  //ADDWORK
  addWork = async (work) => {
    await axios.post(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/",
      work
    );
    this.setState((state) => ({
      works: state.works.concat([work]),
    }));

    this.getWorks();
  };

  render() {
    let filteredWorks = this.state.works.filter((u) => {
      return (
        u.Konum.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !==
        -1
      );
    });

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchWorkProp={this.searchWork} />
                    </div>
                  </div>

                  <Worklist
                    works={filteredWorks}
                    deleteWorkProp={this.deleteWork}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route path="/add" component={AddWork} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
