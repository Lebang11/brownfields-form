"use client";

import Image from "next/image";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const members = ['lebang', 'siphesihle', 'zinhle', 'tsepang']
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      window.localStorage.setItem('user_name', name)
    }, [name])

    const signIn = (name) => {
        if (members.includes(name.trim().toLowerCase())) {
            router.push('/', {scroll: false});
            return true;
        } else {
            setError("name invalid")
            return false;
        }
    }

  return (
    <div className={styles.main}>
      <div className="card p-4 bg-transparent border-light">
        <h2>Login</h2>
        <form className="text-center">
          <label  htmlFor="previous" className="form-label">Name</label>
          <input id="previous" className="form-control mb-3" type="text" onChange={(e) => {
            setName(e.target.value)
          }}/>
            <p className="text-danger">{error}</p>
            <button className="btn btn-light" onClick={(e) => {
                e.preventDefault();
                signIn(name)
            }}>Submit</button>
        </form>
      </div>
    </div>
  );
}
