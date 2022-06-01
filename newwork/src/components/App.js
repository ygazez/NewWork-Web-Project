import React from "react";
import SearchBar from "./SearchBar";
import Worklist from "./Worklist";
import axios from "axios";
import AddWork from "./AddWork";
import EditWork from "./EditWork";
//import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    works: [],
    searchQuery: "",
  };

  componentDidMount() {
    this.getWorks();
  }
  //GETWORK
  getWorks = async () => {
    const response = await axios.get(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/"
    );
    this.setState({ works: response.data });
  };
  //DELETEWORK
  deleteWork = async (iş_ID) => {
    await axios.post(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/Delete/" + iş_ID
    );
    const newWorklist = this.state.works.filter((m) => m.iş_ID !== iş_ID);
    this.setState((state) => ({
      works: newWorklist,
    }));
    this.getWorks();
  };
  //SEARCHWORK
  searchWork = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  //ADDWORK
  addWork = async (work) => {
    console.log("addwork");
    console.log(work);

    await axios.post(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/Create",
      work
    );
    this.setState((state) => ({
      works: state.works.concat([work]),
    }));

    this.getWorks();
  };
  // EDIT Work
  editWork = async (iş_ID, updatedWork) => {
    console.log(updatedWork);
    console.log(iş_ID);
    await axios.post(
      `https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/Edit/${iş_ID}`,
      updatedWork
    );
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
            <Route
              path="/add"
              render={({ history }) => (
                <AddWork
                  onAddWork={(work) => {
                    this.addWork(work);

                    history.push("/");
                  }}
                />
              )}
            ></Route>

            <Route
              path="/edit/:id"
              render={(props) => (
                <EditWork
                  {...props}
                  onEditWork={(iş_ID, work) => {
                    this.editWork(iş_ID, work);
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
