import React,{useState} from 'react';
import Unsplash, { toJson } from "unsplash-js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.css';

const unsplash = new Unsplash({
    accessKey: "wzVg79xjVMZzm1vHkrWLATv4tyeeiJQs4HI3moMzMho",
  });

export default function Photofeed() {
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    
    const searchPhotos = async(e) => {
        e.preventDefault();
        searchPics(30);       
    };
    const searchPics = (count = 5) => {
        unsplash.search
            .photos(query,1,count)
            .then(toJson)
            .then((json) => {
                setPics(json.results);
         });
         
    };
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                {
                    <center>
                        <div className="modal-container">
                            <center><strong><p style = {{fontSize: "24px"}} >Recommended Pictures for the Search {query} </p></strong></center>                        
                        {(pics.map((pic) =>(
                            <div className="modal-container-card" key={pic.id}>
                                <img
                                    className="modal-container-card-image"
                                    alt={pic.alt_description}
                                    src={pic.urls.full}
                                    width= "30%"
                                    height= "30%"
                                />
                            </div>)))}
                        </div>
                    </center>
                }
            </Modal.Body>
            <Modal.Footer><center><Button className="button" onClick={handleClose}>Close</Button></center></Modal.Footer>
            </Modal>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Search For a Photo`}
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            <div>
                <center><p style = {{fontSize: "24px"}} > 
                {pics.length === 0 ? "Please wait for the images to load": "About "+ pics.length + " images of the search " + query + " are loaded"}
                </p></center>    
            </div>
            <div className="card-list">
                {(pics.map((pic) =>(
                    <div className="card" key={pic.id}>
                        <button onClick={handleShow}>
                        <img
                            className="card--image"
                            alt={pic.alt_description}
                            src={pic.urls.full}
                            width="100%"
                            height="50%"
                        />
                        </button>
                </div>)))}
            </div>
            
        </>
    )
}
