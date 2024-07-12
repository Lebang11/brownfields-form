"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookies, getCookie, setCookie } from "cookies-next";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState('');
  const [previous, setPrevious] = useState('');
  const [current, setCurrent] = useState('');
  const [issues, setIssues] = useState('');
  const [breakthroughs, setBreakthroughs] = useState('');
  const [isLoading, setLoading] = useState(false);

  
  const router = useRouter()
  useEffect(() => {
    const name = window.localStorage.getItem("username");
    setUsername(name);
    if (!name){
        router.replace('/login', {scroll: false})
      }
    
  },[]);

  const submit = async () => {

    setLoading(true);
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

    await axios.post('https://brownfields-server.onrender.com/forms',
        {
        username,
        previous,
        current,
        issues,
        breakthroughs
      })
    .then((res) => {
      console.log(res)
      alert('Form created!')
      router.push('/main', {scroll: false})
      setLoading(false)
    })
    .catch((err) => {
      alert("Error: " + err)
      setLoading(false)

    })

    // console.log(username)
    // console.log(previous)
    // console.log(current)
    // console.log(issues)
    // console.log(breakthroughs)
  }

  // if (!username) {
  //   router.push('/login',  {scroll: false})
    
  // }
  
  return (
    <main className={styles.main}>
      <h4>Welcome {username}</h4>


      <div className="card p-4 bg-transparent border-light">
        
        
        <h2 className="display-4 text-muted">Brownfields Form</h2>
        <form className="text-center">
          <label  htmlFor="previous" className="form-label">What I did yesterday</label>
          <input onChange={(e) => {
            setPrevious(e.target.value);
          }} id="previous" className="form-control mb-3" type="text"/>
          <label  htmlFor="now" className="form-label">What I'm doing today</label>
          
          <input onChange={(e) => {
            setCurrent(e.target.value);
          }}  id="now" className="form-control mb-3" type="text" />

          <label htmlFor="issues" className="form-label">Issues</label>
          <input onChange={(e) => {
            setIssues(e.target.value);
          }}  type="text" id="issues" className="form-control mb-3" />

          <label htmlFor="breakthrough" className="form-label">Breakthroughs</label>
          <input onChange={(e) => {
            setBreakthroughs(e.target.value);
          }}  type="text" id="breakthrough" className="form-control mb-3" />
          {
            !isLoading &&
            <button className="btn btn-light" onClick={(e) => {
              e.preventDefault()
              submit()
            }}>Submit</button>
          }
          {
            isLoading && 
            <button className="btn btn-light disabled">Submit</button>
          }
        </form>

      </div>
      <a className="btn btn-outline-warning p-4 w-50" href="/main"> Show stand-ups</a>

    </main>
  );
}
