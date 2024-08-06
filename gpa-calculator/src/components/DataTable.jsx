import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DataTable = ({ data, onDelete, onSort }) => {
  return (
    <div>
      <div className="my-3 d-flex align-items-center">
        <Button onClick={() => onSort('asc')} variant="primary" className="ms-2">
          <i className="bi bi-arrow-up"></i>
        </Button>
        <Button onClick={() => onSort('desc')} variant="primary" className="ms-2">
          <i className="bi bi-arrow-down"></i>
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Grade</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <i className="bi bi-trash" onClick={() => onDelete(index)} style={{ cursor: 'pointer' }}></i>
              </td>
              <td>{item.subjectCode}</td>
              <td>{item.subjectName}</td>
              <td>{item.grade}</td>
              <td>{item.credits}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
