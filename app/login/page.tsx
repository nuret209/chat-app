"use client"

import { FormEvent, useState } from "react";

const Page = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        const name: string = e.target[0].value;
        const password: string = e.target[1].value;

        if (!name) {
            setError("Username is required");
            console.log(name);

            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }
        setError("");
        setMessage("");
        e.target.reset();
        const res = await fetch("api/submitLogin", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
        })
        const d = await res.json();
        await console.log(d);
        if (d.status === 1) setMessage(d.name + " adıyla basariyla giriş yaptınız");
        if (d.status === 2) setError("boyle bir kullanıcı yok");
        if (d.status === 3) setError("Şifre yanlış");

    }

    return (
        <div>
            <form onSubmit={submitLogin} action="" >
                <input type="text" name="username" /><br />
                <input type="text" name="password" /><br />
                <input type="submit" value="Gonder" />
            </form>
            {error && <div style={{
                background: "red", padding: "15px", marginTop: "15px", color: "white"
            }}>{error}</div>}
            {message && <div style={{
                background: "green", padding: "15px", marginTop: "15px", color: "white"
            }}>{message}</div>}
        </div>

    )
}

export default Page