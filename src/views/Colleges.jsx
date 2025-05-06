import React, { useContext, useState } from 'react'
import { Button, Dropdown, Form, Modal, Offcanvas, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Select from 'react-select'

import data from '../Data'
import Navigation from '../components/Navigation'
import { Config } from '../components/ConfigProvider';
import Search from '../components/Search';

function Colleges() {
   const { BwSwal } = useContext(Config);
  const [addModal, setAddmodal] = useState(false);
  const [viewModal, setViewmodal] = useState(false);
  return (
    <>
      <div>
      <Navigation items={[{ label: "Courses", endpoint: "/account/courses" },{ label: "Colleges", endpoint: "/account/colleges" }, { label: "Students", endpoint: "/account/students" }]} />
        <div className="flex-col flex md:flex-row md:items-center mb-[20px] gap-[10px]">
          <div className="text-[20px] font-bold flex-auto">Colleges</div>
          <Search />
          <div className="flex items-center gap-[10px]">
            <Button variant="outline-primary" className="bw-btn">Upload Students <i className="fi fi-rr-upload"></i></Button>
            <Button variant="primary" className="btn-icon" onClick={() => setAddmodal(true)}><i className="fi fi-sr-plus"></i></Button>
          </div>
        </div>
        <div className="table-responsive bw-card">
          <Table className="table table-hover bw-table m-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Head</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.colleges.map((item, i) => <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.college}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.poc}</td>
                  <td>
                    {item.status ? <span className="badge rounded-pill text-bg-primary">Active</span> : <span className="badge rounded-pill text-bg-danger">Inactive</span>}
                  </td>
                  <td>
                    <Dropdown autoClose="outside">
                      <Dropdown.Toggle variant="outline-default" size="sm" className="bw-btn" bsPrefix=" ">
                        Actions <i className="fi fi-sr-angle-small-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="bw-dropdown">
                        <Dropdown.Item as="button" onClick={() => setViewmodal(true)}><i className="fi fi-sr-eye"></i> View</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setAddmodal(true)}><i className="fi fi-sr-edit"></i>Edit</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => toast.success("URL Copied!")}><i className="fi fi-sr-copy"></i>Copy URL</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={()=>{
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
                        <Dropdown.Divider />
                        <Dropdown.Item as="div" bsPrefix="px-[10px]"><Form.Check type="switch" label="Attendance" id={`attendance-${i}`} /></Dropdown.Item>
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
          <Modal.Title>Add College</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row g-3">
              <div className="col-md-12">
                <div>
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Courses</label>
                  <Select isMulti options={data.courses2} getOptionLabel={(option) =>option.name} getOptionValue={(option) => option.name} />
                
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label className="form-label">Phone Primary</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label className="form-label">Phone Secondary</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Head</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Code</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Password</label>
                  <input type="text" className="form-control bw-form-control" />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" className="bw-btn">Cancel</Button>
          <Button variant="primary" className="bw-btn">Submit</Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas placement='end' show={viewModal} onHide={() => setViewmodal(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>College Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="list-group">
            {Object.keys(data.colleges[0]).map((key, i) =>
              <div key={i} className="list-group-item">
                <div className="text-[12px] text-gray-400 capitalize">{key}</div>
                <div>{key == 'status' ? data.colleges[key] ? <span className="badge rounded-pill text-bg-primary">Active</span> : <span className="badge rounded-pill text-bg-danger">Inactive</span> : data.colleges[0][key]}</div>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
export default Colleges