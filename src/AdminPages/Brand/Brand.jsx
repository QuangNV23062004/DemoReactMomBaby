import React from 'react'
export default function Brand() {
  return (
    <div className="category-table-wrapper">
      <div style={{background: 'white'}}>
      <h1 className='Header'>Category </h1>
      <Row><Button variant='danger' style={{width: 125, fontSize: 12, padding: '5px 10px', lineHeight: 1.5, marginLeft: 40}}>Delete all checked</Button></Row>
      <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 5}}>   
        <span style={{width: '73%'}}><b>Show <Form.Select style={{display: 'inline', width: 70, height: 40, margin: 2}} aria-label="">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </Form.Select> entries </b></span>
    <span style={{ width: '27%'}}><b>Search: <input style={{padding: "3px 15px",borderRadius: 5, border: '1px solid #aaa'}} type="text" /></b></span>
    </Row> 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Posted</th>
            <th>Date Updated</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Brand.map((cate) => (
            <tr key={cate.ID}>
              <td>{cate.ID}</td>
              <td>{cate.name}</td>
              <td>{cate.datePost}</td>
              <td>{cate.dateUpdate || 'N/A'}</td>
              <td>{cate.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
