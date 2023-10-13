import { Mail } from "@mui/icons-material"
import { Link } from "react-router-dom"

export function Home() {
    return (
        <section className="home">
           <h1>Welcome to misterEmail!</h1>
                <span className="mail-icon-wrapper">
                    <span className="mail-icon-count">1</span>
                    <Mail style={{fontSize: "3rem"}} />
                </span>
           <h2>Where you can communicate with those who are looking for you!</h2>
           <button><Link to={`/mails/compose?to=help@gmail.com&subject=Help`}>Quick Help</Link></button>
        </section>
    )
}
