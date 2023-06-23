import { GymCard } from "./page/GymCard";
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Header } from "./components/Header";
import { GymCardProvider } from "./contexts/GymCardContext";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <GymCardProvider>
          <Header />
          <GymCard />
          <Footer />
        </GymCardProvider>
      </ThemeProvider>
    </>
  )
}


