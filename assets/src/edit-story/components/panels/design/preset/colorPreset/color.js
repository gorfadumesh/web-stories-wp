/*
 * Copyright 2021 Google LLC
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
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import { Remove } from '../../../../../icons';
import WithTooltip from '../../../../tooltip';
import {
  areAllType,
  getOpaqueColor,
  presetHasGradient,
  presetHasOpacity,
} from '../utils';
import { useStory } from '../../../../../app/story';
import generatePatternStyles from '../../../../../utils/generatePatternStyles';

const PRESET_SIZE = 30;
const REMOVE_ICON_SIZE = 16;

const Transparent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: conic-gradient(
    ${({ theme }) => rgba(theme.DEPRECATED_THEME.colors.bg.white, 0.24)}
      0.25turn,
    transparent 0turn 0.5turn,
    ${({ theme }) => rgba(theme.DEPRECATED_THEME.colors.bg.white, 0.24)} 0turn
      0.75turn,
    transparent 0turn 1turn
  );
  background-size: 35% 35%;
  border-radius: 100%;
`;

const ColorButton = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;
  padding: 0;
  border-width: 0;
  display: block;
  width: ${PRESET_SIZE}px;
  height: ${PRESET_SIZE}px;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  ${({ disabled }) => (disabled ? 'opacity: 0.4;' : '')}
`;

const presetCSS = css`
  display: block;
  width: 100%;
  height: 100%;
  font-size: 13px;
  position: relative;
  svg {
    width: ${REMOVE_ICON_SIZE}px;
    height: ${REMOVE_ICON_SIZE}px;
    position: absolute;
    top: calc(50% - ${REMOVE_ICON_SIZE / 2}px);
    left: calc(50% - ${REMOVE_ICON_SIZE / 2}px);
    transform: rotate(45deg);
  }
`;
const ColorItem = styled.div`
  ${presetCSS}
  ${({ color }) => generatePatternStyles(color)}
  transform: rotate(-45deg);

  svg {
    color: ${({ theme }) => theme.DEPRECATED_THEME.colors.fg.primary};
  }
`;

const OpaqueColorWrapper = styled.div`
  height: ${PRESET_SIZE}px;
  width: 50%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
`;

const OpaqueColor = styled.div`
  height: ${PRESET_SIZE}px;
  width: ${PRESET_SIZE}px;
  position: absolute;
  top: 0;
  left: 0;
  ${({ color }) => generatePatternStyles(color)}
`;

function Color({ color, i, activeIndex, handleOnClick, isEditMode, isLocal }) {
  const { currentPage, selectedElements } = useStory(
    ({ state: { currentPage, selectedElements } }) => {
      return {
        currentPage,
        selectedElements,
      };
    }
  );
  if (!color) {
    return null;
  }
  const isText = areAllType('text', selectedElements);
  const isBackground = selectedElements[0].id === currentPage.elements[0].id;
  const deleteLabel = isLocal
    ? __('Delete local color', 'web-stories')
    : __('Delete global color', 'web-stories');
  const applyLabel = isLocal
    ? __('Apply local color', 'web-stories')
    : __('Apply global color', 'web-stories');
  const hasTransparency = presetHasOpacity(color);
  const hasGradient = presetHasGradient(color);
  const opaqueColor = hasTransparency ? getOpaqueColor(color) : color;
  // In edit mode we always enable the button for being able to delete.
  const disabled =
    !isEditMode &&
    ((isBackground && hasTransparency) || (isText && hasGradient));
  let tooltip = null;
  if (disabled) {
    tooltip = isBackground
      ? __('Page background colors cannot have an opacity.', 'web-stories')
      : __('Gradient not allowed for Text', 'web-stories');
  }
  return (
    <WithTooltip title={tooltip}>
      <ColorButton
        aria-label={isEditMode ? deleteLabel : applyLabel}
        disabled={disabled}
        tabIndex={activeIndex === i ? 0 : -1}
        onClick={() => handleOnClick(color)}
      >
        {hasTransparency && <Transparent />}
        <ColorItem color={color} disabled={disabled}>
          {hasTransparency && !hasGradient && (
            <OpaqueColorWrapper>
              <OpaqueColor color={opaqueColor} />
            </OpaqueColorWrapper>
          )}
          {isEditMode && <Remove />}
        </ColorItem>
      </ColorButton>
    </WithTooltip>
  );
}

Color.propTypes = {
  color: PropTypes.object,
  i: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isLocal: PropTypes.bool,
};

export default Color;
