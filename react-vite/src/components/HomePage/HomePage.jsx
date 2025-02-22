import SheetMusic from "../SheetMusic/SheetMusic";

const HomePage = () => {

  const songNotes = [
    { keys: ["c/4"], duration: "q" },
    { keys: ["d/4"], duration: "q" },
    { keys: ["e/4"], duration: "q" },
    { keys: ["f/4"], duration: "q" },
    { keys: ["g/4"], duration: "q" },
    { keys: ["a/4"], duration: "q" },
    { keys: ["b/4"], duration: "q" },
    { keys: ["c/5"], duration: "q" }
  ];

  return (
    <div>
      <h1>Home Page</h1>
        <SheetMusic noteData={songNotes} numBeats={4} beatValue={4}/>
    </div>
  );
};

export default HomePage;