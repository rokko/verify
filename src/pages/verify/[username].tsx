import { useEffect, useState } from "react"
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react"
import { inAppWallet } from "thirdweb/wallets";

import sfondo from './sfondo.png'
import logo from './logo.png'
import axios from "axios";
//import axios from "axios";

const client = createThirdwebClient({
    clientId: "5e2546b2207cd1ef9e02d30d3b50f7d7"
});

const wallets = [
    inAppWallet({
        auth: {
            options: ["discord"],
        },
    }),
];
const Verify = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [confirm,setConfirm] = useState<boolean | null>(null);
    let user: string|null = null
    useEffect(() => {
      // Ottieni l'URL corrente
      const currentUrl = window.location.href;
  
      // Verifica se l'URL contiene 'verify/' e ottieni il nome utente
      const regex = /verify\/([^/]+)/; // Regex per estrarre il nome utente
      const match = currentUrl.match(regex);
      console.log(username)
  
      if (match && match[1]) {
        setUsername(match[1]); // Imposta il nome utente
        user=match[1]
      }
    },[]);

    return (
        <div style={{
            margin: '0 auto',


            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundImage: `url(${sfondo.src})`,
            backgroundPosition: 'center', // Centra l'immagine
            backgroundSize: 'cover',      // L'immagine copre tutto il div
            backgroundRepeat: 'no-repeat', // Non ripetere l'immagine
        }}>
            {!confirm &&
                <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>

                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        connectModal={{ size: "compact" }}
                        connectButton={{
                            label: "VERIFY",
                            style:{ width: "275px", height: "80px" , borderRadius:'0px',backgroundColor:'#2DC653', color:'white', fontFamily:'Roboto',fontSize:'48px',fontWeight:'700'}
                          }}

                        onConnect={() => {

                            
                            axios.post('http://localhost:8080/verify', { user_id:user},{
                                headers: {
                                  'Content-Type': 'application/json',
                                }
                              }
                            ).then((response) => {
                                setConfirm(true)

                                console.log(response)
                            })
                           
                        }}

                        
                    />
                    <p className="testo">By clicking Verify, <br />
                        you accept the <a href="/privacy.pdf" target="_blank" style={{  textDecoration:'none',color:'white',fontWeight:'700' }}>Privacy Policy</a>.</p>
                </div>
            }
              {confirm &&
                <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>

                
                    <a href="https://discord.gg/besteam" className="button-verify" style={{textDecoration:'none'}}><p className="testo-button">NEXT</p></a>
                    <p className="testo1" style={{fontWeight:'700!important'}}>Verify completed,<br/>
                    Join Community Cup!.</p>
                </div>
            }

            <img src={logo.src} style={{ width: '144px' , height:'29px',marginTop:'162px',position:'absolute',top:'640px'}} />

        </div>
    )
}

export default Verify