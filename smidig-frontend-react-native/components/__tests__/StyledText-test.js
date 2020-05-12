import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InputField from '../InputField'

it('renders correctly', () => {
  const tree = renderer.create(<InputField>Snapshot test!</InputField>).toJSON();

  expect(tree).toMatchSnapshot();
});
