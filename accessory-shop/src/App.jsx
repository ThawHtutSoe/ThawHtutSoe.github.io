import { useState, useRef, useEffect } from 'react';
import {
  Button, Container, Row, Col, Form
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import productList from './accessory.json';
import DataTable from './components/DataTable';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const sRef = useRef(); // Ref for search input
  const [price, setPrice] = useState(productList[0]?.price || 0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);

  useEffect(() => {
    console.log('Filtered Items:', filteredSelectedItems);
  }, [filteredSelectedItems]);

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find(p => p.id == pid);
    if (product) {
      const q = parseInt(qRef.current.value, 10);
      const newItem = {
        ...product,
        qty: q
      };
      const updatedItems = [...selectedItems, newItem];
      setSelectedItems(updatedItems);
      setFilteredSelectedItems(updatedItems); // Update filtered items to include new item
    }
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find(p => p.id == pid);
    if (product) {
      setPrice(product.price);
    }
  };

  const deleteItemByIndex = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
    setFilteredSelectedItems(newSelectedItems); // Update filtered items to reflect deletion
  };

  const search = (keyword) => {
    const filtered = selectedItems.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSelectedItems(filtered);
  };

  const handleSearch = () => {
    const keyword = sRef.current.value;
    search(keyword);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredSelectedItems].sort((a, b) => {
      if (sortType === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setFilteredSelectedItems(sorted);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select ref={pRef} onChange={handleProductChanged}>
              {
                productList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              }
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            Price:
          </Col>
          <Col>
            {price}
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <input type="number" ref={qRef} defaultValue={1} />
          </Col>
        </Row>
        <Button variant="secondary" onClick={handleAdd}>Add</Button>

        <div className="my-3 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <input type="text" placeholder="Search..." ref={sRef} className="form-control" />
            <Button onClick={handleSearch} className="ms-2 d-flex align-items-center">
              <i className="bi bi-search me-2"></i> Search
            </Button>
          </div>
        </div>

        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
          onSort={handleSort} // Pass the sort handler
        />
      </Container>
    </>
  );
}

export default App;
