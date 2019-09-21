import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { SettingsSection } from '../../store';
import { Appearance } from '../Appearance';
import { AddressBar } from '../AddressBar';
import { Privacy } from '../Privacy';
import store from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { Sections, Container } from './style';
import { Style } from '../../style';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Autofill } from '../Autofill';
import { icons } from '~/renderer/constants';
import { OnStartup } from '../Startup';

const GlobalStyle = createGlobalStyle`${Style}`;
const MenuItem = observer(
  ({
    section,
    children,
    icon,
  }: {
    section: SettingsSection;
    children: any;
    icon?: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedSection = section)}
      selected={store.selectedSection === section}
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

export default observer(() => {
  const { selectedSection } = store;

  return (
    <ThemeProvider theme={store.theme}>
      <Container>
        <GlobalStyle />
        <NavigationDrawer title="Settings" search>
          <MenuItem icon={icons.palette} section="appearance">
            Appearance
          </MenuItem>
          <MenuItem icon={icons.autofill} section="autofill">
            Autofill
          </MenuItem>
          <MenuItem icon={icons.power} section="startup">
            On startup
          </MenuItem>
          <MenuItem icon={icons.search} section="address-bar">
            Address bar
          </MenuItem>
          {/* <MenuItem section="privacy">Privacy</MenuItem> */}
          {/* <MenuItem section="permissions">Site permissions</MenuItem> */}
          {/* <MenuItem section="downloads">Downloads</MenuItem> */}
          {/* <MenuItem section="language">Languages</MenuItem> */}
          {/* <MenuItem section="shortcuts">Keyboard shortcuts</MenuItem> */}
          {/* <MenuItem section="system">System</MenuItem> */}
        </NavigationDrawer>
        <Sections style={{ paddingTop: 48 }}>
          {selectedSection === 'appearance' && <Appearance />}
          {selectedSection === 'autofill' && <Autofill />}
          {selectedSection === 'address-bar' && <AddressBar />}
          {selectedSection === 'startup' && <OnStartup />}
          {selectedSection === 'privacy' && <Privacy />}
        </Sections>
      </Container>
    </ThemeProvider>
  );
});