import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {
  const calculateTotalDiscount = () => {
    return data.reduce((total, item) => total + Number(item.discount), 0);
  };

  const calculateTotalAmount = () => {
    return data.reduce(
      (total, item) =>
        total + item.ppu * item.qty - Number(item.discount),
      0
    );
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Quotation</h4>
          <Button variant="danger" onClick={clearDataItems}>
            Clear All
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price Per Unit</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.ppu}</td>
                <td>{item.qty}</td>
                <td>{item.discount}</td>
                <td>{item.ppu * item.qty - item.discount}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteByIndex(index)}>
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Discount</td>
              <td>{calculateTotalDiscount()}</td>
              <td colSpan="2">Total Amount: {calculateTotalAmount()}</td>
            </tr>
          </tfoot>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default QuotationTable;
