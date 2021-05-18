import React from 'react';

function round(value, precision) {
    if (Number.isInteger(precision)) {
      var shift = Math.pow(10, precision);
      // Limited preventing decimal issue
      return (Math.round( value * shift + 0.00000000000001 ) / shift);
    } else {
      return Math.round(value);
    }
  } 

class StandardCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stake: '', backodds: '', layodds: '', commission: 0}
    
        this.handleStake = this.handleStake.bind(this);
        this.handleBackodds = this.handleBackodds.bind(this);
        this.handleLayodds = this.handleLayodds.bind(this);
        this.handleCommission = this.handleCommission.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

        calculate = () => {
            console.log(this.state);
            console.log("hello from calculate");
            var standardStake = (parseFloat(this.state.stake)*parseFloat(this.state.backodds))/parseFloat(this.state.layodds);
            var standardStakeWithComm = round(standardStake + ((((parseFloat(this.state.commission)/100)*standardStake))/parseFloat(this.state.layodds)), 2);
            var standardProfitLoss = round(parseFloat(standardStakeWithComm - this.state.stake - ((parseFloat(this.state.commission)/100)*standardStake)), 2);
            var standardLiability = round(standardStakeWithComm*(parseFloat(this.state.layodds)-1), 2);
            var underlayStake = (parseFloat(this.state.stake))
            console.log(standardStake);
            console.log(standardStakeWithComm);
            if (standardStakeWithComm) {
                return (
                    <div>
                        <h2>Standard Lay</h2>
                        <div>Stake: £{standardStakeWithComm} {standardProfitLoss > 0 ? "Profit" : "Loss"} £{standardProfitLoss}</div>
                        <div>Liability: £{standardLiability}</div>
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
    
      handleSubmit(event) {
        this.calculate();
        event.preventDefault();
      }
        render() {
            return (
                <div>
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
                    </form>
                    <div>{this.calculate()}</div>
                </div>

            );
        }
}

export default StandardCalculator;