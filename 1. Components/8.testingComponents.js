// function components are easily tesable
// Jest for React already set up in create-react-app

// describe("When setting up testing", () => {
// 	it("should fail", () => {
// 		expect(1 + 1).toBe(3);
// 	});
// });

import ReactDOM from 'react-dom';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

function Hello(props) {
  return <h1>Hello at {props.now}</h1>;
}

const moment = new Date(1588946500000);

describe('When setting up testing', () => {
  let result;
  beforeAll(() => {
    result = Hello({ now: moment.toISOString() });
  });

  it('return a value', () => {
    expect(result).not.toBeNull();
  });

  it('is a h1', () => {
    expect(result.type).toBe('h1');
  });

  it('has children', () => {
    expect(result.props.children).toBeTruthy();
  });
});

describe('When testing with ReactDOM', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hello now={moment.toISOString()} />, div);
  });
});

// help library to test npm install --save enzyme & enzyme-adapter-react-16
// don't forget to import

describe('When testing with Enzyme', () => {
  it(
    ('renders a h1',
    () => {
      const wrapper = shallow(<Hello now={moment.toISOString()} />);
      expect(wrapper.find('h1').length).toBe(1);
    })
  );

  it('contains Hello at 2018-11-14T12:28:12.426Z', () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.contains(<h1>Hello at 2018-11-14T12:28:12.426Z</h1>)).toBe(
      true
    );
  });
});
