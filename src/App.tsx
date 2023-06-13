import { GymCard } from "./page/GymCard";
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Header } from "./components/Header";
import { GymCardProvider } from "./contexts/GymCardContext";

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <GymCardProvider>
          <Header />
          <GymCard />
        </GymCardProvider>
      </ThemeProvider>
    </>
  )
}


