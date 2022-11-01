import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ModalContextProvider } from "../components/Modal/ModalContext"
import { AuthContextProvider } from "../context/AuthContext"
import { ThemeProvider } from "next-themes"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" >
      <ModalContextProvider>
        <Component {...pageProps}/>
      </ModalContextProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default MyApp
