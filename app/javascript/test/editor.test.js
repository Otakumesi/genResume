import mountApp from '../editor/lib/mount-app';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe("mount App to element", (() => {
  const el = document.createElement('div');
  mountApp(el);
  it("valid mount", (() => {
    expect(el.innerHTML !== "").toBeTruthy;
  }));
}));
