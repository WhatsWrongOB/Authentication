import React from 'react'
import '../styles/footer.css'
import vite from '/public/vite.svg';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {

    const date = new Date().getFullYear()

    return (
        <footer className='footer'>
            <hr />
            <div className="footer_container">
                <div className="footer_left">
                    <div className="logo footer_logo">
                        <img src={vite} alt="logo" />
                        <span>Blog</span>
                    </div>
                </div>
                <div className="footer_right">
                    <div className="footer_link">
                        <h4>About</h4>
                        <p>Mern Developer</p>
                        <p>Obaid Blog</p>
                    </div>
                    <div className="footer_link">
                        <h4>Follow us</h4>
                        <Link to='/'><p>Github</p></Link>
                        <Link to='/'>Discord</Link>
                    </div>
                    <div className="footer_link">
                        <h4>Legal</h4>
                        <Link to='/'><p>Privacy Policy</p></Link>
                        <Link to='/'>Terms & Conditions</Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer_lower">
                <div className="lower_left">
                    © {date} Obaid's blog
                </div>
                <div className="lower_right">
                    <Link to='/'><FaFacebook size={25} /></Link>
                    <Link to='/'><FaInstagram size={25} /></Link>
                    <Link to='/'><FaGithub size={25} /></Link>
                    <Link to='/'><FaTwitter size={25} /></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer