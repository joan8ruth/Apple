import React from "react";
import Table from "./table/index";
import View from "./view/index"; 

import  {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
}from "react-router-dom"

const tableValues = [
    
    ['101','Tony Stark', 'Iron Man', 'Avengers'],
    ['102','Peter Parker', 'Spider Man', 'Avengers'],
    ['103','Bruce Mayne', 'Bat Man', 'Justice League']
];

const tableHeaders = ['Id','Name', 'Alias', 'Team'];



class App extends React.Component {

    state = {
        selectedId: -1,
        selectRecord: {}
    }

    

    onViewClick(id) {
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
    }

    render() {
         return (
            <Router>
                <Switch>
                    <Route exact path="/List" render = {(props) => {
                        return <Table 
                                     values = {tableValues} 
                                     headers = {tableHeaders} 
                                     history = {props.history}
                                     /> 
                    }}/> 
                    <Route exact path="/view/:id" render = {(props) => {
                        console.log(props)
                        const data = tableValues.find(val => val[0] === props.match.params.id)
                        const newRecord = {
                                        name: data[1],
                                        alias: data[2],
                                        team: data[3]
                        }
                        
                        return <View
                                     name={newRecord.name} 
                                     alias={newRecord.alias}  
                                     team={newRecord.team} />

                    }}/> 
                    <Redirect to="/List"/>
                </Switch>   
             </Router>  
                
         );   
     }
}

export default App;