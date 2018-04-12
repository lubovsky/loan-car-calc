
import React, { Component } from 'react';


export default class UserInfo extends React.Component {

  render() {

    return <div className="customerWrap">
        <div className="item">
		    <input 
		    type="text" 
		    placeholder="Name*" 
		    name='customerName' 
		    className = {(this.props.customerNameValid) ? '': 'error'}
		    value={this.props.customerName} 
		    onChange={this.props.customerChange} />
		</div>
		<div className="item">
		    <input 
		    type="text" 
		    placeholder="Phone*" 
		    name='customerPhone' 
		    className = {(this.props.customerPhoneValid) ? '': 'error'}
		    value={this.props.customerPhone} 
		    onChange={this.props.customerChange} />
		</div>
		<div className="item">
	        <input 
	        type="text" 
	        placeholder="E-mail*" 
	        name='customerEmail' 
	        className = {(this.props.customerEmailValid) ? '': 'error'}
	        value={this.props.customerEmail} 
	        onChange={this.props.customerChange} />
	    </div>
    </div>
  }
}