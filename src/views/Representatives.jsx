import React, { useContext, useState } from 'react'
import Navigation from '../components/Navigation'
import data from '../Data'
import Search from '../components/Search'
import { Button, Dropdown, Modal, Offcanvas, Table } from 'react-bootstrap'
import { Config } from '../components/ConfigProvider'
import { toast } from 'react-toastify'

function Representatives() {
    const { BwSwal } = useContext(Config);
    const [addModal, setAddmodal] = useState(false);
    const [viewModal, setViewmodal] = useState(false);
  return (
    <><div>
    <Navigation items={[{ label: "Attendance", endpoint: "/account/attendance" },{ label: "Representatives", endpoint: "/account/representatives" }]} />
    <div className="flex-col flex md:flex-row md:items-center mb-[20px] gap-[10px]">
      <div className="text-[20px] font-bold flex-auto">Representatives</div>
       <Search />
      <div className="flex items-center gap-[10px]">
        <Button variant="primary" className="btn-icon" onClick={()=>setAddmodal(true)}><i className="fi fi-sr-plus"></i></Button>
      </div>
    </div>
    <div className="table-responsive bw-card">
      <Table className="table table-hover bw-table m-0">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>College</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {
            data.representative.map((item,i)=><tr key={i}>
            <td>{i+1}</td>
            <td>{item.name}</td>
            <td>{item.college}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
            <Dropdown autoClose="outside">
                      <Dropdown.Toggle variant="outline-default" size="sm" className="bw-btn" bsPrefix=" ">
                        Actions <i className="fi fi-sr-angle-small-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="bw-dropdown">
                        <Dropdown.Item as="button" onClick={() => setViewmodal(true)}><i className="fi fi-sr-eye"></i> View</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setAddmodal(true)}><i className="fi fi-sr-edit"></i>Edit</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => {
                          BwSwal.fire({
                            text: `Are you sure you want to delete`,
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            confirmButtonColor: "var(--bw-primary)",
                            cancelButtonText: "No",
                            icon: 'warning',
                          }).then((result) => {
                            if (result.isConfirmed) {
                          toast.success("Deleted Successfully!")
                            }
                          });
                        }}><i className="fi fi-sr-trash"></i>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
       
            </td>
          </tr>)
           }
        </tbody>
      </Table>
    </div>
    <div className="flex-col flex md:flex-row items-center gap-[10px] mt-[10px]">
      <div className="flex items-center gap-[10px] mr-auto">
        <select className="form-select form-select-sm">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span className="whitespace-nowrap">Showing 1 to 1 of 1 entries</span>
      </div>
      <nav>
        <ul className="pagination bw-card m-0">
          <li className="page-item">
            <a className="page-link" href="#"><i className="fi fi-br-angle-left"></i></a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#"><i className="fi fi-br-angle-right"></i></a>
          </li>
        </ul>
      </nav>
    </div>
</div>
<Modal className='bw-modal' show={addModal} onHide={() => setAddmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Representative</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-[20px]">
            <label className="form-label">College</label>
            <select className="form-select">
              <option>Select</option>
            </select>
          </div>
          <label className="bw-upload">
            <input type="file" />
            <div>
              <strong>Upload</strong>
              <p>Click or Drag & Drop your file here.</p>
            </div>
          </label>
          <ul className="list-group !mt-[10px]">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              students.xls
              <Button variant="" size="sm" className="btn-icon"><i className="fi fi-sr-trash"></i></Button>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" className="bw-btn">Cancel</Button>
          <Button variant="primary" className="bw-btn">Submit</Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas placement='end' show={viewModal} onHide={() => setViewmodal(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Representative Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="list-group">
            {Object.keys(data.representative[0]).map((key, i) =>
              <div key={i} className="list-group-item">
                <div className="text-[12px] text-gray-400 capitalize">{key}</div>
                <div>{key == 'status' ? data.representative[key] ? <span className="badge rounded-pill text-bg-primary">Active</span> : <span className="badge rounded-pill text-bg-danger">Inactive</span> : data.representative[0][key]}</div>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
</>
  )
}

export default Representatives