/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

/**
 * Internal dependencies
 */
import theme from '../../../../theme';
import StoryContext from '../../../../app/story/context';
import ColorPresetActions from '../colorPresetActions';

function setupActions() {
  const updateStory = jest.fn();

  const textElement = {
    id: '1',
    type: 'text',
  };
  const storyContextValue = {
    state: {
      selectedElements: [textElement],
      story: { stylePresets: { colors: [], textColors: [] } },
    },
    actions: { updateStory },
  };
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <StoryContext.Provider value={storyContextValue}>
        <ColorPresetActions color={{ color: { r: 1, g: 1, b: 1 } }} />
      </StoryContext.Provider>
    </ThemeProvider>
  );
  return {
    getByText,
    updateStory,
  };
}

describe('Panels/StylePreset/ColorPresetActions', () => {
  const ADD_PRESET = '+ Add to Color Preset';

  it('should render color preset actions', () => {
    const { getByText } = setupActions();
    const element = getByText(ADD_PRESET);
    expect(element).toBeDefined();
  });

  it('should update color presets', () => {
    const { getByText, updateStory } = setupActions();
    const element = getByText(ADD_PRESET);
    fireEvent.click(element);
    expect(updateStory).toHaveBeenCalledWith({
      properties: {
        stylePresets: {
          colors: [],
          textColors: [{ color: { b: 1, g: 1, r: 1 } }],
        },
      },
    });
  });
  // @todo More tests to be added once the feature gets completed.
});
