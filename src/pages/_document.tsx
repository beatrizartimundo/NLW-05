 import Document,{Html,Head,Main,NextScript, DocumentContext} from 'next/document'

 export default class MyDocument extends Document{
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx);
      }
     render(){
         return(
             <Html>
                 <Head>
                    <meta name='application-name' content="name" />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content="name"  />
                    <meta name='description' content="name"  />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name="theme-color" content="#FFFFFF"/>
                    <link rel="apple-touch-icon" sizes='180x180'href="/icon.png"></link>
                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                    <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
                 </Head>
                 <body>
                     <Main/>
                     <NextScript/>
                 </body>
             </Html>
         )
     }
 }