import React from 'react'
import { connect } from 'react-redux';
import { decrement, increment } from '../redux/actions/countAction';

const CountComponents = ({number, increment, decrement}) => {
  return (
    <div>
        <button onClick={decrement}>-</button>
      <p>{number}</p>
        <button onClick={increment}>+</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    number: state.count.number
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountComponents);