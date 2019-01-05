import React from "react";
import Table from "./table/index";
import View from "./view/index"; 
import Form from "./form/index";

import  {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
}from "react-router-dom"



const  tableHeaders = ['Id','Name', 'Alias', 'Team']


class App extends React.Component {

    state = {

         tableValues :[ ]
    }

    componentDidMount() {
        this.fetchList()
    }

    fetchList() {

        let self = this;
        const request = new Request("/heroes", {
            method: "GET",
            headers: {"content-type":"application/json"}
        })
        fetch(request)
        .then(res => res.json())
        .then(function(data) {
            self.setState({"tableValues":data})
        });
    }

    

   /* onViewClick(id) {
        console.log(id)
        const data = tableValues.find(val => val[0] === id)
        const newRecord = {
            name: data[1],
            alias: data[2],
            team: data[3]
        }
        this.setState({ 
            selectedId: id,
            selectRecord: newRecord
        
        })
    }*/
    constructor(props) {
        super(props)
        this.createRecord = this.createRecord.bind(this)
    }

    createRecord(name,alias,team) {
        const self = this;
        var body = {
            name: name,
            alias: alias,
            team: team

        };
        var request = new Request('/heroes', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetch(request)
        //.then(res => res.json())
        .then(function() {
            self.fetchList()
        });
    }

   /* createRecord(name,alias,team) {
        console.log(name,alias,team)
        const ID = (Math.random() * 100).toString();
        const newRecord = [ID,name,alias,team]
        //const newTableValues = this.state.tableValues.map(val => val)
        const newTableValues = [...this.state.tableValues]
        newTableValues.push(newRecord)
        this.setState({tableValues:newTableValues})
    }*/

    render() {
         return (
            <Router>
                <Switch>
                <Route exact path="/create" render = {(props) => {
                        return  <Form formSubmitCallback = {this.createRecord}
                        history = {props.history}
                        />
                         
                    }}/> 

                    <Route exact path="/List" render = {(props) => {
                        return <Table 
                                     values = {this.state.tableValues} 
                                     headers = {tableHeaders} 
                                     history = {props.history}
                                     /> 
                    }}/> 

                    <Route exact path="/view/:id" component={View}/>
                    <Redirect to="/List"/>
                </Switch>   
             </Router>  
                
         );   
     }
}

export default App;