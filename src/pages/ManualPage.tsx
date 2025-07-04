export default function Manual(){
    return(
        <div className="manual-page">
            <section>
                <h1>About this app</h1>
                <p>It's a simple fullstack todo app.To build it i used React and node.js, both with typescript.For database i used MongoDB Atlas</p>
                <p>I build it to practice MERN stack and add some project to my portfolio</p>
                <p>Feel free to suggest some improvements or ask questions: shokotd332107b@gmail.com</p>
            </section>
            <section>
                <h1>How to login or signup</h1>
                <p>Username must be unique</p>
                <p>Password must be atleast 6 characters long</p>
                <p>If something went wrong login/signup page will let you know</p>
            </section>
            <section>
                <h1>Why signup or login?</h1>
                <p>It's optional, the app will store your data in browser localStorage</p>
                <p>But if you want to save it to cloud you need to login, same for getting data from cloud</p>
            </section>
            <section>
                <h1>Get data and save data pages</h1>
                <p>I think you will understand how to use it</p>
                <p>Only one thing that might not be clear is that you interact with todo list by clicking on them</p>
            </section>
            <section>
                <h1>Main page</h1>
                <p>It has 2 main sections - "My lists" and todos display</p>
                <p>In "My lists" section you can create and delete localy lists of todos</p>
                <p>To select one you need to click on it</p>
                <p>In todos display you can see your todos</p>
                <p>Create new ones</p>
                <p>Delete them pressing X button</p>
                <p>Mark completed toggling checkbox</p>
                <p>And edit todo text by clicking on it</p>
            </section>
            <a href="/">Go to main page</a>
        </div>
    );
}