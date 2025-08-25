export default function Trial({ setTrial }) {
    const changeTrial = () => setTrial("One");

    return (
        <div>
            <button onClick={changeTrial}>change the trial</button>
        </div>
    );
}
