import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter } from "vexflow";

const SheetMusic = ({ noteData, numBeats = 4, beatValue = 4 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !noteData.length) return;

    containerRef.current.innerHTML = ""; // Clear previous content

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(800, 200); // Adjust width dynamically if needed
    const context = renderer.getContext();

    let x = 10; // Starting position for the first measure
    const measureWidth = 350; // Adjust width per measure

    // 🔹 Split Notes into Measures
    let measures = [];
    let currentMeasure = [];

    let beatCount = 0;
    noteData.forEach(note => {
      currentMeasure.push(new StaveNote(note));
      beatCount += note.duration === "h" ? 2 : 1; // Adjust for half/whole notes

      if (beatCount >= numBeats) {
        measures.push(currentMeasure);
        currentMeasure = [];
        beatCount = 0;
      }
    });

    if (currentMeasure.length) {
      measures.push(currentMeasure);
    }

    // 🔹 Render Each Measure
    measures.forEach((measureNotes, index) => {
      const stave = new Stave(x, 40, measureWidth);
      if (index === 0) stave.addClef("treble"); // Add clef only on the first measure
      stave.setContext(context).draw();

      const voice = new Voice({ num_beats: numBeats, beat_value: beatValue }).addTickables(measureNotes);

      new Formatter().joinVoices([voice]).format([voice], measureWidth - 50);
      voice.draw(context, stave);

      x += measureWidth + 20; // Move X position for the next measure
    });

  }, [noteData, numBeats, beatValue]);

  return <div ref={containerRef}></div>;
};

export default SheetMusic;
