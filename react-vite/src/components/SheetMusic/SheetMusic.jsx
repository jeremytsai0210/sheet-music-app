import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter, Barline } from "vexflow";

const SheetMusic = ({ noteData, numBeats = 4, beatValue = 4 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !noteData.length) return;

    containerRef.current.innerHTML = ""; // Clear previous content

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(1000, 250); // Bigger canvas for more spacing
    const context = renderer.getContext();

    let startX = 20; // Track stave position
    let measureNotes = [];
    let measureBeatCount = 0;
    const staves = [];

    for (let i = 0; i < noteData.length; i++) {
      const note = new StaveNote(noteData[i]);
      measureNotes.push(note);

      // Calculate beat count (assuming simple durations like q, h, w)
      measureBeatCount += 4 / parseInt(noteData[i].duration);

      // If we reach the measure limit (numBeats), finalize and start new measure
      if (measureBeatCount >= numBeats || i === noteData.length - 1) {
        // ✅ Dynamically adjust stave width based on number of notes
        const staveWidth = Math.max(200, measureNotes.length * 50);
        const stave = new Stave(startX, 40, staveWidth);

        if (staves.length === 0) {
          stave.addClef("treble").addTimeSignature(`${numBeats}/${beatValue}`);
        }
        stave.setContext(context);

        // Add a bar line at the end of the measure
        stave.setEndBarType(Barline.type.SINGLE);
        stave.draw();

        // ✅ Adjust voice formatting dynamically
        const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
        voice.setStrict(false); // Allow flexible timing
        voice.addTickables(measureNotes);

        // ✅ Format notes to fit the stave width
        new Formatter().joinVoices([voice]).format([voice], staveWidth - 50);
        voice.draw(context, stave);

        // Reset for next measure
        measureNotes = [];
        measureBeatCount = 0;
        startX += staveWidth + 20; // Shift x position for next stave
        staves.push(stave);
      }
    }
  }, [noteData, numBeats, beatValue]);

  return <div ref={containerRef}></div>;
};

export default SheetMusic;
