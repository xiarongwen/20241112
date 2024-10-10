'use client'
import PDFProcessor from './component/pdf-processor'
import 'tailwindcss/tailwind.css';
import './app.scss'
import './page.scss'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#f7f5ee" }}>
      <header className="bg-white bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rotate PDF Pages</h1>
        <div className="links">
          <span>Pricing</span>
          <span>Chrome extension</span>
          <span>Use cases</span>
          <span>Get started→</span>
        </div>
      </header>
      <div className='container'>
        <h1 className='text-5xl font-serif'>
          Rotate PDF Pages
        </h1>
        <p className='container-p mt-2 text-gray-600 max-w-lg mx-auto'>
          Simply click on a page to rotate it. You can then download your modified PDF.
        </p>
      </div>
      <section>
        <PDFProcessor />
      </section>
      <footer>

      </footer>
    </div>
  )
}

export default Home