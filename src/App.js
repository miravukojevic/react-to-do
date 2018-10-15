import React, { Component } from 'react';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class App extends Component {
  state = {
    inputName: '',
    toDoList: [],
    people: [],
    originalProjectList: [],
    lat: '27.957779',
    lng: '-82.514772',
    activePage: 1,
    itemPerPage: 20,
    loadImage: <img src="loader.gif" />,
    loaderText:  'Fetching data...',
    isLoading: true

  }
  changeLatitude = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      this.fetchData()
  } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
  }
  }
  removeItemFromList = (mira) => {
    // console.log(el);
      console.log(mira);
    this.setState({
      toDoList: this.state.toDoList.filter(el => el !== mira)
      
      // list: this.state.list.filter(el => el !== mira)
  })
}
  showPosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  fetchData = () => {
    fetch( `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.state.lat}&lng=${this.state.lng}&fDstL=0&fDstU=1000`)
    .then(response => response.json())
    .then(response => {
      this.setState({
        toDoList: [...this.state.toDoList, this.state.inputName],
        // list: [...this.state.list, {content: (<li onClick={this.removeItemFromList}><span>-</span><div className="title">Click Here to remove an item</div>>{this.state.inputName}</li>)}],
        inputName: "",
        people: response.acList,
        originalProjectList: response.acList,
        loadImage: '',
        loaderText: '',
        isLoading: false

      })
      // console.log(lat)
     })
  }

  componentDidMount() {
    this.fetchData()
    
  }


  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  
     
        
  render() {
    const{people, lat, lng,  loadImage, loaderText, isLoading} = this.state;

    let indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    let renderedProjects = this.state.originalProjectList.slice(indexOfFirstTodo, indexOfLastTodo);

    // const loaderImage = <img src="loader.gif" />;


    let listItems = renderedProjects.map((person, index) => {
      return (


      <tr key={index}> 
          <td  width="20%">{person.Alt}</td>
          <td>{person.Op}</td>
          <td>{person.Cou}</td>
      </tr>

      )
    });
    console.log(indexOfFirstTodo);

    return (
      
      <div className="App">
      <h1>Airline List</h1>

       { isLoading ? <div className="loader" ><img width="30px" src="loader.gif" /><span className="loader-text">{loaderText}</span></div> : null }

      <table  style={{width:'100%'}} cellspacing="0" cellpadding="0" className="table table-sm table-dark">
        <tbody>
          <tr>
              <th scope="row" className="border-none" width="150px">Aircraft's model</th>
            <th scope="row">The manufacturer's name</th>
            <th scope="row">Country</th>
          </tr>
        {listItems}
          {/* <tr>
            <th scope="row" className="border-none" width="150px">Aircraft's model</th>
            <th scope="row">The manufacturer's name</th>
            <th scope="row">Country</th>
          </tr>
          <tr>
            <td scope="row">{this.state.people.map((person, index) => (
              <div key={index}>{person.Alt}</div>
            ))}</td>
            <td> {this.state.people.map((person, index) => (
              <div key={index}>{person.Op}</div>
            ))}</td>
            <td>{this.state.people.map((person, index) => (
              <div key={index}>{person.Cou}</div>
            ))}</td>
          </tr>
          <tr>
            <td scope="row">
            
            </td>
          </tr>
          <tr>
            <td></td>
          </tr> */}
        </tbody>
      </table>
      <footer>
        <div className="pagination-div">
          <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemPerPage}
              totalItemsCount={this.state.originalProjectList.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              activeLinkClass="page-link"
              itemClass="page-item"
              linkClass="page-link"
            />
          <button className="btn btn-default text-center" onClick={this.changeLatitude} >Channge lat</button>
          </div>
        
          {/* <table className="container2">
          <tr>
            <td></td>
            <div className="container1">

            

            </div>
            </tr>
          </table> */}
        </footer>
      </div>
    );
  }
}

export default App;
