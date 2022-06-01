import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React from 'react'

function Footer() {
    return <footer className={styles.footer}>
        <a
            href='https://diginlab.com'
            target='_blank'
            rel='noopener noreferrer'
        >
            Powered by{' '}
            <span className={styles.logo}>
                <Image src='/diginlab.png' alt='Diginlab Logo' width={60} height={30}/>
            </span>
        </a>
    </footer>;
}

export default Footer