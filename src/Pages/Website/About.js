import { Header } from "../../Components/Header";

export default function About() {
    return (
        <div>
            <Header/>
            <div className="parent">
            <div className="about">
                <h1>Welcome to the about Page</h1>
                <p>This is a simple React application with user registration and login functionality.</p>
            </div>
        </div>
        </div>
    );
}