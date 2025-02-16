import { useEffect, useRef } from "react";
import Vex from "vexflow";

const SheetMusic = () => {
  const sheetRef = useRef(null);
  const rendererRef = useRef(null); // Store renderer instance

  useEffect(() => {
    if (!sheetRef.current) return;

    // Clear previous renderer if it exists
    if (rendererRef.current) {
      sheetRef.current.innerHTML = "";
    }

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(sheetRef.current, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();

    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    const notes = [
      new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    //   new VF.StaveNote({ keys: ["g/4"], duration: "h" }),
    //   new VF.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }), // Chord
    ];

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);

    // Store renderer reference
    rendererRef.current = renderer;

  }, []);

  return <div ref={sheetRef}></div>;
};

export default SheetMusic;
