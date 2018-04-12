
import React, { Component } from 'react';


export default class Car extends React.Component {

  render() {
  	
  	const cars = Object.entries(this.props.cars);

  	const marks = cars.map((item,index) => {
      return <option key={index} value={item[0]}>
        {item[1].name}
      </option>
    });

    const models = [];

    
    cars.map((item,index) => {
      if (item[1].id == this.props.currentMark) {

      	for (let prop in item[1].models) {
          models.push(item[1].models[prop].name);
    
        }
         
       }
    });
     
    const car = models.map((item,index) => {

    	return <option key={index}
          value={item}>{item}</option>

    });

    const years = this.props.carYears.map((item,index) => {

    	return <option key={index}
          value={item}>{item}</option>

    });

 
    return <div className="carSelectsWrap">
      <div className="item">
  	    <select 
  	      className="selectpicker" 
  	      id="bo_mark" 
  	      name="credit-mark" 
  	      placeholder="Марка автомобиля"
          defaultValue={this.props.currentMark}
  	      onChange={this.props.chooseCar} >
          <option value="0" selected="selected" disabled="">Make</option>
  	      {marks}
  	    </select>
      </div>
      <div className="item">
  	    <select 
  	      className="selectpicker" 
  	      id="bo_model" 
  	      name="credit-model" 
  	      placeholder="Модель автомобиля"
          defaultValue={this.props.carInfoModel}
          onChange={this.props.chooseCar}>
          <option value="0" selected="selected" disabled="">Model</option>
  	      {car}
  	    </select>
      </div>
      <div className="item">
  	    <select 
  	      className="selectpicker" 
  	      id="bo_year" 
  	      name="credit-year" 
  	      placeholder="Год автомобиля"
          defaultValue={this.props.carInfoYear}
          onChange={this.props.chooseCar}>
          <option value="0" selected="selected" disabled="">Year</option>
  	      {years}
  	    </select>
      </div>
    </div>
  }
}