import React, { useState } from 'react';
function LoginForm() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const handleSubmit = (event) => {
 event.preventDefault();
 console.log('Login:', username, password);
 };
 return (
 <form onSubmit={handleSubmit}>
 <input
 type="text"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 <button type="submit">Login</button>
 </form>
 );
}
export default LoginForm;