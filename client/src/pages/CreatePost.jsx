import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })

        await response.json();
        navigate('/');

      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Try again ?')
    }
  }


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Try Again');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">

      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[16px] text-[#666e75] max-w-[500px]">
          Create a collection of visually stunning images through DALL-E AI
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your name"
            value={form.name}
            type="text"
            name="name"
            placeholder="Optimus Prime"
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            value={form.prompt}
            type="text"
            name="prompt"
            placeholder="Optimus Prime"
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focys:border-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                className="w-full h-full object-contain"
                src={form.photo}
                alt={form.prompt}
              />
            ) : (
              <img
                className="w-9/12 h-9/12 object-contain opacity-40"
                src={preview}
                alt="preview"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>

        </div>

        <div className="mt-5 flex gap-5">
          <button
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={generateImage}
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Share Your IMGen
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] rounded-md font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? 'Loading...' : 'Share'}
          </button>
        </div>

      </form>

    </section>
  )
}

export default CreatePost
