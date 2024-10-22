import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";

const content =
  " <p>\n" +
  "      Markdown shortcuts make it easy to format the text while typing.\n" +
  "    </p>\n" +
  "    <p>\n" +
  "      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.\n" +
  "    </p>\n" +
  "    <p>\n" +
  "      Those conventions are called input rules in Tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\\`foobar\\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.\n" +
  "    </p>\n" +
  "    <p>\n" +
  "      You can overwrite existing input rules or add your own to nodes, marks and extensions.\n" +
  "    </p>\n" +
  "    <p>\n" +
  "      For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.\n" +
  "    </p>";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
