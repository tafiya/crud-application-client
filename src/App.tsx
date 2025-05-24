import { Outlet } from "react-router"
import Footer from "./components/shard/Footer"
import Header from "./components/shard/Header"
import { Toaster } from "sonner"

function App() {

  return (
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
     <Outlet></Outlet>
      </main>
            <Toaster />
      <Footer />
    </div>
  )
}

export default App
