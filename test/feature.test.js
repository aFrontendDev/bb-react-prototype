import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import Feature from '../app/components/feature';

const testData = {
  "title": "Test Feature",
  "copy": "some text for this feature",
  "id": "id456"
};


it('should render a feature', () => {
  const tree = renderer.create(
    <Feature data={testData} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});