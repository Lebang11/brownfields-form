"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(window.localStorage.getItem('user_name'));
  },[])

  return (
    <main className={styles.main}>
      <h4>Welcome {username}</h4>


      <div className="card p-4 bg-transparent border-light">
        
        
        <h2>Brownfields Form</h2>
        <form className="text-center">
          <label  htmlFor="previous" className="form-label">What I did yesterday</label>
          <input id="previous" className="form-control mb-3" type="text"/>
          <label  htmlFor="now" className="form-label">What I'm doing today</label>
          
          <input id="now" className="form-control mb-3" type="text" />

          <label htmlFor="issues" className="form-label">Issues</label>
          <input type="text" id="issues" className="form-control mb-3" />

          <label htmlFor="breakthrough" className="form-label">Breakthroughs</label>
          <input type="text" id="breakthrough" className="form-control mb-3" />
        </form>
      </div>
    </main>
  );
}
