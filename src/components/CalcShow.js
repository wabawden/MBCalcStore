import React from 'react';
import { connect } from 'react-redux';

import { round } from './StandardCalculator';

var standardProfitLoss;

class CalcShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentCalc;
        this.handleStake = this.handleStake.bind(this);
        this.handleBackodds = this.handleBackodds.bind(this);
        this.handleLayodds = this.handleLayodds.bind(this);
        this.handleCommission = this.handleCommission.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDone = this.handleDone.bind(this);
    
    }
    
    componentDidMount() {
        console.log(this.props.currentCalc)
    }

    calculate = () => {
        var standardStake = (parseFloat(this.state.stake)*parseFloat(this.state.backodds))/parseFloat(this.state.layodds);
        var standardStakeWithComm = round(standardStake + ((((parseFloat(this.state.commission)/100)*standardStake))/parseFloat(this.state.layodds)), 2);
        var standardProfitLoss = round(parseFloat(standardStakeWithComm - this.state.stake - ((parseFloat(this.state.commission)/100)*standardStake)), 2);
        var standardLiability = round(standardStakeWithComm*(parseFloat(this.state.layodds)-1), 2);
        if (standardStakeWithComm) {
            return (
                <div>
                    <h2>Standard Lay:</h2>
                    currentCalc            <h3>Stake: £{standardStakeWithComm}</h3>
                    <h3>{standardProfitLoss > 0 ? "Profit" : "Loss"} <span style={{ color: (standardProfitLoss > 0 ? 'green' : 'red') }}>£{standardProfitLoss}</span></h3>
                    <h3>Liability: £{standardLiability}</h3>
                    <div className="form-group">
                            <label>Name </label>
                            <input type="text"
                                    id="name"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleName} />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Done?</label>
                            <input type="checkbox"
                                    id="done"
                                    className="form-check-input"
                                    name="done"
                                    value={this.state.done}
                                    onChange={this.handleDone} />
                        </div>
                        <button className="btn btn-primary" onClick={this.onUpdate}>Update</button>
                </div>
                );
        } else {
            return null
        };
    }
    
    handleStake(event) {
        this.setState({stake: event.target.value});
      }

      handleBackodds(event) {
        this.setState({backodds: event.target.value});
      }

      handleLayodds(event) {
        this.setState({layodds: event.target.value});
      }

      handleCommission(event) {
        this.setState({commission: event.target.value});
      }

      handleName(event) {
        this.setState({name: event.target.value,
                      profit: standardProfitLoss,
                      date: new Date(Date.now()).toDateString(),
                      time: new Date(Date.now()).getHours() + ":" + (new Date(Date.now()).getMinutes().length < 2 ? "0" : "") + new Date(Date.now()).getMinutes(),
                      id: this.props.calcs ? (this.props.calcs.length + 1) : 1 });
      }

      handleDone(event) {
        this.setState({done: event.target.checked});
        console.log(event.target.checked);
      }
    
      handleSubmit(event) {
        this.calculate();
        event.preventDefault();
      }

    render() {
        console.log(this.props.currentCalc);
        console.log(this.props);
        if (this.props.currentCalc) {
        return (
            <div>
                <h2>{this.props.currentCalc.name}</h2>
                  <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Stake </label>
                            <input type="text" id="stake" className="form-control" name="stake" value={this.state.stake} onChange={this.handleStake} />
                        </div>
                        <div className="form-group">
                            <label>Back Odds </label>
                            <input type="text" id="backodds" className="form-control" name="backodds" value={this.state.backodds} onChange={this.handleBackodds} />
                        </div>
                        <div className="form-group">
                            <label>Lay Odds </label>
                            <input type="text" id="layodds" className="form-control" name="layodds" value={this.state.layodds} onChange={this.handleLayodds} />
                        </div>
                        <div className="form-group">
                            <label>Commission </label>
                            <input type="text" id="commission" className="form-control" name="commission" value={this.state.commission} onChange={this.handleCommission} />
                        </div>
                        {this.calculate()}
                    </form>
            </div>
        );
        } else return <div>Error: Nothing to display!</div>;
    };
};

const mapStateToProps = (state, ownProps) => {
    return{
      calcs: state.calc,
      currentCalc: 
            state.calc.map(calc => {
                if (calc.id === ownProps.match.params.id) {
                    return calc;
                }
            })
          
    }
};



export default connect(mapStateToProps)(CalcShow);