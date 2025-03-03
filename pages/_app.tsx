import { wrapper } from "@/redux/store";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import { Provider } from "react-redux";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/**
 * The top-level component that wraps the entire app.
 *
 * This component is responsible for:
 *
 * - Setting up a Redux store with the `wrapper` from `next-redux-wrapper`.
 * - Providing the Redux store to the app via the `Provider` component from `react-redux`.
 * - Setting up the MUI theme with the `ThemeProvider` component from `@mui/material`.
 * - Setting up the MUI CSS baseline with the `CssBaseline` component from `@mui/material`.
 */
const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;