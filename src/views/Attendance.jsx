import React, { useContext, useState } from 'react'
import Navigation from '../components/Navigation'
import data from '../Data'
import Search from '../components/Search'
import Filters from '../components/Filters'
import { Button, Modal, Table } from 'react-bootstrap'
import { Config } from '../components/ConfigProvider'
function Attendance() {
  const { BwSwal } = useContext(Config);
  const [addModal, setAddmodal] = useState(false);
  const [viewModal, setViewmodal] = useState(false);
  return (
    <>
      <div>
        <Navigation items={[{ label: "Attendance", endpoint: "/account/attendance" }, { label: "Representatives", endpoint: "/account/representatives" }]} />
        <div className="flex-col flex md:flex-row md:items-center mb-[20px] gap-[10px]">
          <div className="text-[20px] font-bold flex-auto">Attendence</div>
          <Search />
          <div className="flex items-center gap-[10px]">
            <Filters>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">College</label>
                      <select className="form-select form-select-sm">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-control form-control-sm" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input className="form-control form-control-sm" />
                    </div>
                  </div>
                </div>
              </form>
            </Filters>
            <Button variant="outline-primary" className="btn-icon"><i className="fi fi-rr-download"></i></Button>
            <Button variant="primary" className="btn-icon" onClick={() => setAddmodal(true)}><i className="fi fi-rr-upload"></i></Button>
          </div>
        </div>
        <div className="table-responsive bw-card">
          <Table className="table table-hover bw-table m-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>College</th>
                <th>Department</th>
                <th>Login</th>
                <th>Logout</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
              {
                data.attendance.map((item, i) => <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.college}</td>
                  <td>{item.department}</td>
                  <td>{item.login_time}</td>
                  <td>{item.logout_time}</td>
                  <td>{item.session}</td>
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
          <Modal.Title>Upload Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row g-3">
              <div className="col-md-12">
                <div>
                  <label className="form-label">College</label>
                  <select className="form-select">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Representative</label>
                  <select className="form-select">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control bw-form-control" />
                </div>
              </div>
              <div className="col-md-12">
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
                    <button type="button" className="btn btn-sm btn-icon"><i className="fi fi-sr-trash"></i></button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="link" className="!mr-auto">Sample Csv File</Button>
          <Button variant="outline-primary" className="bw-btn">Cancel</Button>
          <Button variant="primary" className="bw-btn">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default Attendance