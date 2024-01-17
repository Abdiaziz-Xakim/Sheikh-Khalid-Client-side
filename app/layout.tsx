'use client'

// components/Layout.tsx
// import type { AppProps } from 'next/app'

import React, { ReactNode } from 'react';
import Footer from './components/footer/Footer';
import Navbar from './components/navigation/navbar/Navbar';

// ** Store Imports
import { store } from './store'
import { Provider } from 'react-redux'
// import Sidebar from './pages/SidebarMenu/Sidebar';
import Header from './components/Header';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";

import { SessionProvider } from "next-auth/react";
import SideMenu from './components/SideMenu';

import scss from './Layout.module.scss'
import { CssBaseline } from '@mui/material';

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const Layout: React.FC<any> = ({ children, session }) => {

  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );


  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [mode]
  );
  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode]
  );

  return (
    <html>
      {/* <CacheProvider value={emotionCache}> */}
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
      >
        <SessionProvider session={session}>
          <body>
                <Provider store={store}>
                  <CssBaseline/>
              <Header ColorModeContext={ColorModeContext}/>
              <main className={scss.layout}>
                <SideMenu/>
                {children}
                      {session && <SideMenu />}
                    {/* <Footer/> */}
              </main>
                </Provider>
          </body>
        </SessionProvider>
        </ThemeProvider>
    </ColorModeContext.Provider>
      </html>
  );
};

export default Layout;
