import React, { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter } from "vexflow";

const SheetMusic = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const div = containerRef.current;
    div.innerHTML = ""; // Clear previous rendering

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();

    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    const notes = [
      new StaveNote({ keys: ["c/4"], duration: "q" }),
      new StaveNote({ keys: ["d/4"], duration: "q" }),
      new StaveNote({ keys: ["e/4"], duration: "q" }),
      new StaveNote({ keys: ["f/4"], duration: "q" }),
    ];

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    const formatter = new Formatter().joinVoices([voice]).format([voice], 350);
    voice.draw(context, stave);
  }, []);

  return <div ref={containerRef}></div>;
};

export default SheetMusic;
