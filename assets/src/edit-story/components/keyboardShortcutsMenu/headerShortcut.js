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
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { Headline, THEME_CONSTANTS } from '../../../design-system';
import useKeyboardShortcuts from './getKeyboardShortcuts';
import ShortcutLabel from './shortcutLabel';

const List = styled.dl`
  margin: 24px;
  display: flex;
  flex-shrink: 0;
`;

const Item = styled.dt`
  margin: 0 12px 0 0;
`;

function HeaderShortcut(props) {
  const {
    header: { label, shortcut },
  } = useKeyboardShortcuts();

  return (
    <List role="group">
      <Item role="listitem">
        <Headline
          as="h1"
          size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.X_SMALL}
          {...props}
        >
          {label}
        </Headline>
      </Item>
      <ShortcutLabel role="listitem" keys={shortcut} />
    </List>
  );
}

export default HeaderShortcut;
