import { GymCard } from "./page/GymCard";
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Header } from "./components/Header";

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Header />
        <GymCard />
      </ThemeProvider>
    </>
  )
}


