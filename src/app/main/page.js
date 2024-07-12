"use client";
import Image from "next/image";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { getCookies, getCookie, setCookie } from "cookies-next";
// import { cookies } from "next/headers";

export default function Login() {
    const router = useRouter();
    const members = ['lebang', 'siphesihle', 'zinhle', 'tsepang']
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [dbData, setData] = useState([]);
    // const [date, setDate] = useState();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios.get('https://brownfields-server.onrender.com/forms')
        .then((res) => {
            console.log(res)
            setData(res.data)
        })
        .catch((err) => {
            console.warn(err)
        })
    }

    const names = {
        "lebang": "Lebang Nong",
        "siphesihle": "Siphesihle Sibiya",
        "zinhle": "Zinhle Keswa",
        "tsepang": "Tsepang Mabizela"
    }

    const months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date;
    return (
    <div className={styles.main}>
        <h2 className="display-2">Stand-ups</h2>

        <a href="/" className="btn btn-outline-info">Create</a>
      
      {
        dbData.map((data) => {
            let newDate = false;
            let dataDate = new Date(data.dateAdded)
            if (date != null && date.getDate() == dataDate.getDate() && date.getMonth() == dataDate.getMonth()) {
                newDate = false;
            } else {
                newDate = true;
                date = new Date(data.dateAdded)
            }
            
            return (
                <div>
                    {
                        newDate &&
                        <h4 className="display-4  text-muted text-center my-4">{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</h4>

                    }
                    

                    <div className="col-12 card my-1 text-center bg-dark p-3" style={{
                    width:"70vw"
                }}>
                    <div className="card-title fs-3 fw-lighter">{names[data.username]}</div>

                    <p className="text-decoration-underline text-info mt-3">Yesterday's work</p>
                    <div className="card-text">{data.previous}</div>
        
                    <p className="text-decoration-underline text-info mt-3">Current work</p>
                    <div className="card-text">{data.current}</div>
        
                    <p className="text-decoration-underline text-info mt-3">Issues</p>
                    <div className="card-text">{data.issues}</div>
        
                    <p className="text-decoration-underline text-info mt-3">Breakthroughs</p>
                    <div className="card-text">{data.breakthroughs}</div>
                </div>
                </div>
                
            )
        })
      }
    </div>
  );
}
