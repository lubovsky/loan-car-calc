import React, { Component } from 'react';
import './App.css';
import InputSlider from 'react-input-slider';
import Car from './cars.js';
import UserInfo from './user.js';
import axios from 'axios';

class App extends Component {
  state = {
    price: 1000,
    vznos: 0,
    carInfoMark: '',
    carInfoModel: '',
    carInfoYear: '',
    maxVznos: 70000,
    creditPeriod: 1,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerNameValid: false,
    customerPhoneValid : false,
    customerEmailValid : false,
    rulesValid : true,
    formValid: false,
    dataIsSend : false,
    cars: {},
    currentMark: '1500',
    years : ['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'],
    monthPrice: '** ***'
    
  };


  componentDidMount(){
    axios
     .get('cars.json')
     .then(({ data })=> {
       this.setState(
         { cars: data }
       );
     })
     .catch((err)=> {})
  }


  handleDragEnd = () => {
    //console.log('handleDragEnd');
    if (this.state.dataIsSend) this.monthPay();
  };

  chooseCar = event => {

    console.log(event.target.value);

    switch (event.target.name) {

      case 'credit-mark':

        this.setState( {
          currentMark: event.target.value,
          carInfoMark : this.state.cars[event.target.value].name  
        });
        break;

      case 'credit-model':
        this.setState( {
          carInfoModel : event.target.value   
        });
        break;

      case 'credit-year':
        this.setState( {
          carInfoYear : event.target.value   
        });
        break;
    }
      
  };


  handleChangeXPrice = pos => {
    this.setState({
      price: pos.x,
      maxVznos : parseInt(pos.x * 0.7)
    });

    if (pos.x < this.state.vznos) {
      this.setState({
        vznos: this.state.maxVznos
      });
    }
  };
  handleChangeXVznos = pos => {
    this.setState({
      vznos: pos.x
    });
  };

  handleChangeXYears = pos => {
    this.setState({
      creditPeriod: pos.x
    });
  };

  customerChange = event => {
    
    const { name, value } = event.target;
    (value != '') ? this.setState({[name+'Valid'] : true}) : this.setState({[name+'Valid'] : false});
    this.setState({
        [name]: value,
    },this.formValid);
  };

  checkRules = () => {
   
    this.setState(function(prevState, props){
      return {rulesValid:  !prevState.rulesValid}
    },this.formValid);
  };

  formValid = () => {
    this.setState( {formValid : this.state.customerNameValid 
      && this.state.customerPhoneValid  
      && this.state.customerEmailValid 
      && this.state.rulesValid});
  };

  formatprice = price => {   // функция форматирования цены в разряды
    let a = price.toString();
    return a.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, " $1 ");
  };

  declOfNum = (number, titles) => {
      let cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2: cases[(number%10<5)?number%10:5] ];
  };

  monthPay = () => {
    let procMonth = 0.02,
        creditMonth = this.state.creditPeriod * 12,
        creditSumm = this.state.price - this.state.vznos,
        temp = 1+procMonth,
        k = procMonth*Math.pow(temp,creditMonth)/(Math.pow(temp,creditMonth) - 1);

    this.setState({monthPrice: parseInt(creditSumm*k) });
  };

  formsSubmit = event => {
    
    if (this.state.formValid) {
      event.preventDefault();
      this.monthPay();
      this.setState({dataIsSend: true});
      let formData = {
        name: this.state.customerName,
        phone: this.state.customerPhone,
        email: this.state.customerEmail,
        price: this.state.price,
        vznos: this.state.vznos,
        creditPeriod : this.state.creditPeriod,
        carInfoMark: this.state.carInfoMark,
        carInfoModel : this.state.carInfoModel,
        carInfoYear : this.state.carInfoYear
      };

      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'send.php',
        data: formData
      })
      .then(function(response) {

        console.log(response);

      })

      .catch(function (error) {
          console.log(error);

      });

    } else {
      return false;
    }
    

  };


  render() {
    return (
      <div className="calc-wrap">
        <div className="calc-title">Online car loan calculation</div>
        <div className="calc-decr">credit from 9,9%*</div>
        <div className="mers"></div>
        <Car
          cars = {this.state.cars}
          currentMark = {this.state.currentMark}
          carInfoModel = {this.state.carInfoModel}
          carInfoYear = {this.state.carInfoYear}
          chooseCar = {this.chooseCar}
          carYears = {this.state.years}
        />
        <div className="sliderResultWrap">
          <div className="sliders">
            <div className="slider-wrap">
                <div className="label">Price</div>
                <div className="value">{this.formatprice(this.state.price) + ' $'}</div>
                <InputSlider
                  className="slider"
                  axis="x"
                  x={this.state.price}
                  xmin={1000}
                  xmax={200000}
                  xstep={100}
                  onDragEnd={this.handleDragEnd}
                  onChange={this.handleChangeXPrice}
                />
            </div>
            <div className="slider-wrap">
                <div className="label">Initial fee</div>
                <div className="value">{this.formatprice(this.state.vznos) + ' $'}</div>
                <InputSlider
                  className="slider"
                  axis="x"
                  x={this.state.vznos}
                  xmin={0}
                  xmax={this.state.maxVznos}
                  xstep={100}
                  onDragEnd={this.handleDragEnd}
                  onChange={this.handleChangeXVznos}
                />
            </div>
            <div className="slider-wrap">
                <div className="label">Credit term</div>
                <div className="value">{this.formatprice(this.state.creditPeriod) + this.declOfNum(this.state.creditPeriod,['year','years','years'])}</div>
                <InputSlider
                  className="slider"
                  axis="x"
                  x={this.state.creditPeriod}
                  xmin={1}
                  xmax={7}
                  xstep={1}
                  onDragEnd={this.handleDragEnd}
                  onChange={this.handleChangeXYears}
                />
            </div>
          </div>
          <div className="result">
            <div className="title">Mounthly payment:</div>
            <div className="value">{this.formatprice(this.state.monthPrice) + ' $'}</div> 
            <div className="descr">{(!this.state.dataIsSend) ? 'To find out the amount, fill out your details' : '' }</div>
          </div>  
        </div>
        
        <UserInfo
          customerName = {this.state.customerName}
          customerPhone = {this.state.customerPhone} 
          customerEmail = {this.state.customerEmail} 
          customerNameValid ={this.state.customerNameValid}
          customerPhoneValid = {this.state.customerPhoneValid}
          customerEmailValid = {this.state.customerEmailValid}
          customerChange = {this.customerChange} 
        />
        <div className="creditActions">
          <div className={(this.state.rulesValid) ? 'rules' : 'rules error'}>
            <input 
            id="rules"
            type="checkbox" 
            onChange={this.checkRules} 
            checked={this.state.rulesValid}
            />
            <label htmlFor="rules"></label>
            <span><span>I confirm my consent to the processing and storage of personal data in accordance with the conditions <a href="" target="blank">user agreement</a></span></span>
          </div>
          <div className="buttonSubmit">
            <button disabled={!this.state.formValid} onClick={this.formsSubmit}>Calculate the loan</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
