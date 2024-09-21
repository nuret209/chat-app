"use client"
import { useState, FormEvent } from 'react'

const Page = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const submitSignUp = async (e: FormEvent) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

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
        e.target.reset();
        const res = await fetch("api/submitRegister", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        const user = await res.json();
        console.log(user);

        if (user.status === 1) setMessage(user.name + " adıyla basariyla kayıt yaptınız");
        if (user.status === 2) setError("şifrenin uzunlugu 6dan kucuk olamaz");
        if (user.status === 3) setError("bu ismi kullanan bir hesap var");
        if (user.status === 4) setError("bu e postayı kullanan bir email var");
        if (user.status === 5) setError("kullanıcı adının uzulunluğu 15'i geçemez");
        if (user.status === 6) setError("e posta 49 karakter ve altı olmalıdır");
    }


    return (
        <div>
            <form onSubmit={submitSignUp}>
                <input type="text" name='username' />
                <br />
                <input type="email" name='email' />
                <br />
                <input type="password" name='email' />
                <br />
                <input type="submit" value="Kayıt Ol" />
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