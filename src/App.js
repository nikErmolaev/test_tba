import React from 'react'

import Authentication from './components/Authentication'
import Main from './components/Main'

import { SettingsContainer } from './store/container/SettingsContainer'
import { AuthContainer } from './store/container/AuthContainer'
import { StocksContainer } from './store/container/StocksContainer'
import { CompanyContainer } from './store/container/CompanyContainer'

function App() {
  return (
    <AuthContainer>
      <Authentication>
        <SettingsContainer>
          <CompanyContainer>
            <StocksContainer>
            <Main />
            </StocksContainer>
          </CompanyContainer>
        </SettingsContainer>
      </Authentication>
    </AuthContainer>
  );
}

export default App;
