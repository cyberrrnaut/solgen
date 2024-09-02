import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState({
    category: '',
    description: '',
  });
  const [response, setResponse] = useState(null);
  const [metaRes , setMetaRes] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setTags((prevTags) => ({
      ...prevTags,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    const apiKey = 'knaIgWuzLi2IgYz8sN8sV9tUE4vSUXzC2p0VXaQz'; // Replace with your actual API key

    const queryParams = [
      `tag-file-category=${encodeURIComponent(tags.category)}`,
      `tag-file-description=${encodeURIComponent(tags.description)}`,
    ].join('&');

    try {
      // Upload the file to Akord
      const fileResponse = await fetch(`https://api.akord.com/files?${queryParams}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Api-Key': apiKey,
        },
        body: file,
      });

      if (!fileResponse.ok) {
        throw new Error(`Error: ${fileResponse.status} ${fileResponse.statusText}`);
      }

      const fileData = await fileResponse.json();
      setResponse(fileData);
      setError(null);

      // Create metadata JSON
      const metadata = {
        name: "Example Token",
        symbol: "EXMPL",
        description: "Example token from Solana Making a Token guide.",
        image: fileData.cloud.url, // Use the URL of the uploaded image
      };

      const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
        type: 'application/json',
      });

      const metadataFile = new File([metadataBlob], 'metadata.json');

      // Upload the metadata.json to Akord
      const metadataResponse = await fetch(`https://api.akord.com/files`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Api-Key': apiKey,
        },
        body: metadataFile,
      });

      if (!metadataResponse.ok) {
        throw new Error(`Error: ${metadataResponse.status} ${metadataResponse.statusText}`);
      }

      const metadataData = await metadataResponse.json();
      setMetaRes(metadataData);
      console.log('Metadata uploaded successfully:', metadataData);

    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Upload File to Akord</h1>
      <form
        onSubmit={(e) => {
          e.prevent
          e.preventDefault();
          handleUpload();
        }}
      >
        <div>
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category Tag:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={tags.category}
            onChange={handleTagChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description Tag:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={tags.description}
            onChange={handleTagChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>

      {response && (
        <div>
          <h2>Upload Successful!</h2>
          <p>File URL: <a href={response.cloud.url} target="_blank" rel="noopener noreferrer">{response.cloud.url}</a></p>
          <p>Status: {response.tx.status}</p>
        </div>
      )} 
       {metaRes && (
        <div>
          <h2>Upload Successful!</h2>
          <p>File URL: <a href={metaRes.cloud.url} target="_blank" rel="noopener noreferrer">{metaRes.cloud.url}</a></p>
          <p>Status: {response.tx.status}</p>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
