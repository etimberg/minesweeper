import React from 'react';
import { mount } from 'enzyme'

import GameBoard from './GameBoard';

describe('Gameboard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<GameBoard height={3} width={3} mineCount={1} />);
  });

  it('should draw a grid of tiles at the correct size', () => {
    expect(wrapper.find('.game-board').length).toEqual(1);
    expect(wrapper.find('.tile').length).toEqual(9);
  });

  it('should reveal a tile when clicked', () => {
    let tile = wrapper.find('.tile').at(0);

    // TODO: figure out why this doesn't trigger the click handler on the tile
    wrapper.simulate('click');

    tile = wrapper.find('.tile').at(0);
    expect(tile.props().className.indexOf('tile-revealed')).not.toEqual(-1);
  });

  it('should have a reset button', () => {
    expect(wrapper.find('.restart-button').length).toEqual(1);
  });
});