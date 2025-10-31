const About = () => {
    return (
        <div style={{maxWidth:"1200px"}}>
            <h2>About</h2>
            <p>
                This website was created by me, Daniel Koronthály. While studying for my master's in Computer Science
                at Western Washington University, I did research in the field of Human-Computer Interaction,
                where I occassionally came across research papers that used this valence-arousal model.
                <br />
                <br/>
                I was never completely convinced of the usefulness of this model, and so I decided to make
                this website for multiple reasons:
            </p>
            <ul>
                <li>
                    To see if people's categorizations of different emotions using this model agree or disagree
                </li>
                <li>
                    To get some experience with technologies I haven't used before
                </li>
                <li>
                    To construct a dataset (which you can download yourself at the top right!)
                </li>
            </ul>
            <p>
                Clustering algorithms might be a good fit. If people categorize emotions similarly, there will be one cluster per emotion.
                If there are multiple clusters for an emotion, that would be an interesting result.
                <br/>
                <br/>
                For this website, I used <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a>,&nbsp; 
                <a href="https://sqlmodel.tiangolo.com/" target="_blank" rel="noopener noreferrer">SQLModel</a>,&nbsp;
                <a href="https://sqlite.org/index.html" target="_blank" rel="noopener noreferrer">SQLite</a>, and&nbsp;
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>.
            </p>
        </div>
    );
};

export default About;
