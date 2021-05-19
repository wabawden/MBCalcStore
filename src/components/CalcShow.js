import React from 'react';
import { connect } from 'react-redux';

import { round } from './StandardCalculator';

class CalcShow extends React.Component {
    
    calculate = () => {
        var standardStake = (parseFloat(this.props.currentCalc.stake)*parseFloat(this.props.currentCalc.backodds))/parseFloat(this.props.currentCalc.layodds);
        var standardStakeWithComm = round(standardStake + ((((parseFloat(this.props.currentCalc.commission)/100)*standardStake))/parseFloat(this.props.currentCalc.layodds)), 2);
        var standardProfitLoss = round(parseFloat(standardStakeWithComm - this.props.currentCalc.stake - ((parseFloat(this.props.currentCalc.commission)/100)*standardStake)), 2);
        var standardLiability = round(standardStakeWithComm*(parseFloat(this.props.currentCalc.layodds)-1), 2);
        if (standardStakeWithComm) {
            return (
                <div>
                    <h2>Standard Lay:</h2>
                    <h3>Stake: £{standardStakeWithComm}</h3>
                    <h3>{standardProfitLoss > 0 ? "Profit" : "Loss"} <span style={{ color: (standardProfitLoss > 0 ? 'green' : 'red') }}>£{standardProfitLoss}</span></h3>
                    <h3>Liability: £{standardLiability}</h3>
                </div>
                );
        } else {
            return null
        };
    }
    
    
    render() {

        if (this.props.currentCalc) {
        return (
            <div>
                  <h2>{this.props.currentCalc.name} (standard calculator)</h2>
                  <h3>Stake: £{this.props.currentCalc.stake}</h3>
                  <h3>Back Odds: {this.props.currentCalc.backodds}</h3>
                  <h3>Lay Odds: {this.props.currentCalc.layodds}</h3>  
                  <p>Commission: {this.props.currentCalc.commission}%</p>
                  {this.calculate()}
            </div>
        );
        } else return <div>Error: Nothing to display!</div>;
    };
};

const mapStateToProps = (state) => {
    return{
      calcs: state.calc,
      currentCalc: state.current
    };
  };


export default connect(mapStateToProps)(CalcShow);