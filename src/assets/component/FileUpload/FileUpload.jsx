import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ListUpload from "./ListUpload";
import axios from "axios";

const FileUpload = () => {
  const [mediaData, setMediaData] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("image");
  const [file, setFile] = useState(null);

  const fetchMediaData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/media');
      setMediaData(response.data);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  };

  useEffect(() => {
    fetchMediaData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);

    try {
      await axios.post('http://localhost:8081/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchMediaData(); 
      setName("");
      setTitle("");
      setDescription("");
      setType("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px", border: "1px solid black", padding: "30px", margin: "30px 0 0 0" }}>
        <Form.Group controlId="formFile">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formTitle">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Loại phương tiện</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">...</option>
            <option value="campaign">CamPaign</option>
            <option value="mvideo">Main Video</option>
            <option value="lookbook">LookBook</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">Tải lên</Button>
      </Form>

      <ListUpload />
    </div>
  );
};

export default FileUpload;
