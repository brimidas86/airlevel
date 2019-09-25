import React, { Component } from 'react';
import { CardElement, injectStripe} from 'react-stripe-elements';
import Axios from 'axios';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
    }

    submit = async (ev) => {
        let { token } = await this.props.stripe.createToken({ name: "Airlevel" });
        let response = await fetch("http://localhost:9000/charge", {
            method: "POST",
            headers: { "Content-Type": "text/plain"},
            body: token.id
        }).catch(er =>{
            console.log(er);
        })

        console.log(response);
    }

    continue = ()=>{
        this.props.nextStep();
    }

    render() { 
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="mb-4">
                        <span className="badge badge-info badge-lg float-left">
                            %
							</span>
                        <h3>Payments</h3>
                        <p className="lead">
                            Please enter your card information below.
                        </p>
                        <hr />
                    </div>
                    <div className="checkout">
                        <CardElement className="form-control"></CardElement>
                        <br/>
                        <button className="btn btn-success" onClick={this.submit}>Submit</button>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
            </div>
        );
    }
}
 
export default injectStripe(CheckoutForm);