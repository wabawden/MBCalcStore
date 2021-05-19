import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { fetchCalc } from '../actions';

class SideMenu extends React.Component {


    showItems() {
        // var elem = document.getElementById("hide-menu");
        // if (elem.style.display === "none") {
        //   elem.style.display = "block";
        // } else {
        //   elem.style.display = "none";
        // }
    }

    formatDate = (date) => {
        return `${date.getDate}/${date.getMonth}/${date.getYear}`
    }

    renderCalcs() {
        return this.props.calcs.map(calc => {
            return <Link to={`/standard/${calc.id}`} className="item">
                        <li onClick={() => this.props.fetchCalc(calc)} key={calc.name}className="list-group-item">{calc.name}
                        <br />
                        <h3>{calc.backodds}/{calc.layodds}</h3>
                        <span className="date-time">{calc.date} - {calc.time}</span></li>
                    </Link>
        });
    };

    render() {
        return (
            <div>
                <h4>Saved Instances:</h4>
                <div className="menu-standard-calc">
                    <strong className="clickable" onClick={this.showItems}>Standard Calculator ({this.props.calcs.length})</strong>
                    <ul className="calc-items list-group" id="hide-menu">
                        {this.renderCalcs()}
                        <Link to="/">New +</Link>
                    </ul>
                </div>
            </div>
        );
    };
};


const mapStateToProps = (state) => {
    return{
      calcs: state.calc,
      currentCalc: state.current
    };
  };


export default connect(mapStateToProps, { fetchCalc })(SideMenu);