import { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO (Q6): Replace this console.log with actual signup logic
    // - Import and use the useSignup hook from ../hooks/useSignup
    // - Call signup({ name, username, password, phone_number, address }) from the hook
    // - Display error from the hook if present
    // - Display a loading state on the button using isLoading from the hook
    // - Navigate to "/" on successful signup
    console.log("Signup submit:", { name, username, password, phone_number, address });
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Phone Number:</label>
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
