/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the Auth0 provider
jest.mock('./auth/Auth0ProviderWithNavigate', () => ({
  Auth0ProviderWithNavigate: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Cart provider
jest.mock('./contexts/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the LiveAPI provider
jest.mock('./contexts/LiveAPIContext', () => ({
  LiveAPIProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
