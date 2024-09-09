import React, { useState, useEffect } from 'react';

export default function Authentication({ show, setShow }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // Retrieve the stored password from local storage on component mount
        const storedPassword = localStorage.getItem('adminPassword');
        if (storedPassword) {
            setPassword(storedPassword);
            if(storedPassword==="L3#v9T!q@7zP$kW8"){
                setShow(false);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === "L3#v9T!q@7zP$kW8") {
            // Save the password to local storage
            localStorage.setItem('adminPassword', password);
            setShow(false);
            console.log(password);
        } else {
            setError(true);
        }
    };

    return (
        <>
            {show && (
                <div className='Auth'>
                    <h1>Enter Your Credentials</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password" // Use "password" type for security
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Admin Password"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {error && (
                        <div>
                            <h1 style={{ color: "red" }}>Invalid Password</h1>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
