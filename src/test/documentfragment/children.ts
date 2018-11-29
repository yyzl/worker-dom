/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava';
import { documentForTesting as document } from '../../worker-thread/dom/Document';
import { Text } from '../../worker-thread/dom/Text';
import { Node } from '../../worker-thread/dom/Node';
import { DocumentFragment } from '../../worker-thread/dom/DocumentFragment';

test.beforeEach(t => {
  const parentFragment = document.createDocumentFragment();
  const node = document.createElement('div');
  const sibling = document.createElement('div');
  const text = document.createTextNode('text');

  t.context = {
    parentFragment,
    node,
    sibling,
    text,
  };
});
test.afterEach(t => {
  (t.context.parentFragment.childNodes as Node[]).forEach(childNode => childNode.remove());
});

test('children should be an empty array when there are no childNodes', t => {
  const { parentFragment } = t.context as { parentFragment: DocumentFragment };

  t.is(parentFragment.children.length, 0);
  t.deepEqual(parentFragment.children, []);
});

test('children should contain all childNodes when all are the correct NodeType', t => {
  const { parentFragment, node } = t.context as { parentFragment: DocumentFragment; node: Node };

  parentFragment.appendChild(node);
  t.is(parentFragment.children.length, 1);
  t.deepEqual(parentFragment.children, [node]);
});

test('children should contain only childNodes of NodeType.ELEMENT_NODE', t => {
  const { parentFragment, node, text } = t.context as { parentFragment: DocumentFragment; node: Node; text: Text };

  parentFragment.appendChild(node);
  parentFragment.appendChild(text);
  t.is(parentFragment.children.length, 1);
  t.deepEqual(parentFragment.children, [node]);
});

test('children should be an empty array when there are no childNodes of NodeType.ELEMENT_NODE', t => {
  const { parentFragment, text } = t.context as { parentFragment: DocumentFragment; text: Text };

  parentFragment.appendChild(text);
  t.is(parentFragment.children.length, 0);
  t.deepEqual(parentFragment.children, []);
});
