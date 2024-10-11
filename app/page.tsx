'use client'
import PDFProcessor from './component/pdf-processor'
import 'tailwindcss/tailwind.css';
import './app.scss';
import './page.scss';
import Head from 'next/head';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#f7f5ee" }}>
      <Head>
        <title>Rotate PDF Pages - Simple PDF Rotation Tool</title>
        <meta name="description" content="Easily rotate PDF pages online. Upload your PDF, click to rotate, and download the modified PDF in seconds." />
        <meta name="keywords" content="PDF, Rotate PDF, PDF Tool, PDF Rotation, Online PDF Rotator" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Rotate PDF Pages",
            "description": "Easily rotate PDF pages online.",
            "url": "https://yourdomain.com"
          }
          `}
        </script>
        <meta property="og:title" content="Rotate PDF Pages - Simple PDF Rotation Tool" />
        <meta property="og:description" content="Easily rotate PDF pages online. Upload your PDF, click to rotate, and download the modified PDF." />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
      </Head>
      <header className="bg-white bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rotate PDF Pages</h1>
        <div className="links">
          <span>Pricing</span>
          <span>Chrome extension</span>
          <span>Use cases</span>
          <span>Get started→</span>
        </div>
      </header>

      <div className='container mx-auto py-20 space-y-5'>
        <div className='flex flex-col text-center !mb-10 space-y-5'>
          <h1 className='text-5xl font-serif'>
            Rotate PDF Pages
          </h1>
          <p className='container-p mt-2 text-gray-600 max-w-lg mx-auto'>
            Simply click on a page to rotate it. You can then download your modified PDF.
          </p>
        </div>
        <section >
        <PDFProcessor  />
      </section>
      </div>
      
      <footer className="bg-white" aria-labelledby="footer-heading">
      <div className='mx-auto max-w-7xl px-6 pb-8 mt-8 sm:mt-12 lg:px-8 lg:mt-16 border-t border-gray-900/10 pt-16'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8'>
            <img className="h-7" src="/favicon.ico" alt="PDF.ai logo" />
            <div className="text-sm leading-6 text-gray-600">Chat with any PDF: ask questions, get summaries, find information, and more.</div>
          </div>
          <div className='mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0'>
            <div className="md:grid md:grid-cols-3 md:gap-8"><div><h3 className="text-sm font-semibold leading-6 text-gray-900">Products</h3><ul role="list" className="mt-6 space-y-4 list-none p-0"><li className="p-0 m-0"><a href="/use-cases" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Use cases</a></li><li className="p-0 m-0"><a href="/chrome-extension" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Chrome extension</a></li><li className="p-0 m-0"><a href="https://api.pdf.ai/" className="text-sm leading-6 text-gray-600 hover:text-gray-900">API docs</a></li><li className="p-0 m-0"><a href="https://pdf.ai/pricing" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Pricing</a></li><li className="p-0 m-0"><a href="https://pdf.ai/tutorials" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Video tutorials</a></li><li className="p-0 m-0"><a href="https://pdf.ai/resources" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Resources</a></li><li className="p-0 m-0"><a href="https://pdf.ai/blog" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Blog</a></li><li className="p-0 m-0"><a href="/faq" className="text-sm leading-6 text-gray-600 hover:text-gray-900">FAQ</a></li></ul></div><div className="mt-10 md:mt-0"><h3 className="text-sm font-semibold leading-6 text-gray-900">We also built</h3><ul role="list" className="mt-6 space-y-4 list-none p-0"><li className="p-0 m-0"><a href="https://pdf.ai/tools/resume-ai-scanner" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Resume AI Scanner</a></li><li className="p-0 m-0"><a href="https://pdf.ai/tools/invoice-ai-scanner" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Invoice AI Scanner</a></li><li className="p-0 m-0"><a href="https://pdf.ai/tools/quiz-ai-generator" className="text-sm leading-6 text-gray-600 hover:text-gray-900">AI Quiz Generator</a></li><li className="p-0 m-0"><a href="https://quickyai.com" className="text-sm leading-6 text-gray-600 hover:text-gray-900">QuickyAI</a></li><li className="p-0 m-0"><a href="https://docsium.com" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Docsium</a></li><li className="p-0 m-0"><a href="https://pdf.ai/gpts" className="text-sm leading-6 text-gray-600 hover:text-gray-900">PDF GPTs</a></li><li className="p-0 m-0"><a href="https://pdfgen.com" className="text-sm leading-6 text-gray-600 hover:text-gray-900">PDF AI generator</a></li><li className="p-0 m-0"><a href="https://pdf.ai/tools" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Other PDF tools</a></li></ul></div><div className="mt-10 md:mt-0"><h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3><ul role="list" className="mt-6 space-y-4 list-none p-0"><li className="p-0 m-0"><a href="/compare/chatpdf-alternative" className="text-sm leading-6 text-gray-600 hover:text-gray-900">PDF.ai vs ChatPDF</a></li><li className="p-0 m-0"><a href="/compare/adobe-acrobat-reader-alternative" className="text-sm leading-6 text-gray-600 hover:text-gray-900">PDF.ai vs Acrobat Reader</a></li><li className="p-0 m-0"><a href="/privacy-policy" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Legal</a></li><li className="p-0 m-0"><a href="/affiliate-program" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Affiliate program 💵</a></li><li className="p-0 m-0"><a href="/investor" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Investor</a></li></ul></div></div>
          </div>
        </div>
      </div>
      </footer>
    </div>
  )
}

export default Home