import {
  Label,
  Radio,
  Select,
  TextInput,
  ToggleSwitch,
  Button,
} from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [pseudonym, setPseudonym] = useState(
    "Whisperer" + Math.floor(1000 + Math.random * 9000)
  );
  const [tag, setTag] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({});
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pseudonym, tag, content, isPrivate);
    setFormData({
      pseudonym: pseudonym,
      tag: tag,
      content: content,
      isPrivate: isPrivate,
    });
    console.log(formData);
  };
  return (
    <div>
      <form className="flex flex-col p-10" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-start gap-2 md:flex-row md:gap-10 mb-5 w-full max-w-screen-md">
          <div className="flex gap-3 items-center w-full">
            <Label htmlFor="pseudonym" value="Pseudonym" className="md:w-20" />
            <TextInput
              id="pseudonym"
              type="text"
              defaultValue={"Whisperer"}
              className="flex-1"
              required
              onChange={(e) => setPseudonym(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-center w-full">
            <Label htmlFor="tag" value="Tag" className="w-20 md:w-6" />
            <Select
              id="tag"
              className="flex-1"
              required
              onChange={(e) => setTag(e.target.value)}
            >
              <option value={"all"}>--Choose a tag--</option>
              <option value={"emotion"}>Emotion</option>
              <option value={"life"}>Life</option>
              <option value={"work"}>Work</option>
              <option value={"study"}>Study</option>
              <option value={"relationship"}>Relationship</option>
            </Select>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className="min-h-72 max-h-100 mb-3"
          placeholder="Write something down..."
          onChange={(e) => setContent(e)}
          required
        />
        <div className="flex gap-3 items-center mt-2">
          <Label htmlFor="private" value="Set as private?" />
          <ToggleSwitch
            id="private"
            checked={isPrivate}
            onChange={setIsPrivate}
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-10 justify-center mt-10">
          <Button gradientDuoTone="pinkToOrange" outline className="min-w-40">
            Save a draft
          </Button>
          <Button
            gradientDuoTone="pinkToOrange"
            className="min-w-40"
            type="submit"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
