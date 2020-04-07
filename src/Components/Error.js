import React, {Component} from 'react';

export default class ErrorComp extends Component{
    state = {error: null}
    static getDerivedStateFromError(error){
        console.error(error);
        return {error};
    }
    render(){
        if(this.state.error){
            return(
                <main className="error-display">
                    <h2>Oh no! We've got an Error!</h2>
                    <p>Go back and try something different I guess...</p>
                </main>
            )
        }
        return this.props.children;
    }
}