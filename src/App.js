import React, { Component } from 'react';
import Main from './components/mainComponent';
import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


import './App.css';



const store = ConfigureStore();

//class component with a class inheritance "extends". Component is the parent class provided by the React library 
class App extends Component {
//----------------------------------------------------------------------------------------------------------------------
   
//----------------------------------------------------------------------------------------------------------------------

    
    //render is a required function in class-based components
    //render functions return JSX structure (XML )
    // doesnt display the actual content but shows what the conetent will have and how it will arrange.
    //its a blue print 
    //cant have two returns 
    render() {
        return (
            // this makes the redux store available to all connected components that are children of App
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                    <Main/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    };
}

export default App;