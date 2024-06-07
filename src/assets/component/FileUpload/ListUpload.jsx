import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListUpload( ) {
  const [mediaData, setMediaData] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaData();
  }, []);

  const fetchMediaData = async () => {
    try {
      const response = await fetch('http://localhost:8081/media');
      const data = await response.json();
      setMediaData(data);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/media/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      fetchMediaData(); // Refresh media list on successful delete
    } catch (error) {
      console.error('Error deleting media:', error);

    }
  };
  


  return (
    <div className="container mt-5 ">
      <h2 className="mb-4">Media List</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Type</th>
            <th>URL</th>
            <th>Time Upload</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaData.map(media => (
            <tr key={media.id}>
              <td>{media.id}</td>
              <td>{media.name}</td>
              <td>{media.title}</td>
              <td>{media.type}</td>
              <td>{media.url}</td>
              <td>{media.uploaded_at}</td>
              <td>{media.description}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(media.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUpload;
